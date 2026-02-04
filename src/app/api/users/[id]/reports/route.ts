import { NextResponse } from "next/server";

import { jsonError, parsePagination } from "@/lib/api";
import prisma from "@/lib/prisma";
import { reportSelect } from "@/lib/prismaSelect";

function parseId(raw: string) {
  const id = Number.parseInt(raw, 10);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const userId = parseId(params.id);
  if (userId === null) return jsonError("Invalid 'id' parameter", 400);

  const { page, limit, skip, take } = parsePagination(req);

  try {
    const [total, reports] = await prisma.$transaction([
      prisma.report.count({ where: { userId } }),
      prisma.report.findMany({
        where: { userId },
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
    return jsonError("Failed to fetch user reports", 500, err);
  }
}

