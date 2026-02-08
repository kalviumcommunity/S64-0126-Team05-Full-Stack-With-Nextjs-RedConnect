import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { jsonError, parsePagination, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";

const bloodBankSelect = {
  id: true,
  name: true,
  address: true,
  city: true,
  contactNo: true,
  email: true,
  createdAt: true,
  inventories: {
    select: {
      id: true,
      bloodType: true,
      units: true,
      minUnits: true,
      expiryDate: true,
    },
  },
} as const;

export async function GET(req: Request) {
  const { page, limit, skip, take } = parsePagination(req);
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city")?.trim();
  const bloodType = searchParams.get("bloodType")?.trim();

  try {
    const where: Prisma.BloodBankWhereInput = {};

    if (city) {
      where.city = { contains: city, mode: "insensitive" };
    }

    if (bloodType) {
      where.inventories = {
        some: {
          bloodType: { contains: bloodType, mode: "insensitive" },
          units: { gt: 0 },
        },
      };
    }

    const [total, bloodBanks] = await prisma.$transaction([
      prisma.bloodBank.count({ where }),
      prisma.bloodBank.findMany({
        where,
        select: bloodBankSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
    ]);

    return NextResponse.json({
      data: bloodBanks,
      meta: {
        page,
        limit,
        total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
      },
    });
  } catch (err) {
    return jsonError("Failed to fetch blood banks", 500, err);
  }
}

export async function POST(req: Request) {
  const parsed = await safeJson(req);
  if (!parsed.ok) return jsonError("Invalid JSON body", 400);

  const body = parsed.data as Record<string, unknown>;
  const name = body.name;
  const address = body.address;
  const city = body.city;
  const contactNo = body.contactNo;
  const email = body.email;

  if (typeof name !== "string" || name.trim().length === 0) {
    return jsonError("Field 'name' is required", 400);
  }
  if (typeof address !== "string" || address.trim().length === 0) {
    return jsonError("Field 'address' is required", 400);
  }
  if (typeof city !== "string" || city.trim().length === 0) {
    return jsonError("Field 'city' is required", 400);
  }
  if (typeof contactNo !== "string" || contactNo.trim().length === 0) {
    return jsonError("Field 'contactNo' is required", 400);
  }
  if (typeof email !== "string" || email.trim().length === 0) {
    return jsonError("Field 'email' is required", 400);
  }

  try {
    const bloodBank = await prisma.bloodBank.create({
      data: {
        name: name.trim(),
        address: address.trim(),
        city: city.trim(),
        contactNo: contactNo.trim(),
        email: email.trim().toLowerCase(),
      },
      select: bloodBankSelect,
    });

    return NextResponse.json({ data: bloodBank }, { status: 201 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return jsonError("A blood bank with this email already exists", 409, err);
    }
    return jsonError("Failed to create blood bank", 500, err);
  }
}
