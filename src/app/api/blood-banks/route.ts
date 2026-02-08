import { Prisma } from "@prisma/client";

import { parsePagination, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

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

    return sendSuccess(
      {
        data: bloodBanks,
        meta: {
          page,
          limit,
          total,
          totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
        },
      },
      "Blood banks fetched successfully"
    );
  } catch (err) {
    return sendError(
      "Failed to fetch blood banks",
      ERROR_CODES.DATABASE_ERROR,
      500,
      err
    );
  }
}

export async function POST(req: Request) {
  const parsed = await safeJson(req);
  if (!parsed.ok) {
    return sendError("Invalid JSON body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  const body = parsed.data as Record<string, unknown>;
  const name = body.name;
  const address = body.address;
  const city = body.city;
  const contactNo = body.contactNo;
  const email = body.email;

  if (typeof name !== "string" || name.trim().length === 0) {
    return sendError(
      "Field 'name' is required",
      ERROR_CODES.MISSING_FIELD,
      400
    );
  }
  if (typeof address !== "string" || address.trim().length === 0) {
    return sendError(
      "Field 'address' is required",
      ERROR_CODES.MISSING_FIELD,
      400
    );
  }
  if (typeof city !== "string" || city.trim().length === 0) {
    return sendError(
      "Field 'city' is required",
      ERROR_CODES.MISSING_FIELD,
      400
    );
  }
  if (typeof contactNo !== "string" || contactNo.trim().length === 0) {
    return sendError(
      "Field 'contactNo' is required",
      ERROR_CODES.MISSING_FIELD,
      400
    );
  }
  if (typeof email !== "string" || email.trim().length === 0) {
    return sendError(
      "Field 'email' is required",
      ERROR_CODES.MISSING_FIELD,
      400
    );
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

    return sendSuccess(
      bloodBank,
      "Blood bank created successfully",
      201
    );
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return sendError(
        "A blood bank with this email already exists",
        ERROR_CODES.DUPLICATE_EMAIL,
        409,
        err
      );
    }
    return sendError(
      "Failed to create blood bank",
      ERROR_CODES.DATABASE_ERROR,
      500,
      err
    );
  }
}
