import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { donorId, bloodBankId, units, bloodType, notes } = body;

    // Validate required fields
    if (!donorId || !bloodBankId || !units || !bloodType) {
      return NextResponse.json(
        { error: 'Missing required fields: donorId, bloodBankId, units, bloodType' },
        { status: 400 }
      );
    }

    // Validate units
    if (units <= 0) {
      return NextResponse.json(
        { error: 'Units must be a positive number' },
        { status: 400 }
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

    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    console.error('Blood donation error:', error);
    const err = error as Error & { code?: string; meta?: { cause?: string } };

    // Check if it's a known validation error
    if (err.message?.includes('not found') || err.message?.includes('mismatch')) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: err.message,
          rollback: 'Transaction rolled back - no changes were made to the database',
        },
        { status: 404 }
      );
    }

    // Handle Prisma errors
    if (err.code === 'P2025') {
      return NextResponse.json(
        {
          error: 'Record not found',
          details: err.meta?.cause || 'Required record does not exist',
          rollback: 'Transaction rolled back - no changes were made to the database',
        },
        { status: 404 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        error: 'Failed to process donation',
        details: err.message,
        rollback: 'Transaction rolled back - no changes were made to the database',
      },
      { status: 500 }
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

    return NextResponse.json({ donations, count: donations.length }, { status: 200 });
  } catch (error: unknown) {
    console.error('Failed to fetch donations:', error);
    const err = error as Error;
    return NextResponse.json(
      {
        error: 'Failed to fetch donations',
        details: err.message,
      },
      { status: 500 }
    );
  }
}
