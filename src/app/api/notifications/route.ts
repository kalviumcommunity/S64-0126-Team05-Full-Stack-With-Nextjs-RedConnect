import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { jsonError, parseOptionalBoolean, parseOptionalInt, parsePagination, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { notificationSelect } from "@/lib/prismaSelect";

export async function GET(req: Request) {
  const { page, limit, skip, take } = parsePagination(req);
  const { searchParams } = new URL(req.url);

  const userId = parseOptionalInt(searchParams.get("userId"));
  const isRead = parseOptionalBoolean(searchParams.get("isRead"));

  if (searchParams.get("userId") !== null && userId === undefined) {
    return jsonError("Query param 'userId' must be an integer", 400);
  }
  if (searchParams.get("isRead") !== null && isRead === undefined) {
    return jsonError("Query param 'isRead' must be a boolean (true/false)", 400);
  }

  const where: Prisma.NotificationWhereInput = {};
  if (userId !== undefined) where.userId = userId;
  if (isRead !== undefined) where.isRead = isRead;

  try {
    const [total, notifications] = await prisma.$transaction([
      prisma.notification.count({ where }),
      prisma.notification.findMany({
        where,
        select: notificationSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
    ]);

    return NextResponse.json({
      data: notifications,
      meta: {
        page,
        limit,
        total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
      },
    });
  } catch (err) {
    return jsonError("Failed to fetch notifications", 500, err);
  }
}

export async function POST(req: Request) {
  const parsed = await safeJson(req);
  if (!parsed.ok) return jsonError("Invalid JSON body", 400);

  const body = parsed.data as Record<string, unknown>;
  const message = body.message;
  const userId = body.userId;
  const isRead = body.isRead;

  if (typeof message !== "string" || message.trim().length === 0) return jsonError("Field 'message' is required", 400);
  if (typeof userId !== "number" || !Number.isInteger(userId) || userId <= 0) {
    return jsonError("Field 'userId' must be a positive integer", 400);
  }
  if (isRead !== undefined && typeof isRead !== "boolean") {
    return jsonError("Field 'isRead' must be a boolean", 400);
  }

  try {
    const notification = await prisma.notification.create({
      data: {
        message: message.trim(),
        userId,
        isRead: typeof isRead === "boolean" ? isRead : undefined,
      },
      select: notificationSelect,
    });

    return NextResponse.json({ data: notification }, { status: 201 });
  } catch (err) {
    return jsonError("Failed to create notification", 500, err);
  }
}

