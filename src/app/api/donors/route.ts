import { Prisma } from "@prisma/client";

import { parsePagination, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { donorSelect } from "@/lib/prismaSelect";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

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

    return sendSuccess(
      {
        data: donors,
        meta: {
          page,
          limit,
          total,
          totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
        },
      },
      "Donors fetched successfully"
    );
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

  const body = parsed.data as Record<string, unknown>;
  const name = body.name;
  const email = body.email;
  const phone = body.phone;
  const bloodType = body.bloodType;
  const dateOfBirth = body.dateOfBirth;
  const address = body.address;
  const city = body.city;

  if (typeof name !== "string" || name.trim().length === 0) {
    return sendError(
      "Field 'name' is required",
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
  if (typeof phone !== "string" || phone.trim().length === 0) {
    return sendError(
      "Field 'phone' is required",
      ERROR_CODES.MISSING_FIELD,
      400
    );
  }
  if (typeof bloodType !== "string" || bloodType.trim().length === 0) {
    return sendError(
      "Field 'bloodType' is required",
      ERROR_CODES.MISSING_FIELD,
      400
    );
  }
  if (typeof dateOfBirth !== "string" || dateOfBirth.trim().length === 0) {
    return sendError(
      "Field 'dateOfBirth' is required (format: YYYY-MM-DD)",
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

    return sendSuccess(donor, "Donor created successfully", 201);
  } catch (err) {
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
    if (err instanceof Error && err.message.includes("Invalid")) {
      return sendError(
        "Invalid date format for dateOfBirth (use YYYY-MM-DD)",
        ERROR_CODES.INVALID_FORMAT,
        400,
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
