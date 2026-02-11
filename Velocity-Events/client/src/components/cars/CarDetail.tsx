import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2, CarFront, Users, Fuel, Calendar, Zap, Star } from "lucide-react";
import { Link } from "wouter";
import { Car } from "@/data/cars";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CarDetailProps {
  car: Car;
}

export function CarDetail({ car }: CarDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Usa l'array immagini, altrimenti fallback a images360
  const galleryImages = car.immagini && car.immagini.length > 0 ? car.immagini : car.images360;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden pt-20">
      {/* Back Button */}
      <div className="container mx-auto px-6 py-6">
        <Link href="/collection" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Torna alla Collezione
        </Link>
      </div>

      <div className="container mx-auto px-6 pb-20 flex flex-col lg:flex-row gap-12">
        {/* Left: Gallery System */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1"
        >
          {/* Main Image Display with Parallax Feel */}
          <div 
            className="relative w-full aspect-[16/10] bg-muted overflow-hidden rounded-sm group cursor-zoom-in mb-4 border border-border/20 shadow-2xl" 
            onClick={openLightbox}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={galleryImages[currentImageIndex]}
                alt={`${car.name} - Vista ${currentImageIndex + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Overlay Hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
               <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
            </div>

            {/* Navigation Arrows (On Image) */}
            <button 
              onClick={prevImage} 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all rounded-full opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all rounded-full opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnails Strip */}
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={cn(
                  "relative w-24 h-16 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-300 transform hover:scale-105",
                  idx === currentImageIndex ? "border-primary opacity-100 shadow-lg scale-105" : "border-transparent opacity-50 hover:opacity-80"
                )}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right: Info Panel (VERSIONE ORIGINALE) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:w-[400px] xl:w-[500px] flex flex-col z-20"
        >
          <div className="mb-8 border-b border-border/20 pb-8">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-primary text-sm uppercase tracking-widest mb-2"
            >
              {car.brand}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl font-serif text-foreground mb-4"
            >
              {car.name}
            </motion.h1>
            <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6 }}
               className="text-2xl font-light text-muted-foreground"
            >
              {car.price}
            </motion.p>
          </div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.7 }}
             className="grid grid-cols-2 gap-x-6 gap-y-6 mb-8"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest">Posti</span>
              </div>
              <p className="text-base font-medium">{car.seats}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest">Motore</span>
              </div>
              <p className="text-base font-medium">{car.engine}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CarFront className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest">Colore</span>
              </div>
              <p className="text-base font-medium">{car.color}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest">Anno</span>
              </div>
              <p className="text-base font-medium">{car.year}</p>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.75 }}
             className="mb-8"
          >
             <h4 className="text-xs uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
               <Star className="w-3 h-3" /> Ideale Per
             </h4>
             <ul className="flex flex-wrap gap-2">
               {car.idealFor.map((item, i) => (
                 <li key={i} className="text-xs bg-secondary px-4 py-2 rounded-sm text-foreground/80 border border-border/20">
                   {item}
                 </li>
               ))}
             </ul>
          </motion.div>

          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8 }}
             className="text-muted-foreground leading-relaxed mb-10 font-light text-sm italic border-l-2 border-primary/30 pl-4"
          >
            "{car.description}"
          </motion.p>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.9 }}
             className="flex flex-col gap-4 mt-auto"
          >
            <a href="/#contact" className="w-full">
               <button className="w-full py-5 bg-primary text-primary-foreground uppercase tracking-widest text-xs font-bold hover:bg-primary/90 transition-colors">
                 Richiedi Disponibilità
               </button>
            </a>
            <button className="w-full py-5 border border-border/50 text-foreground uppercase tracking-widest text-xs font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Parla con noi su WhatsApp
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2 flex items-center gap-2 group"
            >
              <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Chiudi</span>
              <X className="w-8 h-8" />
            </button>

            {/* Main Image */}
            <motion.img
              key={currentImageIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={galleryImages[currentImageIndex]}
              alt="Gallery Fullscreen"
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Controls */}
            <button 
              onClick={prevImage} 
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/5 hover:bg-primary text-white hover:text-black rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10 group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/5 hover:bg-primary text-white hover:text-black rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10 group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
