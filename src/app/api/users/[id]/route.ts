import { Prisma, Role } from "@prisma/client";
import { NextResponse } from "next/server";

import { jsonError, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { userSafeSelect } from "@/lib/prismaSelect";

// UUID v4 validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function parseId(raw: string) {
  return UUID_REGEX.test(raw) ? raw : null;
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseId(resolvedParams.id);
  if (id === null) return jsonError("Invalid 'id' parameter", 400);

  try {
    const user = await prisma.user.findUnique({ where: { id }, select: userSafeSelect });
    if (!user) return jsonError("User not found", 404);
    return NextResponse.json({ data: user });
  } catch (err) {
    return jsonError("Failed to fetch user", 500, err);
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseId(resolvedParams.id);
  if (id === null) return jsonError("Invalid 'id' parameter", 400);

  const parsed = await safeJson(req);
  if (!parsed.ok) return jsonError("Invalid JSON body", 400);

  const body = parsed.data as Record<string, unknown>;
  const name = body.name;
  const email = body.email;
  const password = body.password;
  const role = body.role;

  if (name !== undefined && typeof name !== "string") return jsonError("Field 'name' must be a string", 400);
  if (email !== undefined && typeof email !== "string") return jsonError("Field 'email' must be a string", 400);
  if (password !== undefined && typeof password !== "string") return jsonError("Field 'password' must be a string", 400);
  if (role !== undefined && typeof role !== "string") return jsonError("Field 'role' must be a string", 400);

  const data: Prisma.UserUpdateInput = {};
  if (typeof name === "string") data.name = name.trim();
  if (typeof email === "string") data.email = email.trim().toLowerCase();
  if (typeof password === "string") data.password = password;
  if (typeof role === "string" && Object.values(Role).includes(role as Role)) {
    data.role = role as Role;
  }

  if (Object.keys(data).length === 0) return jsonError("No updatable fields provided", 400);

  try {
    const user = await prisma.user.update({
      where: { id },
      data,
      select: userSafeSelect,
    });
    return NextResponse.json({ data: user });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return jsonError("User not found", 404, err);
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return jsonError("A user with this email already exists", 409, err);
    }
    return jsonError("Failed to update user", 500, err);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseId(resolvedParams.id);
  if (id === null) return jsonError("Invalid 'id' parameter", 400);

  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ data: { id } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return jsonError("User not found", 404, err);
    }
    return jsonError("Failed to delete user", 500, err);
  }
}

