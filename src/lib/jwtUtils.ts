import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-key-change-in-production"
);

/**
 * JWT Token Payload
 */
export interface TokenPayload {
  id?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
}

/**
 * Generate JWT Token using jose
 * @param payload - User data to encode in token
 * @returns Signed JWT token
 */
export const generateToken = async (payload: TokenPayload): Promise<string> => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
  return token;
};

/**
 * Verify JWT Token using jose
 * @param token - JWT token string
 * @returns Decoded token payload or null if invalid
 */
export const verifyToken = async (token: string): Promise<TokenPayload | null> => {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as unknown as TokenPayload;
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
