import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { jsonError, parseOptionalInt, parsePagination, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { messageSelect } from "@/lib/prismaSelect";

export async function GET(req: Request) {
  const { page, limit, skip, take } = parsePagination(req);
  const { searchParams } = new URL(req.url);

  const senderId = parseOptionalInt(searchParams.get("senderId"));
  const receiverId = parseOptionalInt(searchParams.get("receiverId"));

  if (searchParams.get("senderId") !== null && senderId === undefined) {
    return jsonError("Query param 'senderId' must be an integer", 400);
  }
  if (searchParams.get("receiverId") !== null && receiverId === undefined) {
    return jsonError("Query param 'receiverId' must be an integer", 400);
  }

  const where: Prisma.MessageWhereInput = {};
  if (senderId !== undefined) where.senderId = senderId;
  if (receiverId !== undefined) where.receiverId = receiverId;

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
    return jsonError("Failed to fetch messages", 500, err);
  }
}

export async function POST(req: Request) {
  const parsed = await safeJson(req);
  if (!parsed.ok) return jsonError("Invalid JSON body", 400);

  const body = parsed.data as Record<string, unknown>;
  const content = body.content;
  const senderId = body.senderId;
  const receiverId = body.receiverId;

  if (typeof content !== "string" || content.trim().length === 0) {
    return jsonError("Field 'content' is required", 400);
  }
  if (typeof senderId !== "number" || !Number.isInteger(senderId) || senderId <= 0) {
    return jsonError("Field 'senderId' must be a positive integer", 400);
  }
  if (typeof receiverId !== "number" || !Number.isInteger(receiverId) || receiverId <= 0) {
    return jsonError("Field 'receiverId' must be a positive integer", 400);
  }

  try {
    const message = await prisma.message.create({
      data: {
        content: content.trim(),
        senderId,
        receiverId,
      },
      select: messageSelect,
    });
    return NextResponse.json({ data: message }, { status: 201 });
  } catch (err) {
    return jsonError("Failed to create message", 500, err);
  }
}

