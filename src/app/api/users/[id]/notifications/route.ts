import { NextResponse } from "next/server";

import { jsonError, parseOptionalBoolean, parsePagination } from "@/lib/api";
import prisma from "@/lib/prisma";
import { notificationSelect } from "@/lib/prismaSelect";

function parseId(raw: string) {
  const id = Number.parseInt(raw, 10);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const userId = parseId(params.id);
  if (userId === null) return jsonError("Invalid 'id' parameter", 400);

  const { searchParams } = new URL(req.url);
  const isRead = parseOptionalBoolean(searchParams.get("isRead"));
  if (searchParams.get("isRead") !== null && isRead === undefined) {
    return jsonError("Query param 'isRead' must be a boolean (true/false)", 400);
  }

  const { page, limit, skip, take } = parsePagination(req);

  try {
    const where = { userId, ...(isRead === undefined ? {} : { isRead }) };
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
    return jsonError("Failed to fetch user notifications", 500, err);
  }
}

