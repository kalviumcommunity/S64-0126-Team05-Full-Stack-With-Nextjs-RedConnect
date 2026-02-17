import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/responseHandler';
import { ERROR_CODES } from '@/lib/errorCodes';
import { bloodDonationCreateSchema } from '@/lib/schemas/bloodDonationSchema';
import { sendValidationError } from '@/lib/validationUtils';
import { getCache, setCache, deleteByPattern } from "@/lib/redis";
import {
  DONATIONS_LIST_CACHE_KEY,
  DONATIONS_LIST_CACHE_PATTERN,
  BLOOD_BANKS_LIST_CACHE_PATTERN,
  DONORS_LIST_CACHE_PATTERN,
} from "@/lib/cacheKeys";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body using Zod schema
    const validatedData = bloodDonationCreateSchema.parse(body);

    // Use Prisma transaction to ensure atomicity and rollback on error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await prisma.$transaction(async (tx: any) => {
      // 1. Verify donor exists
      const donor = await tx.donor.findUnique({
        where: { id: validatedData.donorId },
      });

      if (!donor) {
        throw new Error(`Donor with ID ${validatedData.donorId} not found`);
      }

      // 2. Verify blood bank exists
      const bloodBank = await tx.bloodBank.findUnique({
        where: { id: validatedData.bloodBankId },
      });

      if (!bloodBank) {
        throw new Error(`Blood Bank with ID ${validatedData.bloodBankId} not found`);
      }

      // 3. Verify blood type matches
      if (donor.bloodType !== validatedData.bloodType) {
        throw new Error(
          `Blood type mismatch. Donor blood type is ${donor.bloodType}, but ${validatedData.bloodType} was specified`
        );
      }

      // 4. Create donation record
      const donation = await tx.donation.create({
        data: {
          donorId: validatedData.donorId,
          bloodBankId: validatedData.bloodBankId,
          units: validatedData.units,
          notes: validatedData.notes || null,
          status: 'completed',
        },
        include: {
          donor: {
            select: {
              id: true,
              name: true,
              email: true,
              bloodType: true,
            },
          },
          bloodBank: {
            select: {
              id: true,
              name: true,
              city: true,
            },
          },
        },
      });

      // 5. Update blood inventory
      const inventory = await tx.bloodBankInventory.upsert({
        where: {
          bloodBankId_bloodType: {
            bloodBankId: validatedData.bloodBankId,
            bloodType: validatedData.bloodType,
          },
        },
        update: {
          units: {
            increment: validatedData.units,
          },
        },
        create: {
          bloodBankId: validatedData.bloodBankId,
          bloodType: validatedData.bloodType,
          units: validatedData.units,
          minUnits: 10,
        },
      });

      // 6. Update donor's last donated date
      await tx.donor.update({
        where: { id: validatedData.donorId },
        data: {
          lastDonated: new Date(),
        },
      });

      return {
        donation,
        inventory,
        message: 'Donation recorded successfully',
      };
    });

    await deleteByPattern(DONATIONS_LIST_CACHE_PATTERN);
    await deleteByPattern(BLOOD_BANKS_LIST_CACHE_PATTERN);
    await deleteByPattern(DONORS_LIST_CACHE_PATTERN);

    return sendSuccess(result, "Donation processed successfully", 201);
  } catch (error) {
    console.error('Blood donation error:', error);

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return sendValidationError(error);
    }

    const err = error as Error & { code?: string; meta?: { cause?: string } };

    // Check if it's a known validation error
    if (err.message?.includes('not found')) {
      return sendError(
        "Donor or blood bank not found",
        ERROR_CODES.NOT_FOUND,
        404,
        err
      );
    }

    if (err.message?.includes('mismatch')) {
      return sendError(
        err.message,
        ERROR_CODES.BLOOD_TYPE_MISMATCH,
        400,
        err
      );
    }

    // Handle Prisma errors
    if (err.code === 'P2025') {
      return sendError(
        "Record not found",
        ERROR_CODES.NOT_FOUND,
        404,
        err
      );
    }

    // Generic error
    return sendError(
      "Failed to process donation",
      ERROR_CODES.TRANSACTION_FAILED,
      500,
      err
    );
  }
}

export async function GET() {
  try {
    const cachedData = await getCache(DONATIONS_LIST_CACHE_KEY);
    if (cachedData) {
      logger.info("Donations cache hit", { cacheKey: DONATIONS_LIST_CACHE_KEY });
      return sendSuccess(JSON.parse(cachedData), "Donations fetched successfully (cache)");
    }
    logger.info("Donations cache miss", { cacheKey: DONATIONS_LIST_CACHE_KEY });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const donations = await (prisma as any).donation.findMany({
      include: {
        donor: {
          select: {
            id: true,
            name: true,
            email: true,
            bloodType: true,
          },
        },
        bloodBank: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    const payload = {
      data: donations,
      meta: {
        count: donations.length,
      },
    };

    await setCache(DONATIONS_LIST_CACHE_KEY, JSON.stringify(payload), 60);

    return sendSuccess(payload, "Donations fetched successfully");
  } catch (error: unknown) {
    console.error('Failed to fetch donations:', error);
    // Return empty data instead of error to allow frontend to work
    return sendSuccess(
      {
        data: [],
        meta: {
          count: 0,
        },
      },
      "Donations fetched successfully (empty)"
    );
  }
}
