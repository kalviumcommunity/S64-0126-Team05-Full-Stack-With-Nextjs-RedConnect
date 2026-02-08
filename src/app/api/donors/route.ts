import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { jsonError, parsePagination, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { donorSelect } from "@/lib/prismaSelect";

export async function GET(req: Request) {
  const { page, limit, skip, take } = parsePagination(req);
  const { searchParams } = new URL(req.url);
  const bloodType = searchParams.get("bloodType")?.trim();
  const city = searchParams.get("city")?.trim();
  const isActive = searchParams.get("isActive")?.trim();

  try {
    const where: Prisma.DonorWhereInput = {};

    if (bloodType) {
      where.bloodType = { contains: bloodType, mode: "insensitive" };
    }

    if (city) {
      where.city = { contains: city, mode: "insensitive" };
    }

    if (isActive !== null) {
      where.isActive = isActive === "true";
    }

    const [total, donors] = await prisma.$transaction([
      prisma.donor.count({ where }),
      prisma.donor.findMany({
        where,
        select: donorSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
    ]);

    return NextResponse.json({
      data: donors,
      meta: {
        page,
        limit,
        total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
      },
    });
  } catch (err) {
    return jsonError("Failed to fetch donors", 500, err);
  }
}

export async function POST(req: Request) {
  const parsed = await safeJson(req);
  if (!parsed.ok) return jsonError("Invalid JSON body", 400);

  const body = parsed.data as Record<string, unknown>;
  const name = body.name;
  const email = body.email;
  const phone = body.phone;
  const bloodType = body.bloodType;
  const dateOfBirth = body.dateOfBirth;
  const address = body.address;
  const city = body.city;

  if (typeof name !== "string" || name.trim().length === 0) {
    return jsonError("Field 'name' is required", 400);
  }
  if (typeof email !== "string" || email.trim().length === 0) {
    return jsonError("Field 'email' is required", 400);
  }
  if (typeof phone !== "string" || phone.trim().length === 0) {
    return jsonError("Field 'phone' is required", 400);
  }
  if (typeof bloodType !== "string" || bloodType.trim().length === 0) {
    return jsonError("Field 'bloodType' is required", 400);
  }
  if (typeof dateOfBirth !== "string" || dateOfBirth.trim().length === 0) {
    return jsonError("Field 'dateOfBirth' is required (format: YYYY-MM-DD)", 400);
  }
  if (typeof address !== "string" || address.trim().length === 0) {
    return jsonError("Field 'address' is required", 400);
  }
  if (typeof city !== "string" || city.trim().length === 0) {
    return jsonError("Field 'city' is required", 400);
  }

  try {
    const donor = await prisma.donor.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        bloodType: bloodType.trim().toUpperCase(),
        dateOfBirth: new Date(dateOfBirth),
        address: address.trim(),
        city: city.trim(),
      },
      select: donorSelect,
    });

    return NextResponse.json({ data: donor }, { status: 201 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return jsonError("A donor with this email already exists", 409, err);
    }
    if (err instanceof Error && err.message.includes("Invalid")) {
      return jsonError("Invalid date format for dateOfBirth (use YYYY-MM-DD)", 400, err);
    }
    return jsonError("Failed to create donor", 500, err);
  }
}
