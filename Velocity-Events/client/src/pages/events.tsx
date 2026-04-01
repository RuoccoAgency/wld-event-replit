import { useState, useCallback, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/contact/BookingForm";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages: { src: string; alt: string }[] = [
  { src: "/objects/uploads/01840d33-d5b0-4f3e-b34b-25431e656792", alt: "Atelier sposa - dettaglio abito rosa" },
  { src: "/objects/uploads/4ad68cbc-0a11-4ec3-a936-d6094a988f75", alt: "Atelier sposa - dettaglio" },
  { src: "/objects/uploads/1e960b87-c056-4739-a1bb-f34401095ae5", alt: "Atelier sposa - fronte" },
  { src: "/objects/uploads/bfdaa69b-069a-4d26-a2cb-2a346e391622", alt: "Spiaggia al tramonto" },
  { src: "/objects/uploads/03724a97-099c-4c08-9c24-e7fb0d0dc0e6", alt: "Cerimonia comunione" },
  { src: "/objects/uploads/be84c8f7-d902-42ca-b7cc-9a4f2cc9fcbf", alt: "Coppia di sposi" },
  { src: "/objects/uploads/c3acc467-b14a-477c-b022-92d428ac065d", alt: "Banchetto nuziale" },
  { src: "/objects/uploads/97ef0f21-f0a6-4498-bb94-d46e0e8957ab", alt: "Bouquet di fiori" },
  { src: "/objects/uploads/c976de5c-64f9-4f19-804b-4115fd1ce9ef", alt: "Cuore decorativo" },
  { src: "/objects/uploads/4dee3418-9e7e-41db-ba75-c3b63bb1bc64", alt: "Allestimento elegante" },
  { src: "/objects/uploads/71eec8c9-4fd7-4873-8c9e-26ac7aeba0cd", alt: "Decorazione evento" },
  { src: "/objects/uploads/817de56f-cae7-469b-8acb-96693e1f4049", alt: "Dettaglio matrimonio" },
  { src: "/objects/uploads/f8d7a6b1-53b3-45d6-b5c2-e89a72f424ed", alt: "Momento speciale" },
  { src: "/objects/uploads/84aaa28f-bd49-4216-9511-0f88d1b03dee", alt: "Dettaglio floreale" },
  { src: "/objects/uploads/8516bfdc-0766-4c6b-a634-f80f20ab177c", alt: "Atmosfera matrimonio" },
  { src: "/objects/uploads/832ca1e7-4846-401a-8744-f28d5c403a21", alt: "Cerimonia nuziale" },
  { src: "/objects/uploads/43214582-d995-4a90-9214-cb089589d590", alt: "Sposi al ricevimento" },
  { src: "/objects/uploads/e1e4624b-f6d1-4f41-a72a-d5e20ed4b771", alt: "Sposa elegante" },
  { src: "/objects/uploads/faef687c-3d50-4cf2-afda-c6805241a355", alt: "Mani degli sposi con fedi" },
  { src: "/objects/uploads/e4ee787f-404c-4850-9d9e-d589b6756d7b", alt: "Momento romantico" },
  { src: "/objects/uploads/44113bf1-1c66-444f-a329-a8e220be2276", alt: "Preparativi sposa" },
  { src: "/objects/uploads/09fbd4ea-1706-4816-8df9-a94f4e0a62d5", alt: "Dettaglio cerimonia" },
  { src: "/objects/uploads/dac6f91d-36c0-4e2f-b31a-7ead3b03dbb1", alt: "Scena matrimoniale" },
  { src: "/objects/uploads/2a33365d-ad52-4d02-8a35-d6f7301bb996", alt: "Allestimento ricevimento" },
  { src: "/objects/uploads/3d0f8f90-2c7a-44a1-87bd-3c1a9e7c7848", alt: "Decorazioni tavola" },
  { src: "/objects/uploads/7123d676-eb94-434e-9253-94f38b81c888", alt: "Atmosfera evento" },
  { src: "/objects/uploads/95e4e9cb-60e7-4a98-aca8-aeef17f61c48", alt: "Dettaglio evento lusso" },
  { src: "/objects/uploads/43f96efb-b71c-4e68-9a6d-f2d630f762f9", alt: "Momento celebrazione" },
  { src: "/objects/uploads/d98d4e88-68eb-4aaf-99ae-16ac529edba9", alt: "Scena romantica" },
  { src: "/objects/uploads/cc8d3bcb-a5b2-4d0f-bf8f-1e4b05173b42", alt: "Coppia elegante" },
  { src: "/objects/uploads/c0d91931-e9ee-4e5d-9c88-9767bddcb62f", alt: "Servizio fotografico" },
  { src: "/objects/uploads/3da31759-fc0f-4ef1-a3bc-74d0fe51ea6c", alt: "Dettaglio bouquet" },
  { src: "/objects/uploads/5cd95617-19e9-4d89-8246-518ff53c5b67", alt: "Location matrimonio" },
  { src: "/objects/uploads/e9a19adc-d7cd-4fdd-85bf-19fc5ec746d2", alt: "Momento intimo sposi" },
  { src: "/objects/uploads/43f811f5-f8a7-41e1-beef-a5bbf18c0375", alt: "Scena evento" },
  { src: "/objects/uploads/10948069-50ff-4f37-8d76-44f39bf60613", alt: "Arrivo sposi" },
  { src: "/objects/uploads/b80a2232-6ad5-4354-8bf3-25d3a9c89bde", alt: "Matrimonio elegante" },
];

export default function EventsPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightboxIndex((prev) =>
        prev === 0 ? galleryImages.length - 1 : prev - 1
      );
    },
    []
  );

  const nextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightboxIndex((prev) =>
        prev === galleryImages.length - 1 ? 0 : prev + 1
      );
    },
    []
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, prevImage, nextImage]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="relative h-[40vh] md:h-[50vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')] bg-cover bg-center" />
        <div className="relative z-20 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary text-xs uppercase tracking-[0.3em] mb-4"
          >
            Wedding Luxury Drive
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-serif text-white mb-6"
          >
            I Nostri Eventi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            Offriamo servizi di trasporto e accoglienza di lusso per matrimoni, eventi aziendali, cerimonie e transfer VIP.
            Ogni dettaglio è curato con precisione per garantire eleganza, puntualità e un impatto memorabile.
          </motion.p>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">
            I Nostri Momenti
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Galleria
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ogni evento racconta una storia unica. Scopri alcuni dei momenti speciali che abbiamo accompagnato con le nostre auto e il nostro servizio esclusivo.
          </p>
        </motion.div>

        {galleryImages.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="break-inside-avoid cursor-pointer group overflow-hidden rounded-2xl"
                onClick={() => openLightbox(idx)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Le foto saranno disponibili a breve.
            </p>
          </div>
        )}
      </section>

      <AnimatePresence>
        {lightboxOpen && galleryImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-7 h-7" />
            </button>

            <button
              onClick={(e) => prevImage(e)}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-all rounded-full z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => nextImage(e)}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-all rounded-full z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.img
              key={lightboxIndex}
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90vw] max-h-[85vh] object-contain select-none"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </main>
      <BookingForm />
      <Footer />
    </div>
  );
}
