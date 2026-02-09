import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import { parsePagination, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";
import { bloodBankCreateSchema } from "@/lib/schemas/bloodBankSchema";
import { sendValidationError } from "@/lib/validationUtils";

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

  try {
    // Validate request body using Zod schema
    const validatedData = bloodBankCreateSchema.parse(parsed.data);

    // Create blood bank with validated data
    const bloodBank = await prisma.bloodBank.create({
      data: {
        name: validatedData.name,
        address: validatedData.address,
        city: validatedData.city,
        contactNo: validatedData.contactNo,
        email: validatedData.email.toLowerCase(),
      },
      select: bloodBankSelect,
    });

    return sendSuccess(
      bloodBank,
      "Blood bank created successfully",
      201
    );
  } catch (err) {
    // Handle Zod validation errors
    if (err instanceof ZodError) {
      return sendValidationError(err);
    }

    // Handle database errors
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
