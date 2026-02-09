import { sendSuccess } from "@/lib/responseHandler";

/**
 * GET /api/admin
 * Admin-only dashboard endpoint
 * Requires ADMIN role
 */
export async function GET(req: Request) {
  // User info is attached by middleware via headers
  const userId = req.headers.get("x-user-id");
  const userEmail = req.headers.get("x-user-email");
  const userRole = req.headers.get("x-user-role");

  const adminData = {
    message: "Welcome to Admin Dashboard",
    accessLevel: "Full administrative access",
    user: {
      id: userId,
      email: userEmail,
      role: userRole,
    },
    availableActions: [
      "View all users",
      "Delete users",
      "View reports",
      "Manage blood banks",
      "View system analytics",
    ],
  };

  return sendSuccess(adminData, "Admin access granted");
}
