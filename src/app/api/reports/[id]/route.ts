import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { jsonError, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { reportSelect } from "@/lib/prismaSelect";

function parseId(raw: string) {
  const id = Number.parseInt(raw, 10);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) return jsonError("Invalid 'id' parameter", 400);

  try {
    const report = await prisma.report.findUnique({ where: { id }, select: reportSelect });
    if (!report) return jsonError("Report not found", 404);
    return NextResponse.json({ data: report });
  } catch (err) {
    return jsonError("Failed to fetch report", 500, err);
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) return jsonError("Invalid 'id' parameter", 400);

  const parsed = await safeJson(req);
  if (!parsed.ok) return jsonError("Invalid JSON body", 400);

  const body = parsed.data as Record<string, unknown>;
  const title = body.title;
  const description = body.description;
  const category = body.category;
  const status = body.status;

  if (title !== undefined && typeof title !== "string") return jsonError("Field 'title' must be a string", 400);
  if (description !== undefined && typeof description !== "string") {
    return jsonError("Field 'description' must be a string", 400);
  }
  if (category !== undefined && typeof category !== "string") return jsonError("Field 'category' must be a string", 400);
  if (status !== undefined && typeof status !== "string") return jsonError("Field 'status' must be a string", 400);

  const data: Prisma.ReportUpdateInput = {};
  if (typeof title === "string") data.title = title.trim();
  if (typeof description === "string") data.description = description.trim();
  if (typeof category === "string") data.category = category.trim();
  if (typeof status === "string") data.status = status.trim();

  if (Object.keys(data).length === 0) return jsonError("No updatable fields provided", 400);

  try {
    const report = await prisma.report.update({ where: { id }, data, select: reportSelect });
    return NextResponse.json({ data: report });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return jsonError("Report not found", 404, err);
    }
    return jsonError("Failed to update report", 500, err);
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) return jsonError("Invalid 'id' parameter", 400);

  try {
    await prisma.report.delete({ where: { id } });
    return NextResponse.json({ data: { id } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return jsonError("Report not found", 404, err);
    }
    return jsonError("Failed to delete report", 500, err);
  }
}

