import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { jsonError, parseOptionalInt, parsePagination, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { reportSelect } from "@/lib/prismaSelect";

export async function GET(req: Request) {
  const { page, limit, skip, take } = parsePagination(req);
  const { searchParams } = new URL(req.url);

  const userId = parseOptionalInt(searchParams.get("userId"));
  const status = searchParams.get("status") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  if (searchParams.get("userId") !== null && userId === undefined) {
    return jsonError("Query param 'userId' must be an integer", 400);
  }

  const where: Prisma.ReportWhereInput = {};
  if (userId !== undefined) where.userId = userId;
  if (status !== undefined) where.status = status;
  if (category !== undefined) where.category = category;

  try {
    const [total, reports] = await prisma.$transaction([
      prisma.report.count({ where }),
      prisma.report.findMany({
        where,
        select: reportSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
    ]);

    return NextResponse.json({
      data: reports,
      meta: {
        page,
        limit,
        total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
      },
    });
  } catch (err) {
    return jsonError("Failed to fetch reports", 500, err);
  }
}

export async function POST(req: Request) {
  const parsed = await safeJson(req);
  if (!parsed.ok) return jsonError("Invalid JSON body", 400);

  const body = parsed.data as Record<string, unknown>;
  const title = body.title;
  const description = body.description;
  const category = body.category;
  const status = body.status;
  const userId = body.userId;

  if (typeof title !== "string" || title.trim().length === 0) return jsonError("Field 'title' is required", 400);
  if (typeof description !== "string" || description.trim().length === 0) {
    return jsonError("Field 'description' is required", 400);
  }
  if (typeof category !== "string" || category.trim().length === 0) {
    return jsonError("Field 'category' is required", 400);
  }
  if (status !== undefined && typeof status !== "string") return jsonError("Field 'status' must be a string", 400);
  if (typeof userId !== "number" || !Number.isInteger(userId) || userId <= 0) {
    return jsonError("Field 'userId' must be a positive integer", 400);
  }

  try {
    const report = await prisma.report.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        status: typeof status === "string" && status.trim().length > 0 ? status.trim() : undefined,
        userId,
      },
      select: reportSelect,
    });

    return NextResponse.json({ data: report }, { status: 201 });
  } catch (err) {
    return jsonError("Failed to create report", 500, err);
  }
}

