import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    // Create test blood banks
    const bloodBank1 = await prisma.bloodBank.upsert({
      where: { email: 'central@bloodbank.com' },
      update: {},
      create: {
        name: 'Central Blood Bank',
        address: '123 Main St',
        city: 'Mumbai',
        contactNo: '022-12345678',
        email: 'central@bloodbank.com',
      },
    });

    const bloodBank2 = await prisma.bloodBank.upsert({
      where: { email: 'city@bloodbank.com' },
      update: {},
      create: {
        name: 'City Blood Bank',
        address: '456 Park Ave',
        city: 'Delhi',
        contactNo: '011-87654321',
        email: 'city@bloodbank.com',
      },
    });

    // Create test donors
    const donors = [];
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    for (let i = 1; i <= 20; i++) {
      const bloodType = bloodTypes[i % bloodTypes.length];
      const donor = await prisma.donor.upsert({
        where: { email: `donor${i}@test.com` },
        update: {},
        create: {
          name: `Donor ${i}`,
          email: `donor${i}@test.com`,
          phone: `98765${String(i).padStart(5, '0')}`,
          bloodType,
          dateOfBirth: new Date(1990 + (i % 30), (i % 12), (i % 28) + 1),
          address: `${i} Test Street`,
          city: i % 2 === 0 ? 'Mumbai' : 'Delhi',
        },
      });
      donors.push(donor);
    }

    // Create test donations
    const donations = [];
    for (let i = 0; i < 15; i++) {
      const donor = donors[i % donors.length];
      const bloodBank = i % 2 === 0 ? bloodBank1 : bloodBank2;

      const donation = await prisma.donation.create({
        data: {
          donorId: donor.id,
          bloodBankId: bloodBank.id,
          units: (i % 3) + 1,
          status: 'completed',
          notes: `Test donation ${i + 1}`,
        },
      });

      // Update inventory
      await prisma.bloodInventory.upsert({
        where: {
          bloodBankId_bloodType: {
            bloodBankId: bloodBank.id,
            bloodType: donor.bloodType,
          },
        },
        update: {
          units: { increment: donation.units },
        },
        create: {
          bloodBankId: bloodBank.id,
          bloodType: donor.bloodType,
          units: donation.units,
          minUnits: 10,
        },
      });

      donations.push(donation);
    }

    return NextResponse.json(
      {
        message: 'Test data created successfully',
        stats: {
          bloodBanks: 2,
          donors: donors.length,
          donations: donations.length,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Seed data error:', error);
    const err = error as Error;
    return NextResponse.json(
      {
        error: 'Failed to create test data',
        details: err.message,
      },
      { status: 500 }
    );
  }
}
