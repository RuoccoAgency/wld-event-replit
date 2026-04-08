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

    console.log(`[hr-seed] ✓ First HR admin created`);
    console.log(`[hr-seed]   Email:    ${email}`);
    console.log(`[hr-seed]   Password: ${password}`);
    console.log(`[hr-seed]   (Set HR_ADMIN_EMAIL and HR_ADMIN_PASSWORD env vars to change these)`);
  } catch (error) {
    console.error("[hr-seed] Error seeding HR admin:", error);
  }
}
