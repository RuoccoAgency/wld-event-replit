import { eq, desc, asc, ilike, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import {
  type User, type InsertUser,
  type Car, type InsertCar,
  type CarImage, type InsertCarImage,
  cars, carImages, users
} from "@shared/schema";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getCars(filters?: { status?: string; brand?: string; search?: string; page?: number; limit?: number }): Promise<{ cars: (Car & { images: CarImage[] })[]; total: number }>;
  getCarBySlug(slug: string): Promise<(Car & { images: CarImage[] }) | undefined>;
  getCarById(id: number): Promise<Car | undefined>;
  createCar(car: InsertCar): Promise<Car>;
  updateCar(id: number, car: Partial<InsertCar>): Promise<Car | undefined>;
  deleteCar(id: number): Promise<boolean>;

  addCarImage(image: InsertCarImage): Promise<CarImage>;
  getCarImages(carId: number): Promise<CarImage[]>;
  deleteCarImage(imageId: number): Promise<boolean>;
  reorderCarImages(carId: number, imageIds: number[]): Promise<void>;
  setCarImageCover(carId: number, imageId: number): Promise<void>;
  createRichiesta(richiesta: schema.InsertRichiesta): Promise<schema.RichiestaClienti>;
  createCandidatura(candidatura: schema.InsertCandidatura): Promise<schema.CandidaturaPartner>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getCars(filters?: { status?: string; brand?: string; search?: string; page?: number; limit?: number }): Promise<{ cars: (Car & { images: CarImage[] })[]; total: number }> {
    const conditions = [];
    if (filters?.status) {
      conditions.push(eq(cars.status, filters.status as any));
    }
    if (filters?.brand) {
      conditions.push(ilike(cars.brand, `%${filters.brand}%`));
    }
    if (filters?.search) {
      conditions.push(
        sql`(${ilike(cars.title, `%${filters.search}%`)} OR ${ilike(cars.brand, `%${filters.search}%`)} OR ${ilike(cars.model, `%${filters.search}%`)})`
      );
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const page = filters?.page || 1;
    const limit = filters?.limit || 50;
    const offset = (page - 1) * limit;

    const [carsResult, countResult] = await Promise.all([
      db.select().from(cars).where(where).orderBy(desc(cars.createdAt)).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)::int` }).from(cars).where(where),
    ]);

    const total = countResult[0]?.count || 0;

    const carsWithImages = await Promise.all(
      carsResult.map(async (car) => {
        const images = await db.select().from(carImages).where(eq(carImages.carId, car.id)).orderBy(asc(carImages.sortOrder));
        return { ...car, images };
      })
    );

    return { cars: carsWithImages, total };
  }

  async getCarBySlug(slug: string): Promise<(Car & { images: CarImage[] }) | undefined> {
    const result = await db.select().from(cars).where(eq(cars.slug, slug)).limit(1);
    if (!result[0]) return undefined;
    const images = await db.select().from(carImages).where(eq(carImages.carId, result[0].id)).orderBy(asc(carImages.sortOrder));
    return { ...result[0], images };
  }

  async getCarById(id: number): Promise<Car | undefined> {
    const result = await db.select().from(cars).where(eq(cars.id, id)).limit(1);
    return result[0];
  }

  async createCar(car: InsertCar): Promise<Car> {
    const result = await db.insert(cars).values(car).returning();
    return result[0];
  }

  async updateCar(id: number, car: Partial<InsertCar>): Promise<Car | undefined> {
    const result = await db.update(cars).set({ ...car, updatedAt: new Date() }).where(eq(cars.id, id)).returning();
    return result[0];
  }

  async deleteCar(id: number): Promise<boolean> {
    const result = await db.delete(cars).where(eq(cars.id, id)).returning();
    return result.length > 0;
  }

  async addCarImage(image: InsertCarImage): Promise<CarImage> {
    const result = await db.insert(carImages).values(image).returning();
    return result[0];
  }

  async getCarImages(carId: number): Promise<CarImage[]> {
    return db.select().from(carImages).where(eq(carImages.carId, carId)).orderBy(asc(carImages.sortOrder));
  }

  async deleteCarImage(imageId: number): Promise<boolean> {
    const result = await db.delete(carImages).where(eq(carImages.id, imageId)).returning();
    return result.length > 0;
  }

  async reorderCarImages(carId: number, imageIds: number[]): Promise<void> {
    await Promise.all(
      imageIds.map((imageId, index) =>
        db.update(carImages).set({ sortOrder: index }).where(and(eq(carImages.id, imageId), eq(carImages.carId, carId)))
      )
    );
  }

  async setCarImageCover(carId: number, imageId: number): Promise<void> {
    await db.update(carImages).set({ isCover: false }).where(eq(carImages.carId, carId));
    await db.update(carImages).set({ isCover: true }).where(and(eq(carImages.id, imageId), eq(carImages.carId, carId)));
  }

  async createRichiesta(richiesta: schema.InsertRichiesta): Promise<schema.RichiestaClienti> {
    const [newRichiesta] = await db.insert(schema.richiesteClienti).values(richiesta).returning();
    return newRichiesta;
  }

  async createCandidatura(candidatura: schema.InsertCandidatura): Promise<schema.CandidaturaPartner> {
    const [newCandidatura] = await db.insert(schema.candidaturePartner).values(candidatura).returning();
    return newCandidatura;
  }
}

export const storage = new DatabaseStorage();
