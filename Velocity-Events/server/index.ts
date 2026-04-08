import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { seedProductionDatabase } from "./seed";
import { seedHrAdmin } from "./hr-seed";
import { serveStatic } from "./static";


const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// CORS: consenti chiamate dal frontend Vercel
// Imposta in Railway una env: FRONTEND_URL = https://tuo-sito.vercel.app
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL?.replace(/\/$/, ""), // senza slash finale
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, cb) => {
      // richieste senza origin (curl/postman) -> ok
      if (!origin) return cb(null, true);
      if (allowedOrigins.length === 0) return cb(null, true); // se non setti FRONTEND_URL
      return allowedOrigins.includes(origin) ? cb(null, true) : cb(new Error("CORS blocked"), false);
    },
    credentials: true,
  }),
);

app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as any).rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);

}

// Log solo per /api
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  const originalResJson = res.json;
  let capturedJsonResponse: Record<string, any> | undefined;

  res.json = function (bodyJson: any, ...args: any[]) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;

      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      log(logLine);
    }
  });

  next();
});

// Healthcheck
app.get("/health", (_req, res) => res.status(200).send("ok"));

(async () => {
  // Registra tutte le routes API (es: /api/...)
  await seedProductionDatabase();
  await seedHrAdmin();

  await registerRoutes(httpServer, app);

  if (app.get("env") === "development") {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  } else {
    serveStatic(app);
  }

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });

  const port = parseInt(process.env.PORT || "5000", 10);

  httpServer.listen({ port, host: "0.0.0.0" }, () => {
    log(`API serving on port ${port}`);

  });
})();
