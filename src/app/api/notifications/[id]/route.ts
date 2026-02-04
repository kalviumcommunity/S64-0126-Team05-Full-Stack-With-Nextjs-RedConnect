import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { jsonError, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { notificationSelect } from "@/lib/prismaSelect";

function parseId(raw: string) {
  const id = Number.parseInt(raw, 10);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) return jsonError("Invalid 'id' parameter", 400);

  try {
    const notification = await prisma.notification.findUnique({ where: { id }, select: notificationSelect });
    if (!notification) return jsonError("Notification not found", 404);
    return NextResponse.json({ data: notification });
  } catch (err) {
    return jsonError("Failed to fetch notification", 500, err);
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) return jsonError("Invalid 'id' parameter", 400);

  const parsed = await safeJson(req);
  if (!parsed.ok) return jsonError("Invalid JSON body", 400);

  const body = parsed.data as Record<string, unknown>;
  const message = body.message;
  const isRead = body.isRead;

  if (message !== undefined && typeof message !== "string") return jsonError("Field 'message' must be a string", 400);
  if (isRead !== undefined && typeof isRead !== "boolean") return jsonError("Field 'isRead' must be a boolean", 400);

  const data: Prisma.NotificationUpdateInput = {};
  if (typeof message === "string") data.message = message.trim();
  if (typeof isRead === "boolean") data.isRead = isRead;

  if (Object.keys(data).length === 0) return jsonError("No updatable fields provided", 400);

  try {
    const notification = await prisma.notification.update({
      where: { id },
      data,
      select: notificationSelect,
    });
    return NextResponse.json({ data: notification });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return jsonError("Notification not found", 404, err);
    }
    return jsonError("Failed to update notification", 500, err);
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) return jsonError("Invalid 'id' parameter", 400);

  try {
    await prisma.notification.delete({ where: { id } });
    return NextResponse.json({ data: { id } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return jsonError("Notification not found", 404, err);
    }
    return jsonError("Failed to delete notification", 500, err);
  }
}

