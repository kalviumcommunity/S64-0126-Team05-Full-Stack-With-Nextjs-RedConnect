import { NextResponse } from "next/server";

function coerceInt(value: string | null, fallback: number) {
  if (value === null) return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

export function parseOptionalInt(value: string | null) {
  if (value === null) return undefined;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : undefined;
}

export function parseOptionalBoolean(value: string | null) {
  if (value === null) return undefined;
  const v = value.trim().toLowerCase();
  if (v === "true" || v === "1") return true;
  if (v === "false" || v === "0") return false;
  return undefined;
}

export function parsePagination(
  req: Request,
  options?: { defaultLimit?: number; maxLimit?: number },
) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, coerceInt(searchParams.get("page"), 1));
  const defaultLimit = options?.defaultLimit ?? 10;
  const maxLimit = options?.maxLimit ?? 100;
  const limit = Math.min(maxLimit, Math.max(1, coerceInt(searchParams.get("limit"), defaultLimit)));

  return {
    page,
    limit,
    take: limit,
    skip: (page - 1) * limit,
  };
}

export async function safeJson(req: Request) {
  try {
    const data: unknown = await req.json();
    return { ok: true as const, data };
  } catch {
    return { ok: false as const };
  }
}

export function jsonError(message: string, status = 500, details?: unknown) {
  const body: { error: { message: string; details?: unknown } } = {
    error: { message },
  };

  if (process.env.NODE_ENV !== "production" && details !== undefined) {
    body.error.details = details;
  }

  return NextResponse.json(body, { status });
}

