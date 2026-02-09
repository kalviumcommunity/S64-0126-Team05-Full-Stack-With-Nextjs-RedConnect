import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-in-production";

/**
 * JWT Token Payload
 */
export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

/**
 * Generate JWT Token
 * @param payload - User data to encode in token
 * @returns Signed JWT token
 */
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "24h",
  });
};

/**
 * Verify JWT Token
 * @param token - JWT token string
 * @returns Decoded token payload or null if invalid
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
};

/**
 * Extract token from Authorization header
 * Expected format: "Bearer <token>"
 * @param authHeader - Authorization header value
 * @returns Token string or null
 */
export const extractTokenFromHeader = (authHeader?: string | null): string | null => {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;
  return parts[1];
};
