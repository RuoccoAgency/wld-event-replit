import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/contact/BookingForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Star, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Music,
  GlassWater,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";


const fleet = [
  {
    name: "Hover Limousine",
    description: "Sperimenta l'eleganza moderna con la nostra Hover Limousine. Con i suoi interni raffinati e il design distintivo, è la scelta d'elezione per matrimoni, cerimonie di lusso e ingressi indimenticabili.",
    images: [
      "/images/limousine/hover-limo/hover-limo-1.jpg",
      "/images/limousine/hover-limo/hover-limo-2.jpg",
      "/images/limousine/hover-limo/hover-limo-3.jpg",
      "/images/limousine/hover-limo/hover-limo-4.jpg",
      "/images/limousine/hover-limo/hover-limo-5.jpg",
    ]
  },
  {
    name: "Hummer H2 Limousine",
    description: "Imponente, audace e iconica. La nostra Hummer H2 Limousine è il massimo dell'esclusività per feste indimenticabili, addii al celibato/nubilato e tour notturni di grande impatto.",
    images: [
      "/images/limousine/hummer-limo/hummer-limo-1.jpg",
      "/images/limousine/hummer-limo/hummer-limo-2.jpg",
      "/images/limousine/hummer-limo/hummer-limo-3.jpg",
      "/images/limousine/hummer-limo/hummer-limo-4.jpg",
      "/images/limousine/hummer-limo/hummer-limo-5.jpg",
      "/images/limousine/hummer-limo/hummer-limo-6.jpg",
      "/images/limousine/hummer-limo/hummer-limo-7.jpg",
    ]
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function LimousineRental() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeGallery, setActiveGallery] = useState<string[]>([]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  const openLightbox = (images: string[], index: number) => {
    setActiveGallery(images);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % activeGallery.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + activeGallery.length) % activeGallery.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="uppercase-none">
        {/* HERO SECTION */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/limousine/hover-limo/hover-limo-5.jpg" 
              alt="Limousine luxury" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10 text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif mb-6 tracking-tight"
            >
              Noleggio Limousine
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl font-light mb-10 max-w-3xl mx-auto text-white/90"
            >
              Viaggia con stile nelle Canarie, Madrid e Barcellona. Il massimo del lusso per i tuoi momenti speciali.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest px-10 py-7 text-sm shadow-2xl transition-all"
              >
                Prenota ora
              </Button>
            </motion.div>
          </div>
        </section>

        {/* INTRO SECTION */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Elegance on Wheels</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-10">Un'esperienza indimenticabile</h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-light mb-12">
                Il nostro servizio di noleggio limousine offre molto più di un semplice trasporto. 
                È un’immersione totale nel comfort e nel lusso, pensata per rendere unico ogni evento: 
                matrimoni, compleanni, serate di gala o importanti incontri d’affari. 
                Operiamo attraverso partner selezionati nelle Isole Canarie, Madrid e Barcellona.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {[
                  { icon: Sparkles, title: "Servizio VIP", desc: "Trattamento esclusivo e attenzione ai minimi dettagli." },
                  { icon: Music, title: "Sistemi Audio", desc: "Esperienza sonora premium a bordo di ogni veicolo." },
                  { icon: GlassWater, title: "Bar a Bordo", desc: "Selezione di bevande e snack per il tuo viaggio." }
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                      <item.icon size={22} />
                    </div>
                    <h4 className="font-serif text-lg">{item.title}</h4>
                    <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FLEET SECTION */}
        <section className="py-24 bg-slate-50" id="fleet-gallery">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-serif mb-4">La Nostra Flotta</h2>
            <p className="text-muted-foreground font-light max-w-2xl mx-auto italic mb-12">
              “Scegli il modello che meglio si adatta alla tua occasione.”
            </p>
            {fleet.map((vehicle, vIndex) => (
              <div key={vIndex} className={vIndex > 0 ? "mt-24" : ""}>
                <div className="mb-10 text-center md:text-left">
                  <h3 className="text-2xl font-serif mb-3 text-primary uppercase tracking-wider">{vehicle.name}</h3>
                  <p className="text-muted-foreground font-light max-w-3xl">{vehicle.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {vehicle.images.map((src, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative aspect-[4/3] overflow-hidden group cursor-pointer shadow-lg bg-white border border-slate-100"
                      onClick={() => openLightbox(vehicle.images, i)}
                    >
                      <img 
                        src={src} 
                        alt={`${vehicle.name} detail ${i + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                          <Sparkles size={20} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </section>


        {/* TRUST SECTION */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: ShieldCheck, title: "Qualità Garantita", desc: "Veicoli controllati e sanificati prima di ogni servizio." },
                { icon: Clock, title: "Puntualità", desc: "La precisione è il nostro marchio di fabbrica." },
                { icon: MapPin, title: "Copertura", desc: "Operiamo in tutte le zone delle Canarie, Madrid e Barcellona." },
                { icon: Star, title: "Professionalità", desc: "Conducenti esperti e multilingue a tua disposizione." }
              ].map((item, i) => (
                <div key={i} className="text-center p-6 hover:bg-slate-50 transition-colors rounded-sm">
                  <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <item.icon size={24} />
                  </div>
                  <h4 className="font-serif text-lg mb-4">{item.title}</h4>
                  <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 bg-slate-950 text-white text-center rounded-none overflow-hidden relative">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="/images/limousine/hover-limo/hover-limo-4.jpg" 
              className="w-full h-full object-cover" 
              alt="Background context"
            />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 max-w-2xl mx-auto">Pronto per un viaggio straordinario?</h2>
            <p className="text-lg text-slate-400 font-light mb-12 max-w-xl mx-auto">
              Contattaci oggi stesso per ricevere un preventivo personalizzato per il tuo noleggio limousine.
            </p>
            <Button 
              onClick={scrollToContact}
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest px-14 py-8 shadow-[0_0_30px_rgba(var(--primary),0.3)] transition-all hover:scale-105"
            >
              Contattaci Ora
            </Button>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
              onClick={() => setLightboxOpen(false)}
            >
              <X size={32} />
            </button>
            
            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={prevImage}
            >
              <ChevronLeft size={48} />
            </button>
            
            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={nextImage}
            >
              <ChevronRight size={48} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full aspect-video md:aspect-auto md:h-[80vh] flex items-center justify-center pointer-events-none"
            >
              <img 
                src={activeGallery[currentImageIndex]} 
                className="max-w-full max-h-full object-contain pointer-events-auto"
                alt="Limousine full view"
              />
            </motion.div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-light tracking-widest">
              {currentImageIndex + 1} / {activeGallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingForm />
      <Footer />
    </div>
  );
}
