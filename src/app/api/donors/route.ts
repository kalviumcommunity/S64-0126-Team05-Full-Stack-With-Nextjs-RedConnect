import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import { parsePagination, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { donorSelect } from "@/lib/prismaSelect";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";
import { donorCreateSchema } from "@/lib/schemas/donorSchema";
import { sendValidationError } from "@/lib/validationUtils";
import { getCache, setCache, deleteByPattern } from "@/lib/redis";
import {
  donorsListCacheKey,
  DONORS_LIST_CACHE_PATTERN,
} from "@/lib/cacheKeys";
import { logger } from "@/lib/logger";

export async function GET(req: Request) {
  const { page, limit, skip, take } = parsePagination(req);
  const { searchParams } = new URL(req.url);
  const bloodType = searchParams.get("bloodType")?.trim();
  const city = searchParams.get("city")?.trim();
  const isActive = searchParams.get("isActive")?.trim();

  try {
    const cacheKey = donorsListCacheKey({
      page,
      limit,
      bloodType,
      city,
      isActive,
    });
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      logger.info("Donors cache hit", { cacheKey });
      return sendSuccess(JSON.parse(cachedData), "Donors fetched successfully (cache)");
    }
    logger.info("Donors cache miss", { cacheKey });

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

    const payload = {
      data: donors,
      meta: {
        page,
        limit,
        total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
      },
    };

    await setCache(cacheKey, JSON.stringify(payload), 60);

    return sendSuccess(payload, "Donors fetched successfully");
  } catch (err) {
    return sendError(
      "Failed to fetch donors",
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
    const validatedData = donorCreateSchema.parse(parsed.data);

    // Create donor with validated data
    const donor = await prisma.donor.create({
      data: {
        name: validatedData.name,
        email: validatedData.email.toLowerCase(),
        phone: validatedData.phone,
        bloodType: validatedData.bloodType.toUpperCase(),
        dateOfBirth: new Date(validatedData.dateOfBirth),
        address: validatedData.address,
        city: validatedData.city,
      },
      select: donorSelect,
    });

    await deleteByPattern(DONORS_LIST_CACHE_PATTERN);
    return sendSuccess(donor, "Donor created successfully", 201);
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
        "A donor with this email already exists",
        ERROR_CODES.DUPLICATE_EMAIL,
        409,
        err
      );
    }

    return sendError(
      "Failed to create donor",
      ERROR_CODES.DATABASE_ERROR,
      500,
      err
    );
  }
}
