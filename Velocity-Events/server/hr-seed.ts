import bcrypt from "bcryptjs";
import { db } from "./storage";
import { hrUsers } from "@shared/schema";
import { sql } from "drizzle-orm";

export async function seedHrAdmin() {
  try {
    const result = await db.select({ count: sql<number>`count(*)` }).from(hrUsers);
    const count = Number(result[0].count);
    if (count > 0) return;

    const email = process.env.HR_ADMIN_EMAIL || "admin@hr.local";
    const password = process.env.HR_ADMIN_PASSWORD || "hrAdmin2025";
    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(hrUsers).values({
      email,
      passwordHash,
      name: "HR Admin",
      role: "admin",
      status: "active",
    });

    const usingDefaults = !process.env.HR_ADMIN_EMAIL && !process.env.HR_ADMIN_PASSWORD;
    console.log(`[hr-seed] First HR admin created: ${email}`);
    if (usingDefaults) {
      console.warn("[hr-seed] WARNING: Using default credentials. Set HR_ADMIN_EMAIL and HR_ADMIN_PASSWORD env vars before production use.");
    }
  } catch (error) {
    console.error("[hr-seed] Error seeding HR admin:", error);
  }
}
