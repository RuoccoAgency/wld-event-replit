import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { cars, carImages } from "../shared/schema";

async function seed() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  const existing = await db.select().from(cars);
  if (existing.length > 0) {
    console.log("Cars already exist, skipping seed.");
    await pool.end();
    return;
  }

  console.log("Seeding cars...");

  const [bmw] = await db.insert(cars).values({
    slug: "bmw-x6-m-competition",
    brand: "BMW",
    model: "X6 M Competition",
    title: "BMW X6 M COMPETITION",
    priceEur: 100000,
    priceText: "1.000,00\u20AC",
    powerCv: 625,
    year: 2024,
    engine: "V8 Twin-Turbo",
    color: "Brooklyn Grey",
    seats: 5,
    tags: "Eventi Aziendali, Transfer VIP, Matrimoni Moderni, Shooting",
    description: "La BMW X6 M Competition unisce la presenza imponente di un SUV coup\u00E9 con le prestazioni di una supercar. Interni in pelle Merino, dettagli in carbonio e un sistema audio Bowers & Wilkins rendono ogni viaggio un'esperienza di lusso assoluto.",
    status: "available",
  }).returning();

  const [ferrari] = await db.insert(cars).values({
    slug: "ferrari-portofino-m",
    brand: "Ferrari",
    model: "Portofino M",
    title: "FERRARI PORTOFINO M",
    priceEur: 180000,
    priceText: "1.800,00\u20AC",
    powerCv: 620,
    year: 2023,
    engine: "3900 cc - V8",
    color: "Rosso Corsa",
    seats: 4,
    tags: "Matrimoni di lusso, Eventi aziendali, Eventi esclusivi",
    description: "La M sta a significare modificata, l'evoluzione della Portofino ricca di novit\u00E0 tecniche e design. Alla guida della Ferrari Portofino M ti immergi in un mondo di comfort e potenza contemporaneamente.",
    status: "available",
  }).returning();

  console.log(`Created BMW (id: ${bmw.id}) and Ferrari (id: ${ferrari.id})`);
  console.log("Seed complete! Upload images via the admin panel at /admin");

  await pool.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
