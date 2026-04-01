import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Users, 
  Fuel, 
  Zap, 
  Star, 
  Gauge, 
  Settings2, 
  Palette, 
  Armchair,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  MousePointer2
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { Car, CarImage } from "@/types/schema";
import useEmblaCarousel from 'embla-carousel-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type CarWithImages = Car & { 
  images: CarImage[];
  specifiche?: {
    motore: string;
    cavalli: string;
    accelerazione: string;
    velocitaMax: string;
    posti: string;
  };
};

const leadFormSchema = z.object({
  firstName: z.string().min(2, { message: "Il nome è obbligatorio" }),
  lastName: z.string().min(2, { message: "Il cognome è obbligatorio" }),
  email: z.string().email({ message: "Email non valida" }),
  phone: z.string().min(9, { message: "Telefono richiesto" }),
  vehicle: z.string(),
  message: z.string().optional(),
});

function formatPrice(car: CarWithImages) {
  if (car.priceText) return car.priceText;
  if (car.priceEur) return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(car.priceEur);
  return "";
}

export function CarDetailView({ car }: { car: CarWithImages }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { toast } = useToast();

  // Embla Carousel setup for the gallery
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start', 
    containScroll: 'trimSnaps',
    dragFree: true
  });
  
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const sortedImages = [...(car.images || [])].sort((a, b) => {
    if (a.isCover) return -1;
    if (b.isCover) return 1;
    return a.sortOrder - b.sortOrder;
  });

  const galleryImages = sortedImages.map((img) => img.url);

  // Form setup
  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      vehicle: car.title,
      message: "",
    },
  });

  function onFormSubmit(values: z.infer<typeof leadFormSchema>) {
    console.log(values);
    toast({
      title: "Richiesta Inviata",
      description: "Grazie! Ti contatteremo al più presto per confermare la disponibilità del veicolo.",
    });
    form.reset();
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const specs = [
    { icon: Gauge, label: "Velocità Max", value: car.specifiche?.velocitaMax || "N/D" },
    { icon: Zap, label: "Accelerazione", value: car.specifiche?.accelerazione || "N/D" },
    { icon: Fuel, label: "Motore", value: car.engine || car.specifiche?.motore || "N/D" },
    { icon: Settings2, label: "Erogazione", value: car.powerCv ? `${car.powerCv} CV` : (car.specifiche?.cavalli || "N/D") },
    { icon: Users, label: "Posti", value: car.seats ? `${car.seats} Posti` : (car.specifiche?.posti ? `${car.specifiche.posti} Posti` : "N/D") },
    { icon: Palette, label: "Colore", value: car.color || "Personalizzato" },
    { icon: Armchair, label: "Interni", value: "Pelle Premium / Carbon" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950 uppercase-none">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] md:h-[75vh] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src={galleryImages[0]} 
            alt={car.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent z-10" />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm mb-6">
                {car.brand} • Elite Selection
              </span>
              <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 leading-[1.1] tracking-tight">
                {car.title}
              </h1>
              <p className="text-xl md:text-2xl font-light text-white/80 mb-10 max-w-xl leading-relaxed">
                {car.description || "Un'opera d'arte in movimento che ridefinisce il concetto di performance e lusso estremo."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest px-10 py-8 text-sm group"
                >
                  Richiedi Informazioni <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('https://wa.me/3908118789724', '_blank')}
                  className="border-white/20 text-white hover:bg-white/10 uppercase tracking-widest px-10 py-8 text-sm font-bold backdrop-blur-md"
                >
                  <MessageCircle className="mr-2 text-green-400" /> WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 hidden lg:block z-20">
          <div className="flex items-center gap-4 text-white/40">
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Scroll to explore</span>
            <div className="w-10 h-[1px] bg-white/20" />
            <MousePointer2 size={16} />
          </div>
        </div>
      </section>

      {/* 2. VEHICLE DETAILS SECTION */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Performance & Style</span>
            <h2 className="text-4xl font-serif text-slate-900 mb-2">Dettagli Veicolo</h2>
            <div className="w-20 h-1 bg-primary/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
            {specs.map((spec, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <spec.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-bold">{spec.label}</p>
                  <p className="text-lg font-medium text-slate-900">{spec.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OVERVIEW / GALLERY SECTION */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Visual Overview</span>
              <h2 className="text-4xl font-serif text-slate-900">Galleria Esclusiva</h2>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={scrollPrev}
                className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-slate-900 hover:bg-primary hover:border-primary hover:text-white transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={scrollNext}
                className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-slate-900 hover:bg-primary hover:border-primary hover:text-white transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-0">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex gap-6">
              {galleryImages.map((src, idx) => (
                <div 
                  key={idx} 
                  className="embla__slide flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_40%] aspect-[16/10] relative group cursor-pointer overflow-hidden rounded-sm bg-slate-200"
                  onClick={() => openLightbox(idx)}
                >
                  <img 
                    src={src} 
                    alt={`${car.title} gallery ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                      <Star size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHATSAPP / CONTACT SECTION */}
      <section id="contact-form" className="py-32 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* WhatsApp Block */}
            <div className="lg:w-2/5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 bg-slate-950 text-white rounded-sm shadow-2xl relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8">
                    <MessageCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-3xl font-serif mb-6">Parla con noi su WhatsApp</h3>
                  <p className="text-slate-400 font-light mb-10 leading-relaxed">
                    Hai bisogno di una risposta immediata? Il nostro team Concierge è disponibile h24 per assisterti nella scelta e nella prenotazione.
                  </p>
                  
                  <ul className="space-y-4 mb-10 text-sm text-slate-300 font-light">
                    <li className="flex items-center gap-3"><ShieldCheck className="text-primary" size={16} /> Prenotazione immediata garantita</li>
                    <li className="flex items-center gap-3"><ShieldCheck className="text-primary" size={16} /> Supporto tecnico 24/7</li>
                    <li className="flex items-center gap-3"><ShieldCheck className="text-primary" size={16} /> Preventivi su misura via chat</li>
                  </ul>

                  <Button 
                    onClick={() => window.open('https://wa.me/3908118789724', '_blank')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold uppercase tracking-widest py-8 text-xs shadow-[0_0_30px_rgba(22,163,74,0.3)]"
                  >
                    Inizia Conversazione
                  </Button>
                </div>
                
                {/* Background detail */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              </motion.div>
            </div>

            {/* Form Block */}
            <div className="flex-1">
              <div className="mb-10">
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Request Availability</span>
                <h2 className="text-4xl font-serif text-slate-900 mb-4">Verifica la disponibilità ora</h2>
                <p className="text-slate-500 font-light">Compila il modulo per ricevere informazioni dettagliate e disponibilità per {car.title}.</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Es: Mario" {...field} className="rounded-none border-0 border-b border-slate-200 focus:border-primary focus:ring-0 bg-transparent px-0 py-4 h-auto text-lg transition-all" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Cognome</FormLabel>
                          <FormControl>
                            <Input placeholder="Es: Rossi" {...field} className="rounded-none border-0 border-b border-slate-200 focus:border-primary focus:ring-0 bg-transparent px-0 py-4 h-auto text-lg transition-all" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Email Aziendale o Personale</FormLabel>
                          <FormControl>
                            <Input placeholder="mario.rossi@email.com" {...field} className="rounded-none border-0 border-b border-slate-200 focus:border-primary focus:ring-0 bg-transparent px-0 py-4 h-auto text-lg transition-all" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Recapito Telefonico</FormLabel>
                          <FormControl>
                            <Input placeholder="+39 333 444 555" {...field} className="rounded-none border-0 border-b border-slate-200 focus:border-primary focus:ring-0 bg-transparent px-0 py-4 h-auto text-lg transition-all" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Messaggio / Note Speciali</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={`Vorrei richiedere un preventivo per il noleggio di ${car.title} per un matrimonio...`} 
                            {...field} 
                            className="rounded-none border-0 border-b border-slate-200 focus:border-primary focus:ring-0 bg-transparent px-0 py-4 min-h-[100px] text-lg transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest py-8 text-sm shadow-xl transition-all hover:scale-[1.01]"
                  >
                    Invia Richiesta
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox for Gallery */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
            >
              <X size={32} />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={galleryImages[lightboxIndex]}
              alt="Gallery Fullscreen"
              className="max-w-full max-h-[80vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
              }}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
              }}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
