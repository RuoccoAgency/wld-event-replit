import { db } from "./storage";
import { cars, carImages } from "@shared/schema";
import { sql } from "drizzle-orm";
import { seedCars, seedImages } from "./seed-data";

function seedLog(message: string) {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [seed] ${message}`);
}

export async function seedProductionDatabase() {
  try {
    const result = await db.select({ count: sql<number>`count(*)` }).from(cars);
    const count = Number(result[0].count);

    if (count > 0) {
      return;
    }

    seedLog("Production database is empty, seeding data...");

    for (const car of seedCars) {
      await db.execute(sql`
        INSERT INTO cars (id, slug, brand, model, title, price_eur, price_text, power_cv, year, engine, color, seats, tags, description, status)
        OVERRIDING SYSTEM VALUE
        VALUES (${car.id}, ${car.slug}, ${car.brand}, ${car.model}, ${car.title}, ${car.priceEur}, ${car.priceText}, ${car.powerCv}, ${car.year}, ${car.engine}, ${car.color}, ${car.seats}, ${car.tags}, ${car.description}, ${car.status})
      `);
    }

    for (const img of seedImages) {
      await db.execute(sql`
        INSERT INTO car_images (id, car_id, url, alt, sort_order, is_cover)
        OVERRIDING SYSTEM VALUE
        VALUES (${img.id}, ${img.carId}, ${img.url}, ${img.alt}, ${img.sortOrder}, ${img.isCover})
      `);
    }

    const maxCarId = Math.max(...seedCars.map(c => c.id));
    const maxImageId = Math.max(...seedImages.map(i => i.id));
    await db.execute(sql`SELECT setval(pg_get_serial_sequence('cars', 'id'), ${maxCarId})`);
    await db.execute(sql`SELECT setval(pg_get_serial_sequence('car_images', 'id'), ${maxImageId})`);

    seedLog(`Seeded ${seedCars.length} cars and ${seedImages.length} images`);
  } catch (error) {
    seedLog(`Seed error: ${error}`);
  }
}
