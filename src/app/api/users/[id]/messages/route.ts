import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { jsonError, parsePagination } from "@/lib/api";
import prisma from "@/lib/prisma";
import { messageSelect } from "@/lib/prismaSelect";

function parseId(raw: string) {
  const id = Number.parseInt(raw, 10);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const userId = parseId(params.id);
  if (userId === null) return jsonError("Invalid 'id' parameter", 400);

  const { searchParams } = new URL(req.url);
  const role = (searchParams.get("role") ?? "all").toLowerCase();
  if (!["all", "sent", "received"].includes(role)) {
    return jsonError("Query param 'role' must be one of: all, sent, received", 400);
  }

  const { page, limit, skip, take } = parsePagination(req);

  const where: Prisma.MessageWhereInput =
    role === "sent"
      ? { senderId: userId }
      : role === "received"
        ? { receiverId: userId }
        : { OR: [{ senderId: userId }, { receiverId: userId }] };

  try {
    const [total, messages] = await prisma.$transaction([
      prisma.message.count({ where }),
      prisma.message.findMany({
        where,
        select: messageSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
    ]);

    return NextResponse.json({
      data: messages,
      meta: {
        page,
        limit,
        total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
      },
    });
  } catch (err) {
    return jsonError("Failed to fetch user messages", 500, err);
  }
}

