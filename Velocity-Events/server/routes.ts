import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";
import { insertCarSchema } from "@shared/schema";
import { registerHrRoutes } from "./hr-routes";
import { supabase } from "./supabase";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin2025";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@wldeventi.it";

function adminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization required" });
  }

  const token = authHeader.replace("Bearer ", "");
  if (token !== ADMIN_PASSWORD) {
    return res.status(403).json({ message: "Invalid credentials" });
  }

  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  registerObjectStorageRoutes(app);

  app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body;
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return res.json({ token: ADMIN_PASSWORD, success: true });
    }
    return res.status(401).json({ message: "Credenziali non valide" });
  });

  app.get("/api/cars", async (req, res) => {
    try {
      const { status, brand, search, page, limit } = req.query;
      const result = await storage.getCars({
        status: status as string,
        brand: brand as string,
        search: search as string,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      res.json(result);
    } catch (error) {
      console.error("Error fetching cars:", error);
      res.status(500).json({ message: "Failed to fetch cars" });
    }
  });

  app.get("/api/cars/:slug", async (req, res) => {
    try {
      const car = await storage.getCarBySlug(req.params.slug);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.json(car);
    } catch (error) {
      console.error("Error fetching car:", error);
      res.status(500).json({ message: "Failed to fetch car" });
    }
  });

  app.post("/api/admin/cars", adminAuth, async (req, res) => {
    try {
      const parsed = insertCarSchema.parse(req.body);
      const car = await storage.createCar(parsed);
      res.status(201).json(car);
    } catch (error: any) {
      console.error("Error creating car:", error);
      res.status(400).json({ message: error.message || "Failed to create car" });
    }
  });

  app.put("/api/admin/cars/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const car = await storage.updateCar(id, req.body);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.json(car);
    } catch (error: any) {
      console.error("Error updating car:", error);
      res.status(400).json({ message: error.message || "Failed to update car" });
    }
  });

  app.delete("/api/admin/cars/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteCar(id);
      if (!deleted) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting car:", error);
      res.status(500).json({ message: "Failed to delete car" });
    }
  });

  app.post("/api/admin/cars/:id/images", adminAuth, async (req, res) => {
    try {
      const carId = parseInt(req.params.id);
      const car = await storage.getCarById(carId);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }

      const { url, alt, sortOrder, isCover } = req.body;
      const existingImages = await storage.getCarImages(carId);
      const image = await storage.addCarImage({
        carId,
        url,
        alt: alt || null,
        sortOrder: sortOrder ?? existingImages.length,
        isCover: isCover ?? existingImages.length === 0,
      });
      res.status(201).json(image);
    } catch (error) {
      console.error("Error adding car image:", error);
      res.status(500).json({ message: "Failed to add image" });
    }
  });

  app.put("/api/admin/cars/:id/images/reorder", adminAuth, async (req, res) => {
    try {
      const carId = parseInt(req.params.id);
      const { imageIds } = req.body;
      if (!Array.isArray(imageIds)) {
        return res.status(400).json({ message: "imageIds must be an array" });
      }
      await storage.reorderCarImages(carId, imageIds);
      const images = await storage.getCarImages(carId);
      res.json(images);
    } catch (error) {
      console.error("Error reordering images:", error);
      res.status(500).json({ message: "Failed to reorder images" });
    }
  });

  app.delete("/api/admin/cars/:id/images/:imageId", adminAuth, async (req, res) => {
    try {
      const imageId = parseInt(req.params.imageId);
      const deleted = await storage.deleteCarImage(imageId);
      if (!deleted) {
        return res.status(404).json({ message: "Image not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ message: "Failed to delete image" });
    }
  });

  app.post("/api/admin/cars/:id/images/:imageId/set-cover", adminAuth, async (req, res) => {
    try {
      const carId = parseInt(req.params.id);
      const imageId = parseInt(req.params.imageId);
      await storage.setCarImageCover(carId, imageId);
      const images = await storage.getCarImages(carId);
      res.json(images);
    } catch (error) {
      console.error("Error setting cover:", error);
      res.status(500).json({ message: "Failed to set cover" });
    }
  });

  // --- Form submissions → Supabase ---

  app.post("/api/bookings", async (req, res) => {
    const {
      name, email, phone, eventDate, eventType, message,
      videoCallRequested, preferredDate, preferredTime,
    } = req.body;
    const { error } = await supabase.from("richieste_clienti").insert([{
      nome_cognome: name,
      email,
      telefono: phone || null,
      data_evento: eventDate || null,
      tipo_evento: eventType || null,
      messaggio: message || null,
      vuole_videochiamata: videoCallRequested || false,
      data_preferita_call: preferredDate || null,
      orario_preferito: preferredTime || null,
    }]);
    if (error) {
      console.error("[supabase] booking insert error:", error.message);
      return res.status(500).json({ message: "Errore nel salvataggio della richiesta" });
    }
    res.json({ success: true });
  });

  app.post("/api/partner-applications", async (req, res) => {
    const {
      nomeAzienda, referente, email, telefono, citta,
      tipologiaServizi, descrizione,
      visuraCameraleUrl, documentoIdentitaUrl, codiceFiscaleUrl,
    } = req.body;
    const { error } = await supabase.from("candidature_partner").insert([{
      nome_azienda: nomeAzienda,
      nome_referente: referente,
      email_aziendale: email,
      telefono: telefono || null,
      citta_sede: citta || null,
      tipologia_servizi: tipologiaServizi || null,
      descrizione_attivita: descrizione || null,
      url_visura_camerale: visuraCameraleUrl || null,
      url_documento_identita: documentoIdentitaUrl || null,
      url_codice_fiscale: codiceFiscaleUrl || null,
    }]);
    if (error) {
      console.error("[supabase] partner application insert error:", error.message);
      return res.status(500).json({ message: "Errore nel salvataggio della candidatura" });
    }
    res.json({ success: true });
  });

  registerHrRoutes(app);

  return httpServer;
}
