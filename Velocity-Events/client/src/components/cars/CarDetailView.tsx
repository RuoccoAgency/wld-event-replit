import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Star, 
  Palette, 
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
    { icon: Palette, label: "Colore", value: car.color || "Personalizzato" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950 uppercase-none">
      {/* 1. PREMIUM SPLIT HERO - BRAND THEME */}
      <section className="relative h-auto lg:h-[calc(100vh-80px)] min-h-[560px] sm:min-h-[620px] lg:min-h-[700px] flex flex-col lg:flex-row items-center overflow-hidden bg-white">
        {/* Left Half: Dark Perspective (Brand-Infused Dark Green) */}
        <div className="w-full lg:w-3/5 h-[340px] sm:h-[400px] lg:h-full relative flex items-center justify-center p-5 sm:p-8 bg-[#050805]">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img 
              src={galleryImages[0]} 
              alt={car.title} 
              className="max-w-full max-h-[85%] object-contain drop-shadow-[0_20px_100px_rgba(140,191,175,0.15)] z-20"
            />
          </motion.div>
          {/* Brand-colored subtle focal point behind car */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-[#8CBFAF]/5 rounded-full blur-[150px] z-10" />
          
          {/* Visual Divider Text (Vertical label like premium car sites) */}
          <div className="absolute left-10 bottom-20 hidden lg:block overflow-hidden h-[100px]">
            <motion.span 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="[writing-mode:vertical-lr] text-[10px] font-bold uppercase tracking-[0.6em] text-[#8CBFAF]/30"
            >
              Exclusive Fleet
            </motion.span>
          </div>
        </div>

        {/* Right Half: Elegant Context (White) with Overlapping Card */}
        <div className="w-full lg:w-2/5 h-auto lg:h-full flex items-center justify-center lg:justify-start z-30 p-5 sm:p-6 lg:p-0 lg:-ml-32">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white p-6 sm:p-8 lg:p-16 border border-slate-100 shadow-[0_45px_100px_-20px_rgba(0,0,0,0.12)] relative max-w-xl w-full flex flex-col justify-center"
          >
            {/* THE SIGNATURE BORDER ACCENT (Offset frame matching reference) */}
            <div className="absolute -top-4 -left-4 w-1/3 h-[1px] bg-[#8CBFAF]" />
            <div className="absolute -top-4 -left-4 w-[1px] h-1/4 bg-[#8CBFAF]" />
            <div className="absolute -bottom-4 -right-4 w-1/3 h-[1px] bg-[#8CBFAF]" />
            <div className="absolute -bottom-4 -right-4 w-[1px] h-1/4 bg-[#8CBFAF]" />
            
            <div className="space-y-6 relative">
              {/* Category Highlight */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[#8CBFAF]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8CBFAF]">
                  {car.tags?.split(',')[0] || "LUXURY RENTAL"}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-sans font-black text-[#050805] leading-[1] uppercase tracking-[-0.04em] mb-2">
                <span className="block text-[#8CBFAF]/20 text-[0.4em] tracking-[0.2em] mb-2">{car.brand}</span>
                {car.model}
              </h1>
              
              <p className="text-[14px] text-slate-500 font-light leading-relaxed max-w-sm">
                {car.description || "Un'esperienza di guida senza precedenti che ridefinisce il concetto di performance e lusso estremo."}
              </p>
              
              
              <div className="pt-4 flex flex-wrap gap-4">
                <Button 
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-none bg-[#8CBFAF] hover:bg-[#5C8F80] text-white px-8 sm:px-10 py-6 sm:py-7 uppercase tracking-[0.2em] text-[10px] font-black transition-all shadow-lg hover:translate-y-[-2px] active:translate-y-0 w-full sm:w-auto justify-center"
                >
                  PRENOTA ORA
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => window.open('https://wa.me/3908118789724', '_blank')}
                  className="text-slate-400 hover:text-[#8CBFAF] uppercase tracking-[0.2em] text-[10px] font-bold w-full sm:w-auto justify-center"
                >
                  WhatsApp <ArrowRight className="ml-2 w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Signature Compact Navigation / Scroll Indicator */}
            <div 
              className="absolute -bottom-6 sm:-bottom-8 right-6 sm:right-8 bg-[#8CBFAF] w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-white cursor-pointer hover:bg-[#5C8F80] transition-all z-40 shadow-xl"
              onClick={() => document.getElementById('vehicle-details')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="rotate-90" size={20} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. VEHICLE DETAILS SECTION */}
      <section id="vehicle-details" className="py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6">
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
        <div className="container mx-auto px-4 sm:px-6 mb-12">
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

        <div className="px-4 sm:px-6 md:px-0">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex gap-6">
              {galleryImages.map((src, idx) => (
                <div 
                  key={idx} 
                  className="embla__slide flex-[0_0_95%] md:flex-[0_0_45%] lg:flex-[0_0_42%] aspect-[16/14] relative group cursor-pointer overflow-hidden rounded-sm bg-slate-200"
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
      <section id="contact-form" className="py-20 sm:py-24 lg:py-32 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* WhatsApp Block */}
            <div className="lg:w-2/5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-7 sm:p-10 bg-slate-950 text-white rounded-sm shadow-2xl relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8">
                    <MessageCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif mb-6">Parla con noi su WhatsApp</h3>
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
                <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-4">Verifica la disponibilità ora</h2>
                <p className="text-slate-500 font-light">Compila il modulo per ricevere informazioni dettagliate e disponibilità per {car.title}.</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Es: Mario" {...field} className="rounded-none border-0 border-b border-slate-200 focus:border-primary focus:ring-0 bg-transparent px-0 py-4 h-auto text-base sm:text-lg transition-all" />
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
                            <Input placeholder="Es: Rossi" {...field} className="rounded-none border-0 border-b border-slate-200 focus:border-primary focus:ring-0 bg-transparent px-0 py-4 h-auto text-base sm:text-lg transition-all" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Email Aziendale o Personale</FormLabel>
                          <FormControl>
                            <Input placeholder="mario.rossi@email.com" {...field} className="rounded-none border-0 border-b border-slate-200 focus:border-primary focus:ring-0 bg-transparent px-0 py-4 h-auto text-base sm:text-lg transition-all" />
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
                            <Input placeholder="+39 333 444 555" {...field} className="rounded-none border-0 border-b border-slate-200 focus:border-primary focus:ring-0 bg-transparent px-0 py-4 h-auto text-base sm:text-lg transition-all" />
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
                            className="rounded-none border-0 border-b border-slate-200 focus:border-primary focus:ring-0 bg-transparent px-0 py-4 min-h-[100px] text-base sm:text-lg transition-all"
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
