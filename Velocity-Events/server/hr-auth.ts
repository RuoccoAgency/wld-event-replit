import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.HR_JWT_SECRET || "hr-jwt-secret-dev";

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

export function signHrToken(payload: HrTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
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
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function requireHrAdmin(req: Request, res: Response, next: NextFunction) {
  hrAuth(req, res, () => {
    if (req.hrUser?.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  });
}
