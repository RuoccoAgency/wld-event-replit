import jwt from "jsonwebtoken";
import { createHash, randomBytes } from "crypto";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.HR_JWT_SECRET ?? "hr-jwt-secret-dev";

if (process.env.NODE_ENV === "production" && !process.env.HR_JWT_SECRET) {
  console.error(
    "[SECURITY] HR_JWT_SECRET is not set. Using an insecure default secret in production. " +
    "Set HR_JWT_SECRET to a strong random value immediately."
  );
}

export const REFRESH_COOKIE = "hr_refresh";
export const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface HrTokenPayload {
  id: number;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      hrUser?: HrTokenPayload;
    }
  }
}

export function signAccessToken(payload: HrTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(): string {
  return randomBytes(40).toString("hex");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function hrAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization required" });
  }
  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as HrTokenPayload;
    req.hrUser = { id: payload.id, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ message: "Token non valido o scaduto" });
  }
}

export function requireHrAdmin(req: Request, res: Response, next: NextFunction) {
  hrAuth(req, res, () => {
    if (req.hrUser?.role !== "admin") {
      return res.status(403).json({ message: "Accesso riservato agli amministratori" });
    }
    next();
  });
}

export function requireHrEmployee(req: Request, res: Response, next: NextFunction) {
  hrAuth(req, res, () => {
    if (req.hrUser?.role !== "employee") {
      return res.status(403).json({ message: "Accesso riservato ai dipendenti" });
    }
    next();
  });
}
