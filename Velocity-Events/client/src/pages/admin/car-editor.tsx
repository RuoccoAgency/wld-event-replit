import { useState, useEffect, useCallback } from "react";
import { useRoute, useLocation } from "wouter";
import { adminFetch, isAdminLoggedIn } from "@/lib/adminAuth";
import { useUpload } from "@/hooks/use-upload";
import { ArrowLeft, Upload, Star, Trash2, GripVertical, Loader2 } from "lucide-react";
import { Link } from "wouter";
import type { Car, CarImage } from "@/types/schema";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface CarForm {
  slug: string;
  brand: string;
  model: string;
  title: string;
  priceEur: string;
  priceText: string;
  powerCv: string;
  year: string;
  engine: string;
  color: string;
  seats: string;
  tags: string;
  description: string;
  status: string;
}

const defaultForm: CarForm = {
  slug: "",
  brand: "",
  model: "",
  title: "",
  priceEur: "",
  priceText: "",
  powerCv: "",
  year: "",
  engine: "",
  color: "",
  seats: "",
  tags: "",
  description: "",
  status: "available",
};

export default function CarEditor() {
  const [matched, params] = useRoute("/admin/cars/:id");
  const isNew = params?.id === "new";
  const carId = isNew ? null : params?.id ? parseInt(params.id) : null;

  const [form, setForm] = useState<CarForm>(defaultForm);
  const [images, setImages] = useState<CarImage[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [, setLocation] = useLocation();
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [uploadingFiles, setUploadingFiles] = useState(false);

  const { uploadFile, isUploading } = useUpload({
    onError: (err) => setError(`Upload error: ${err.message}`),
  });

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      setLocation("/admin");
      return;
    }
    if (carId) {
      fetchCar();
    }
  }, [carId]);

  const fetchCar = async () => {
    try {
      const res = await fetch(`/api/cars?limit=100`);
      const data = await res.json();
      const car = (data.cars as (Car & { images: CarImage[] })[]).find(
        (c) => c.id === carId
      );
      if (!car) {
        setError("Auto non trovata");
        return;
      }
      setForm({
        slug: car.slug,
        brand: car.brand,
        model: car.model,
        title: car.title,
        priceEur: car.priceEur?.toString() || "",
        priceText: car.priceText || "",
        powerCv: car.powerCv?.toString() || "",
        year: car.year?.toString() || "",
        engine: car.engine || "",
        color: car.color || "",
        seats: car.seats?.toString() || "",
        tags: car.tags || "",
        description: car.description || "",
        status: car.status,
      });
      setImages(car.images || []);
    } catch {
      setError("Errore nel caricamento");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "title" && (isNew || !prev.slug)) {
        updated.slug = slugify(value);
      }
      return updated;
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const body: any = {
        slug: form.slug,
        brand: form.brand,
        model: form.model,
        title: form.title,
        priceText: form.priceText || null,
        engine: form.engine || null,
        color: form.color || null,
        tags: form.tags || null,
        description: form.description || null,
        status: form.status,
      };
      if (form.priceEur) body.priceEur = parseInt(form.priceEur);
      if (form.powerCv) body.powerCv = parseInt(form.powerCv);
      if (form.year) body.year = parseInt(form.year);
      if (form.seats) body.seats = parseInt(form.seats);

      let res;
      if (isNew) {
        res = await adminFetch("/api/admin/cars", {
          method: "POST",
          body: JSON.stringify(body),
        });
      } else {
        res = await adminFetch(`/api/admin/cars/${carId}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Errore nel salvataggio");
      }

      const savedCar = await res.json();

      if (isNew) {
        setLocation(`/admin/cars/${savedCar.id}`);
      } else {
        setSuccess("Auto salvata con successo!");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!carId || !e.target.files?.length) return;
    setUploadingFiles(true);
    setError("");

    const files = Array.from(e.target.files);

    for (const file of files) {
      try {
        const uploadResult = await uploadFile(file);
        if (uploadResult) {
          const res = await adminFetch(`/api/admin/cars/${carId}/images`, {
            method: "POST",
            body: JSON.stringify({
              url: uploadResult.objectPath,
              alt: file.name,
            }),
          });
          if (res.ok) {
            const newImage = await res.json();
            setImages((prev) => [...prev, newImage]);
          }
        }
      } catch (err) {
        console.error("Upload failed for file:", file.name, err);
      }
    }

    setUploadingFiles(false);
    e.target.value = "";
  };

  const deleteImage = async (imageId: number) => {
    if (!carId) return;
    try {
      await adminFetch(`/api/admin/cars/${carId}/images/${imageId}`, {
        method: "DELETE",
      });
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  };

  const setCover = async (imageId: number) => {
    if (!carId) return;
    try {
      const res = await adminFetch(
        `/api/admin/cars/${carId}/images/${imageId}/set-cover`,
        { method: "POST" }
      );
      if (res.ok) {
        const updatedImages = await res.json();
        setImages(updatedImages);
      }
    } catch (err) {
      console.error("Failed to set cover:", err);
    }
  };

  const handleDragStart = (idx: number) => {
    setDragIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;

    const newImages = [...images];
    const [movedItem] = newImages.splice(dragIdx, 1);
    newImages.splice(idx, 0, movedItem);
    setImages(newImages);
    setDragIdx(idx);
  };

  const handleDragEnd = async () => {
    setDragIdx(null);
    if (!carId) return;
    const imageIds = images.map((img) => img.id);
    try {
      await adminFetch(`/api/admin/cars/${carId}/images/reorder`, {
        method: "PUT",
        body: JSON.stringify({ imageIds }),
      });
    } catch (err) {
      console.error("Failed to reorder:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          href="/admin/cars"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Torna alla lista
        </Link>

        <h1 className="text-2xl font-serif mb-8">
          {isNew ? "Nuova Auto" : "Modifica Auto"}
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-300 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-900/30 border border-green-800 text-green-300 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Brand" name="brand" value={form.brand} onChange={handleChange} required />
            <Field label="Modello" name="model" value={form.model} onChange={handleChange} required />
            <Field label="Titolo" name="title" value={form.title} onChange={handleChange} required className="md:col-span-2" />
            <Field label="Slug" name="slug" value={form.slug} onChange={handleChange} required />
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-1">Stato</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-white rounded focus:outline-none focus:border-primary"
              >
                <option value="available">Disponibile</option>
                <option value="reserved">Riservata</option>
                <option value="sold">Venduta</option>
              </select>
            </div>
            <Field label="Prezzo EUR" name="priceEur" value={form.priceEur} onChange={handleChange} type="number" />
            <Field label="Prezzo Testo" name="priceText" value={form.priceText} onChange={handleChange} placeholder="es: 1.000,00€" />
            <Field label="CV" name="powerCv" value={form.powerCv} onChange={handleChange} type="number" />
            <Field label="Anno" name="year" value={form.year} onChange={handleChange} type="number" />
            <Field label="Motore" name="engine" value={form.engine} onChange={handleChange} />
            <Field label="Colore" name="color" value={form.color} onChange={handleChange} />
            <Field label="Posti" name="seats" value={form.seats} onChange={handleChange} type="number" />
            <Field label="Tags (virgola separati)" name="tags" value={form.tags} onChange={handleChange} className="md:col-span-2" placeholder="Eventi aziendali, Transfer VIP, Matrimoni" />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-1">Descrizione</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-white rounded focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? "Salvataggio..." : isNew ? "Crea Auto" : "Salva Modifiche"}
          </button>
        </form>

        {!isNew && carId && (
          <div className="mt-12 border-t border-zinc-800 pt-8">
            <h2 className="text-xl font-serif mb-4">Foto</h2>

            <div className="mb-6">
              <label className="flex items-center justify-center gap-2 w-full p-8 border-2 border-dashed border-zinc-700 hover:border-primary cursor-pointer transition-colors bg-zinc-900/50 text-zinc-400 hover:text-primary">
                <Upload className="w-5 h-5" />
                <span className="text-sm">
                  {uploadingFiles || isUploading
                    ? "Caricamento in corso..."
                    : "Trascina o clicca per caricare foto"}
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploadingFiles || isUploading}
                />
              </label>
            </div>

            {images.length === 0 ? (
              <p className="text-zinc-500 text-sm">Nessuna foto caricata</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragEnd={handleDragEnd}
                    className={`relative group border-2 ${
                      img.isCover ? "border-primary" : "border-zinc-800"
                    } bg-zinc-900 overflow-hidden cursor-grab active:cursor-grabbing ${
                      dragIdx === idx ? "opacity-50" : ""
                    }`}
                  >
                    <div className="aspect-square">
                      <img
                        src={img.url}
                        alt={img.alt || ""}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {img.isCover && (
                      <div className="absolute top-1 left-1 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold uppercase">
                        Cover
                      </div>
                    )}

                    <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="w-5 h-5 text-white drop-shadow" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 justify-center">
                      {!img.isCover && (
                        <button
                          onClick={() => setCover(img.id)}
                          className="p-1.5 bg-primary/80 rounded hover:bg-primary transition-colors"
                          title="Imposta come cover"
                        >
                          <Star className="w-3 h-3 text-white" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteImage(img.id)}
                        className="p-1.5 bg-red-600/80 rounded hover:bg-red-600 transition-colors"
                        title="Elimina"
                      >
                        <Trash2 className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-1">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-white rounded focus:outline-none focus:border-primary"
      />
    </div>
  );
}
