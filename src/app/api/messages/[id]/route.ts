import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { jsonError, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { messageSelect } from "@/lib/prismaSelect";

function parseId(raw: string) {
  const id = Number.parseInt(raw, 10);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) return jsonError("Invalid 'id' parameter", 400);

  try {
    const message = await prisma.message.findUnique({ where: { id }, select: messageSelect });
    if (!message) return jsonError("Message not found", 404);
    return NextResponse.json({ data: message });
  } catch (err) {
    return jsonError("Failed to fetch message", 500, err);
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) return jsonError("Invalid 'id' parameter", 400);

  const parsed = await safeJson(req);
  if (!parsed.ok) return jsonError("Invalid JSON body", 400);

  const body = parsed.data as Record<string, unknown>;
  const content = body.content;
  if (content === undefined) return jsonError("No updatable fields provided", 400);
  if (typeof content !== "string") return jsonError("Field 'content' must be a string", 400);
  if (content.trim().length === 0) return jsonError("Field 'content' cannot be empty", 400);

  try {
    const message = await prisma.message.update({
      where: { id },
      data: { content: content.trim() },
      select: messageSelect,
    });
    return NextResponse.json({ data: message });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return jsonError("Message not found", 404, err);
    }
    return jsonError("Failed to update message", 500, err);
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) return jsonError("Invalid 'id' parameter", 400);

  try {
    await prisma.message.delete({ where: { id } });
    return NextResponse.json({ data: { id } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return jsonError("Message not found", 404, err);
    }
    return jsonError("Failed to delete message", 500, err);
  }
}

