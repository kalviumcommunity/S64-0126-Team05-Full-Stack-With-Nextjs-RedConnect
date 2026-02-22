import { SignJWT, jwtVerify } from "jose";

const rawSecret =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "development" ? "dev-jwt-secret-change-me" : "");

if (!rawSecret) {
  throw new Error("JWT_SECRET environment variable must be set");
}

const JWT_SECRET = new TextEncoder().encode(rawSecret);

export interface TokenPayload {
  type?: "access" | "refresh";
  id?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
}

export const verifyToken = async (
  token: string
): Promise<TokenPayload | null> => {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as unknown as TokenPayload;
  } catch {
    return null;
  }
};

export const extractTokenFromHeader = (
  authHeader?: string | null
): string | null => {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;
  return parts[1];
};

export const generateAccessToken = async (
  payload: TokenPayload,
  expiresIn: string = "15m"
): Promise<string> => {
  const tokenPayload: TokenPayload = {
    ...payload,
    type: "access",
  };

  const token = await new SignJWT(tokenPayload)
    .setProtectedHeader({ alg: "HS512" })
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);

  return token;
};

export const generateRefreshToken = async (
  payload: TokenPayload,
  expiresIn: string = "7d"
): Promise<string> => {
  const tokenPayload: TokenPayload = {
    ...payload,
    type: "refresh",
  };

  const token = await new SignJWT(tokenPayload)
    .setProtectedHeader({ alg: "HS512" })
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);

  return token;
};

export const verifyAccessToken = async (
  token: string
): Promise<TokenPayload | null> => {
  const payload = await verifyToken(token);
  if (!payload || payload.type !== "access") {
    return null;
  }
  return payload;
};

export const verifyRefreshToken = async (
  token: string
): Promise<TokenPayload | null> => {
  const payload = await verifyToken(token);
  if (!payload || payload.type !== "refresh") {
    return null;
  }
  return payload;
};
