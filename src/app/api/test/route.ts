import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { userSafeSelect } from "@/lib/prismaSelect";
import { jsonError } from "@/lib/api";

export async function GET(req: NextRequest) {
  // Only ADMIN can access this test endpoint
  const userRole = req.headers.get("x-user-role");
  if (userRole !== "ADMIN") {
    return jsonError("Only ADMIN users can access this endpoint", 403);
  }

  const users = await prisma.user.findMany({
    select: userSafeSelect,
  });
  return Response.json({ users });
}
