import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/responseHandler';
import { ERROR_CODES } from '@/lib/errorCodes';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { donorId, bloodBankId, units, bloodType, notes } = body;

    // Validate required fields
    if (!donorId || !bloodBankId || !units || !bloodType) {
      return sendError(
        "Missing required fields: donorId, bloodBankId, units, bloodType",
        ERROR_CODES.MISSING_FIELD,
        400
      );
    }

    // Validate units
    if (units <= 0) {
      return sendError(
        "Units must be a positive number",
        ERROR_CODES.VALIDATION_ERROR,
        400
      );
    }

    // Use Prisma transaction to ensure atomicity and rollback on error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await prisma.$transaction(async (tx: any) => {
      // 1. Verify donor exists
      const donor = await tx.donor.findUnique({
        where: { id: donorId },
      });

      if (!donor) {
        throw new Error(`Donor with ID ${donorId} not found`);
      }

      // 2. Verify blood bank exists
      const bloodBank = await tx.bloodBank.findUnique({
        where: { id: bloodBankId },
      });

      if (!bloodBank) {
        throw new Error(`Blood Bank with ID ${bloodBankId} not found`);
      }

      // 3. Verify blood type matches
      if (donor.bloodType !== bloodType) {
        throw new Error(
          `Blood type mismatch. Donor blood type is ${donor.bloodType}, but ${bloodType} was specified`
        );
      }

      // 4. Create donation record
      const donation = await tx.donation.create({
        data: {
          donorId,
          bloodBankId,
          units,
          notes: notes || null,
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
            bloodBankId,
            bloodType,
          },
        },
        update: {
          units: {
            increment: units,
          },
        },
        create: {
          bloodBankId,
          bloodType,
          units,
          minUnits: 10,
        },
      });

      // 6. Update donor's last donated date
      await tx.donor.update({
        where: { id: donorId },
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

    return sendSuccess(
      result,
      "Donation processed successfully",
      201
    );
  } catch (error: unknown) {
    console.error('Blood donation error:', error);
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

    return sendSuccess(
      {
        data: donations,
        meta: {
          count: donations.length,
        },
      },
      "Donations fetched successfully"
    );
  } catch (error: unknown) {
    console.error('Failed to fetch donations:', error);
    return sendError(
      "Failed to fetch donations",
      ERROR_CODES.DATABASE_ERROR,
      500,
      error
    );
  }
}
