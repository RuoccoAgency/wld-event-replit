import { sql, relations, SQL } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, pgEnum, serial, date } from "drizzle-orm/pg-core";
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

export const hrRoleEnum = pgEnum("hr_role", ["admin", "employee"]);
export const hrStatusEnum = pgEnum("hr_status", ["active", "inactive"]);
export const hrVacationStatusEnum = pgEnum("hr_vacation_status", ["pending", "approved", "rejected"]);

export const hrUsers = pgTable("hr_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: hrRoleEnum("role").notNull().default("employee"),
  status: hrStatusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const hrAttendance = pgTable("hr_attendance", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => hrUsers.id),
  date: date("date").notNull(),
  checkIn: timestamp("check_in"),
  checkOut: timestamp("check_out"),
  notes: text("notes"),
});

export const hrVacations = pgTable("hr_vacations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => hrUsers.id),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  reason: text("reason"),
  status: hrVacationStatusEnum("status").notNull().default("pending"),
  decidedBy: integer("decided_by").references(() => hrUsers.id),
  decidedAt: timestamp("decided_at"),
});

export const hrSessions = pgTable("hr_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => hrUsers.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type HrSession = typeof hrSessions.$inferSelect;

export const hrUsersRelations = relations(hrUsers, ({ many }) => ({
  attendance: many(hrAttendance),
  vacations: many(hrVacations),
}));

export const hrAttendanceRelations = relations(hrAttendance, ({ one }) => ({
  user: one(hrUsers, { fields: [hrAttendance.userId], references: [hrUsers.id] }),
}));

export const hrVacationsRelations = relations(hrVacations, ({ one }) => ({
  user: one(hrUsers, { fields: [hrVacations.userId], references: [hrUsers.id] }),
  decidedByUser: one(hrUsers, { fields: [hrVacations.decidedBy], references: [hrUsers.id] }),
}));

export const hrPerformance = pgTable("hr_performance", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => hrUsers.id),
  date: date("date").notNull(),
  contractsCount: integer("contracts_count").notNull().default(0),
  modulesCount: integer("modules_count").notNull().default(0),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const richiesteClienti = pgTable("richieste_clienti", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  nomeCognome: text("nome_cognome").notNull(),
  email: text("email").notNull(),
  telefono: text("telefono"),
  dataEvento: date("data_evento"),
  tipoEvento: text("tipo_evento"),
  messaggio: text("messaggio"),
  vuoleVideochiamata: boolean("vuole_videochiamata").default(false),
  dataPreferitaCall: date("data_preferita_call"),
  orarioPreferito: text("orario_preferito"),
});

export const candidaturePartner = pgTable("candidature_partner", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  nomeAzienda: text("nome_azienda").notNull(),
  nomeReferente: text("nome_referente").notNull(),
  emailAziendale: text("email_aziendale").notNull(),
  telefono: text("telefono"),
  cittaSede: text("citta_sede"),
  tipologiaServizi: text("tipologia_servizi"),
  descrizioneAttivita: text("descrizione_attivita"),
  urlVisuraCamerale: text("url_visura_camerale"),
  urlDocumentoIdentita: text("url_documento_identita"),
  urlCodiceFiscale: text("url_codice_fiscale"),
  stato: text("stato").default("in_attesa"),
});

export const insertRichiestaSchema = createInsertSchema(richiesteClienti).omit({
  id: true,
  createdAt: true,
});

export const insertCandidaturaSchema = createInsertSchema(candidaturePartner).omit({
  id: true,
  createdAt: true,
});

export type RichiestaClienti = typeof richiesteClienti.$inferSelect;
export type InsertRichiesta = z.infer<typeof insertRichiestaSchema>;
export type CandidaturaPartner = typeof candidaturePartner.$inferSelect;
export type InsertCandidatura = z.infer<typeof insertCandidaturaSchema>;
