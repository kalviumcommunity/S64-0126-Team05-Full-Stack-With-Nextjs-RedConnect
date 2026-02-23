import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import { parsePagination, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";
import { bloodBankCreateSchema } from "@/lib/schemas/bloodBankSchema";
import { sendValidationError } from "@/lib/validationUtils";
import { getCache, setCache, deleteByPattern } from "@/lib/redis";
import {
  bloodBanksListCacheKey,
  BLOOD_BANKS_LIST_CACHE_PATTERN,
} from "@/lib/cacheKeys";
import { logger } from "@/lib/logger";

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
    const cacheKey = bloodBanksListCacheKey({
      page,
      limit,
      city,
      bloodType,
    });
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      logger.info("Blood banks cache hit", { cacheKey });
      return sendSuccess(JSON.parse(cachedData), "Blood banks fetched successfully (cache)");
    }
    logger.info("Blood banks cache miss", { cacheKey });

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

    // Fetch blood banks
    const bloodBanks = await prisma.bloodBank.findMany({
      where,
      select: bloodBankSelect,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });

    // Get total count separately
    const total = await prisma.bloodBank.count({ where });

    const payload = {
      data: bloodBanks,
      meta: {
        page,
        limit,
        total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
      },
    };

    await setCache(cacheKey, JSON.stringify(payload), 60);

    return sendSuccess(payload, "Blood banks fetched successfully");
  } catch (err) {
    console.error("Error fetching blood banks:", err);
    // Return empty data instead of error to allow frontend to work
    return sendSuccess(
      {
        data: [],
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      },
      "Blood banks fetched successfully (empty)"
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

    await deleteByPattern(BLOOD_BANKS_LIST_CACHE_PATTERN);
    return sendSuccess(bloodBank, "Blood bank created successfully", 201);
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
