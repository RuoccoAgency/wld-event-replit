import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const carStatusEnum = pgEnum("car_status", ["available", "reserved", "sold"]);

export const cars = pgTable("cars", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  title: text("title").notNull(),
  priceEur: integer("price_eur"),
  priceText: text("price_text"),
  powerCv: integer("power_cv"),
  year: integer("year"),
  engine: text("engine"),
  color: text("color"),
  seats: integer("seats"),
  tags: text("tags"),
  description: text("description"),
  status: carStatusEnum("status").notNull().default("available"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const carsRelations = relations(cars, ({ many }) => ({
  images: many(carImages),
}));

export const carImages = pgTable("car_images", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  carId: integer("car_id").notNull().references(() => cars.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  alt: text("alt"),
  sortOrder: integer("sort_order").notNull().default(0),
  isCover: boolean("is_cover").notNull().default(false),
});

export const carImagesRelations = relations(carImages, ({ one }) => ({
  car: one(cars, { fields: [carImages.carId], references: [cars.id] }),
}));

export const insertCarSchema = createInsertSchema(cars).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCarImageSchema = createInsertSchema(carImages).omit({
  id: true,
});

export type Car = typeof cars.$inferSelect;
export type InsertCar = z.infer<typeof insertCarSchema>;
export type CarImage = typeof carImages.$inferSelect;
export type InsertCarImage = z.infer<typeof insertCarImageSchema>;
