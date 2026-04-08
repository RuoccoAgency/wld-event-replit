import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { db } from "./storage";
import { hrUsers } from "@shared/schema";
import { sql } from "drizzle-orm";

const isProduction = process.env.NODE_ENV === "production";
const DEFAULT_DEV_PASSWORD = "hrAdmin2025";

export async function seedHrAdmin() {
  try {
    const result = await db.select({ count: sql<number>`count(*)` }).from(hrUsers);
    const count = Number(result[0].count);
    if (count > 0) return;

    const email = process.env.HR_ADMIN_EMAIL || (isProduction ? undefined : "admin@hr.local");

    if (isProduction && !email) {
      throw new Error(
        "[SECURITY] HR_ADMIN_EMAIL env var is required in production. " +
        "Set it before starting the server."
      );
    }

    let password: string;
    let generatedPassword = false;

    if (isProduction && !process.env.HR_ADMIN_PASSWORD) {
      password = randomBytes(16).toString("hex");
      generatedPassword = true;
    } else {
      password = process.env.HR_ADMIN_PASSWORD || DEFAULT_DEV_PASSWORD;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(hrUsers).values({
      email: email!,
      passwordHash,
      name: "HR Admin",
      role: "admin",
      status: "active",
    });

    console.log(`[hr-seed] First HR admin created: ${email}`);
    if (generatedPassword) {
      console.log(`[hr-seed] AUTO-GENERATED password: ${password}`);
      console.log(`[hr-seed] Save this password now — it will not be shown again. Set HR_ADMIN_PASSWORD env var to change it on next reset.`);
    } else if (!isProduction) {
      console.warn("[hr-seed] Using default dev credentials. Do not use in production.");
    }
  } catch (error) {
    console.error("[hr-seed] Error seeding HR admin:", error);
    if (isProduction) throw error;
  }
}
