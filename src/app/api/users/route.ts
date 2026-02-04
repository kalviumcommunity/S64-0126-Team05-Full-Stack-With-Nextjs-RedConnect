import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { jsonError, parsePagination, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { userSafeSelect } from "@/lib/prismaSelect";

export async function GET(req: Request) {
  const { page, limit, skip, take } = parsePagination(req);

  try {
    const [total, users] = await prisma.$transaction([
      prisma.user.count(),
      prisma.user.findMany({
        select: userSafeSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
    ]);

    return NextResponse.json({
      data: users,
      meta: {
        page,
        limit,
        total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
      },
    });
  } catch (err) {
    return jsonError("Failed to fetch users", 500, err);
  }
}

export async function POST(req: Request) {
  const parsed = await safeJson(req);
  if (!parsed.ok) return jsonError("Invalid JSON body", 400);

  const body = parsed.data as Record<string, unknown>;
  const name = body.name;
  const email = body.email;
  const password = body.password;
  const role = body.role;

  if (typeof name !== "string" || name.trim().length === 0) {
    return jsonError("Field 'name' is required", 400);
  }
  if (typeof email !== "string" || email.trim().length === 0) {
    return jsonError("Field 'email' is required", 400);
  }
  if (typeof password !== "string" || password.trim().length === 0) {
    return jsonError("Field 'password' is required", 400);
  }
  if (role !== undefined && typeof role !== "string") {
    return jsonError("Field 'role' must be a string", 400);
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role: typeof role === "string" && role.trim().length > 0 ? role.trim() : undefined,
      },
      select: userSafeSelect,
    });

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return jsonError("A user with this email already exists", 409, err);
    }
    return jsonError("Failed to create user", 500, err);
  }
}

