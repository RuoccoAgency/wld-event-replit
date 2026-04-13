import type { Express, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { eq, and, gte, lte, desc, sql, SQL } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { db } from "./storage";
import { hrUsers, hrAttendance, hrVacations, hrSessions, hrPerformance } from "@shared/schema";
import {
  signAccessToken,
  generateRefreshToken,
  hashToken,
  hrAuth,
  requireHrAdmin,
  requireHrEmployee,
  REFRESH_COOKIE,
  REFRESH_TOKEN_TTL_MS,
} from "./hr-auth";

function todayString(): string {
  return new Date().toISOString().split("T")[0];
}

const REFRESH_COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: REFRESH_TOKEN_TTL_MS,
  path: "/api/hr",
};

export function registerHrRoutes(app: Express) {

  app.post("/api/hr/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email e password obbligatori" });
      }

      const rows = await db
        .select()
        .from(hrUsers)
        .where(and(eq(hrUsers.email, email), eq(hrUsers.status, "active")))
        .limit(1);

      const user = rows[0];
      if (!user) {
        return res.status(401).json({ message: "Credenziali non valide" });
      }

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        return res.status(401).json({ message: "Credenziali non valide" });
      }

      const accessToken = signAccessToken({ id: user.id, role: user.role });
      const rawRefresh = generateRefreshToken();
      const tokenHash = hashToken(rawRefresh);
      const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);

      await db.insert(hrSessions).values({ userId: user.id, tokenHash, expiresAt });

      res.cookie(REFRESH_COOKIE, rawRefresh, REFRESH_COOKIE_OPTS);

      return res.json({
        accessToken,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
    } catch (error) {
      console.error("[hr] login error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.post("/api/hr/refresh", async (req: Request, res: Response) => {
    try {
      const rawRefresh = req.cookies?.[REFRESH_COOKIE];
      if (!rawRefresh) {
        return res.status(401).json({ message: "Refresh token mancante" });
      }

      const tokenHash = hashToken(rawRefresh);
      const now = new Date();

      const sessions = await db
        .select()
        .from(hrSessions)
        .where(and(eq(hrSessions.tokenHash, tokenHash), gte(hrSessions.expiresAt, now)))
        .limit(1);

      const session = sessions[0];
      if (!session) {
        res.clearCookie(REFRESH_COOKIE, { path: "/api/hr" });
        return res.status(401).json({ message: "Sessione non valida o scaduta" });
      }

      const users = await db
        .select()
        .from(hrUsers)
        .where(and(eq(hrUsers.id, session.userId), eq(hrUsers.status, "active")))
        .limit(1);

      const user = users[0];
      if (!user) {
        await db.delete(hrSessions).where(eq(hrSessions.id, session.id));
        res.clearCookie(REFRESH_COOKIE, { path: "/api/hr" });
        return res.status(401).json({ message: "Utente non trovato o disattivato" });
      }

      const newRawRefresh = generateRefreshToken();
      const newHash = hashToken(newRawRefresh);
      const newExpiry = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);

      await db.delete(hrSessions).where(eq(hrSessions.id, session.id));
      await db.insert(hrSessions).values({ userId: user.id, tokenHash: newHash, expiresAt: newExpiry });

      const accessToken = signAccessToken({ id: user.id, role: user.role });
      res.cookie(REFRESH_COOKIE, newRawRefresh, REFRESH_COOKIE_OPTS);

      return res.json({ accessToken });
    } catch (error) {
      console.error("[hr] refresh error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.get("/api/hr/me", hrAuth, async (req: Request, res: Response) => {
    try {
      const rows = await db
        .select({ id: hrUsers.id, name: hrUsers.name, email: hrUsers.email, role: hrUsers.role })
        .from(hrUsers)
        .where(and(eq(hrUsers.id, req.hrUser!.id), eq(hrUsers.status, "active")))
        .limit(1);

      if (!rows[0]) {
        return res.status(401).json({ message: "Utente non trovato" });
      }
      return res.json(rows[0]);
    } catch (error) {
      console.error("[hr] /me error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.post("/api/hr/logout", async (req: Request, res: Response) => {
    try {
      const rawRefresh = req.cookies?.[REFRESH_COOKIE];
      if (rawRefresh) {
        const tokenHash = hashToken(rawRefresh);
        await db.delete(hrSessions).where(eq(hrSessions.tokenHash, tokenHash));
      }
      res.clearCookie(REFRESH_COOKIE, { path: "/api/hr" });
      return res.json({ ok: true });
    } catch (error) {
      console.error("[hr] logout error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.post("/api/hr/attendance/checkin", requireHrEmployee, async (req: Request, res: Response) => {
    try {
      const userId = req.hrUser!.id;
      const today = todayString();

      const existing = await db
        .select()
        .from(hrAttendance)
        .where(and(eq(hrAttendance.userId, userId), eq(hrAttendance.date, today)))
        .limit(1);

      if (existing[0]?.checkIn) {
        return res.status(409).json({ message: "Già timbrato in entrata oggi" });
      }

      const now = new Date();

      if (existing[0]) {
        const updated = await db
          .update(hrAttendance)
          .set({ checkIn: now })
          .where(eq(hrAttendance.id, existing[0].id))
          .returning();
        return res.json(updated[0]);
      }

      const inserted = await db
        .insert(hrAttendance)
        .values({ userId, date: today, checkIn: now })
        .returning();
      return res.json(inserted[0]);
    } catch (error) {
      console.error("[hr] checkin error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.post("/api/hr/attendance/checkout", requireHrEmployee, async (req: Request, res: Response) => {
    try {
      const userId = req.hrUser!.id;
      const today = todayString();

      const existing = await db
        .select()
        .from(hrAttendance)
        .where(and(eq(hrAttendance.userId, userId), eq(hrAttendance.date, today)))
        .limit(1);

      if (!existing[0]?.checkIn) {
        return res.status(409).json({ message: "Non hai ancora timbrato in entrata oggi" });
      }
      if (existing[0].checkOut) {
        return res.status(409).json({ message: "Già timbrato in uscita oggi" });
      }

      const updated = await db
        .update(hrAttendance)
        .set({ checkOut: new Date() })
        .where(eq(hrAttendance.id, existing[0].id))
        .returning();
      return res.json(updated[0]);
    } catch (error) {
      console.error("[hr] checkout error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.get("/api/hr/attendance/today", requireHrEmployee, async (req: Request, res: Response) => {
    try {
      const userId = req.hrUser!.id;
      const today = todayString();

      const records = await db
        .select()
        .from(hrAttendance)
        .where(and(eq(hrAttendance.userId, userId), eq(hrAttendance.date, today)))
        .limit(1);

      return res.json(records[0] || null);
    } catch (error) {
      console.error("[hr] attendance/today error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.get("/api/hr/attendance/history", requireHrEmployee, async (req: Request, res: Response) => {
    try {
      const userId = req.hrUser!.id;
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(50, parseInt(req.query.limit as string) || 20);
      const offset = (page - 1) * limit;

      const records = await db
        .select()
        .from(hrAttendance)
        .where(eq(hrAttendance.userId, userId))
        .orderBy(desc(hrAttendance.date))
        .limit(limit)
        .offset(offset);

      const countResult = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(hrAttendance)
        .where(eq(hrAttendance.userId, userId));

      return res.json({ records, total: countResult[0]?.count || 0, page, limit });
    } catch (error) {
      console.error("[hr] attendance/history error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.get("/api/hr/attendance/all", requireHrAdmin, async (req: Request, res: Response) => {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(100, parseInt(req.query.limit as string) || 30);
      const offset = (page - 1) * limit;
      const { userId, dateFrom, dateTo } = req.query;

      const conditions: SQL[] = [];
      if (userId) conditions.push(eq(hrAttendance.userId, parseInt(userId as string)));
      if (dateFrom) conditions.push(gte(hrAttendance.date, dateFrom as string));
      if (dateTo) conditions.push(lte(hrAttendance.date, dateTo as string));

      const where = conditions.length > 0 ? and(...conditions) : undefined;

      const records = await db
        .select({
          id: hrAttendance.id,
          userId: hrAttendance.userId,
          date: hrAttendance.date,
          checkIn: hrAttendance.checkIn,
          checkOut: hrAttendance.checkOut,
          notes: hrAttendance.notes,
          userName: hrUsers.name,
          userEmail: hrUsers.email,
        })
        .from(hrAttendance)
        .leftJoin(hrUsers, eq(hrAttendance.userId, hrUsers.id))
        .where(where)
        .orderBy(desc(hrAttendance.date))
        .limit(limit)
        .offset(offset);

      const countResult = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(hrAttendance)
        .leftJoin(hrUsers, eq(hrAttendance.userId, hrUsers.id))
        .where(where);

      return res.json({ records, total: countResult[0]?.count || 0, page, limit });
    } catch (error) {
      console.error("[hr] attendance/all error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.post("/api/hr/vacations", requireHrEmployee, async (req: Request, res: Response) => {
    try {
      const userId = req.hrUser!.id;
      const { startDate, endDate, reason } = req.body;

      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Date obbligatorie" });
      }
      if (startDate >= endDate) {
        return res.status(400).json({ message: "La data di inizio deve essere prima della data di fine" });
      }

      const overlapping = await db
        .select({ id: hrVacations.id })
        .from(hrVacations)
        .where(
          and(
            eq(hrVacations.userId, userId),
            eq(hrVacations.status, "approved"),
            lte(hrVacations.startDate, endDate),
            gte(hrVacations.endDate, startDate),
          )
        )
        .limit(1);

      if (overlapping.length > 0) {
        return res.status(409).json({ message: "Esiste già una richiesta approvata in questo periodo" });
      }

      const inserted = await db
        .insert(hrVacations)
        .values({ userId, startDate, endDate, reason: reason || null, status: "pending" })
        .returning();
      return res.status(201).json(inserted[0]);
    } catch (error) {
      console.error("[hr] vacations POST error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.get("/api/hr/vacations/mine", requireHrEmployee, async (req: Request, res: Response) => {
    try {
      const userId = req.hrUser!.id;

      const records = await db
        .select()
        .from(hrVacations)
        .where(eq(hrVacations.userId, userId))
        .orderBy(desc(hrVacations.startDate));

      return res.json(records);
    } catch (error) {
      console.error("[hr] vacations/mine error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.get("/api/hr/vacations/all", requireHrAdmin, async (req: Request, res: Response) => {
    try {
      const { userId, status, dateFrom, dateTo } = req.query;

      const conditions: SQL[] = [];
      if (userId) conditions.push(eq(hrVacations.userId, parseInt(userId as string)));
      if (status) conditions.push(eq(hrVacations.status, status as "pending" | "approved" | "rejected"));
      if (dateFrom) conditions.push(gte(hrVacations.startDate, dateFrom as string));
      if (dateTo) conditions.push(lte(hrVacations.endDate, dateTo as string));

      const where = conditions.length > 0 ? and(...conditions) : undefined;

      const employeeAlias = alias(hrUsers, "employee");
      const adminAlias = alias(hrUsers, "admin_user");

      const records = await db
        .select({
          id: hrVacations.id,
          userId: hrVacations.userId,
          startDate: hrVacations.startDate,
          endDate: hrVacations.endDate,
          reason: hrVacations.reason,
          status: hrVacations.status,
          decidedBy: hrVacations.decidedBy,
          decidedAt: hrVacations.decidedAt,
          userName: employeeAlias.name,
          userEmail: employeeAlias.email,
          decidedByName: adminAlias.name,
        })
        .from(hrVacations)
        .leftJoin(employeeAlias, eq(hrVacations.userId, employeeAlias.id))
        .leftJoin(adminAlias, eq(hrVacations.decidedBy, adminAlias.id))
        .where(where)
        .orderBy(desc(hrVacations.startDate));

      return res.json(records);
    } catch (error) {
      console.error("[hr] vacations/all error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.patch("/api/hr/vacations/:id/decide", requireHrAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Status non valido" });
      }

      const vacation = await db
        .select()
        .from(hrVacations)
        .where(eq(hrVacations.id, id))
        .limit(1);

      if (!vacation[0]) {
        return res.status(404).json({ message: "Richiesta non trovata" });
      }

      const updated = await db
        .update(hrVacations)
        .set({ status, decidedBy: req.hrUser!.id, decidedAt: new Date() })
        .where(eq(hrVacations.id, id))
        .returning();
      return res.json(updated[0]);
    } catch (error) {
      console.error("[hr] vacations/decide error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.get("/api/hr/employees", requireHrAdmin, async (req: Request, res: Response) => {
    try {
      const employees = await db
        .select({
          id: hrUsers.id,
          name: hrUsers.name,
          email: hrUsers.email,
          role: hrUsers.role,
          status: hrUsers.status,
          createdAt: hrUsers.createdAt,
        })
        .from(hrUsers)
        .orderBy(hrUsers.name);

      return res.json(employees);
    } catch (error) {
      console.error("[hr] employees GET error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.get("/api/hr/employees/stats", requireHrAdmin, async (req: Request, res: Response) => {
    try {
      const today = todayString();

      const activeResult = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(hrUsers)
        .where(eq(hrUsers.status, "active"));

      const presentResult = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(hrAttendance)
        .where(and(eq(hrAttendance.date, today), sql`${hrAttendance.checkIn} IS NOT NULL`));

      return res.json({
        active: activeResult[0]?.count || 0,
        presentToday: presentResult[0]?.count || 0,
      });
    } catch (error) {
      console.error("[hr] employees/stats error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.post("/api/hr/employees", requireHrAdmin, async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Nome, email e password obbligatori" });
      }

      const roleValue: "admin" | "employee" = role === "admin" ? "admin" : "employee";
      const passwordHash = await bcrypt.hash(password, 10);

      const inserted = await db
        .insert(hrUsers)
        .values({ name, email, passwordHash, role: roleValue, status: "active" })
        .returning({
          id: hrUsers.id,
          name: hrUsers.name,
          email: hrUsers.email,
          role: hrUsers.role,
          status: hrUsers.status,
          createdAt: hrUsers.createdAt,
        });
      return res.status(201).json(inserted[0]);
    } catch (error: unknown) {
      console.error("[hr] employees POST error:", error);
      if (typeof error === "object" && error !== null) {
        const pgErr = error as { constraint?: string; detail?: string };
        if (pgErr.constraint?.includes("email") || pgErr.detail?.includes("email")) {
          return res.status(409).json({ message: "Email già in uso" });
        }
      }
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.patch("/api/hr/employees/:id", requireHrAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { name, status, password } = req.body;

      const updates: Partial<{ name: string; status: "active" | "inactive"; passwordHash: string }> = {};
      if (typeof name === "string") updates.name = name;
      if (status === "active" || status === "inactive") updates.status = status;
      if (typeof password === "string" && password.length > 0) updates.passwordHash = await bcrypt.hash(password, 10);

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "Nessun campo da aggiornare" });
      }

      const updated = await db
        .update(hrUsers)
        .set(updates)
        .where(eq(hrUsers.id, id))
        .returning({
          id: hrUsers.id,
          name: hrUsers.name,
          email: hrUsers.email,
          role: hrUsers.role,
          status: hrUsers.status,
        });

      if (!updated[0]) {
        return res.status(404).json({ message: "Utente non trovato" });
      }
      return res.json(updated[0]);
    } catch (error) {
      console.error("[hr] employees PATCH error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  app.delete("/api/hr/employees/:id", requireHrAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      if (id === req.hrUser!.id) {
        return res.status(400).json({ message: "Non puoi disattivare il tuo account" });
      }

      await db.delete(hrSessions).where(eq(hrSessions.userId, id));

      const updated = await db
        .update(hrUsers)
        .set({ status: "inactive" })
        .where(eq(hrUsers.id, id))
        .returning({ id: hrUsers.id, status: hrUsers.status });

      if (!updated[0]) {
        return res.status(404).json({ message: "Utente non trovato" });
      }
      return res.json({ success: true, id: updated[0].id, status: "inactive" });
    } catch (error) {
      console.error("[hr] employees DELETE error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  // ── Performance ──────────────────────────────────────────────────────────

  // POST /api/hr/performance/increment — employee increments contracts or modules by 1
  app.post("/api/hr/performance/increment", requireHrEmployee, async (req: Request, res: Response) => {
    try {
      const userId = req.hrUser!.id;
      const { field, note } = req.body as { field?: string; note?: string };

      if (field !== "contracts" && field !== "modules") {
        return res.status(400).json({ message: "field deve essere 'contracts' o 'modules'" });
      }

      const today = todayString();

      const existing = await db
        .select()
        .from(hrPerformance)
        .where(and(eq(hrPerformance.userId, userId), eq(hrPerformance.date, today)))
        .limit(1);

      let row: typeof hrPerformance.$inferSelect;

      if (existing[0]) {
        const updates: Partial<typeof hrPerformance.$inferInsert> = {
          updatedAt: new Date(),
          contractsCount: field === "contracts" ? existing[0].contractsCount + 1 : existing[0].contractsCount,
          modulesCount: field === "modules" ? existing[0].modulesCount + 1 : existing[0].modulesCount,
        };
        if (note !== undefined && note !== "") updates.note = note;

        const updated = await db
          .update(hrPerformance)
          .set(updates)
          .where(eq(hrPerformance.id, existing[0].id))
          .returning();
        row = updated[0];
      } else {
        const inserted = await db
          .insert(hrPerformance)
          .values({
            userId,
            date: today,
            contractsCount: field === "contracts" ? 1 : 0,
            modulesCount: field === "modules" ? 1 : 0,
            note: note && note !== "" ? note : null,
          })
          .returning();
        row = inserted[0];
      }

      return res.json({
        id: row.id,
        date: row.date,
        contractsCount: row.contractsCount,
        modulesCount: row.modulesCount,
        note: row.note,
      });
    } catch (error) {
      console.error("[hr] performance increment error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  // GET /api/hr/performance/mine — employee's own performance history
  app.get("/api/hr/performance/mine", requireHrEmployee, async (req: Request, res: Response) => {
    try {
      const userId = req.hrUser!.id;
      const limit = Math.min(parseInt(req.query.limit as string) || 30, 90);

      const rows = await db
        .select({
          id: hrPerformance.id,
          date: hrPerformance.date,
          contractsCount: hrPerformance.contractsCount,
          modulesCount: hrPerformance.modulesCount,
          note: hrPerformance.note,
        })
        .from(hrPerformance)
        .where(eq(hrPerformance.userId, userId))
        .orderBy(desc(hrPerformance.date))
        .limit(limit);

      return res.json(rows);
    } catch (error) {
      console.error("[hr] performance mine error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  // Helper: current-month date range
  function currentMonthRange(): { from: string; to: string } {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    const to = now.toISOString().split("T")[0];
    return { from, to };
  }

  // GET /api/hr/performance/leaderboard — admin ranked view
  app.get("/api/hr/performance/leaderboard", requireHrAdmin, async (req: Request, res: Response) => {
    try {
      let { from, to } = req.query as { from?: string; to?: string };
      if ((!from && to) || (from && !to)) {
        return res.status(400).json({ message: "Fornire sia 'from' che 'to', oppure nessuno dei due" });
      }
      if (!from || !to) {
        const range = currentMonthRange();
        from = range.from;
        to = range.to;
      }

      const rows = await db.execute(sql`
        SELECT
          u.id   AS "userId",
          u.name AS "name",
          COALESCE(SUM(p.contracts_count), 0)::int AS "contractsTotal",
          COALESCE(SUM(p.modules_count), 0)::int   AS "modulesTotal"
        FROM hr_users u
        LEFT JOIN hr_performance p
          ON p.user_id = u.id AND p.date BETWEEN ${from} AND ${to}
        WHERE u.status = 'active' AND u.role = 'employee'
        GROUP BY u.id, u.name
        ORDER BY "contractsTotal" DESC, "modulesTotal" DESC
      `);

      const ranked = (rows.rows as Array<{ userId: number; name: string; contractsTotal: number; modulesTotal: number }>).map(
        (r, i) => ({ rank: i + 1, ...r })
      );

      return res.json({ from, to, rows: ranked });
    } catch (error) {
      console.error("[hr] leaderboard error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });

  // GET /api/hr/performance/leaderboard/csv — admin CSV export
  app.get("/api/hr/performance/leaderboard/csv", requireHrAdmin, async (req: Request, res: Response) => {
    try {
      let { from, to } = req.query as { from?: string; to?: string };
      if ((!from && to) || (from && !to)) {
        return res.status(400).json({ message: "Fornire sia 'from' che 'to', oppure nessuno dei due" });
      }
      if (!from || !to) {
        const range = currentMonthRange();
        from = range.from;
        to = range.to;
      }

      const rows = await db.execute(sql`
        SELECT
          u.id   AS "userId",
          u.name AS "name",
          COALESCE(SUM(p.contracts_count), 0)::int AS "contractsTotal",
          COALESCE(SUM(p.modules_count), 0)::int   AS "modulesTotal"
        FROM hr_users u
        LEFT JOIN hr_performance p
          ON p.user_id = u.id AND p.date BETWEEN ${from} AND ${to}
        WHERE u.status = 'active' AND u.role = 'employee'
        GROUP BY u.id, u.name
        ORDER BY "contractsTotal" DESC, "modulesTotal" DESC
      `);

      const data = rows.rows as Array<{ name: string; contractsTotal: number; modulesTotal: number }>;

      let csv = "Posizione,Nome,Contratti,Moduli\n";
      data.forEach((r, i) => {
        const name = `"${r.name.replace(/"/g, '""')}"`;
        csv += `${i + 1},${name},${r.contractsTotal},${r.modulesTotal}\n`;
      });

      const filename = `leaderboard-${todayString()}.csv`;
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      return res.send(csv);
    } catch (error) {
      console.error("[hr] leaderboard csv error:", error);
      return res.status(500).json({ message: "Errore del server" });
    }
  });
}
