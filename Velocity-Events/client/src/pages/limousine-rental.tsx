import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
  GlassWater
} from "lucide-react";

const limousineModels = [
  {
    name: "Classic Lincoln Town Car",
    description: "L'eleganza intramontabile per matrimoni ed eventi di classe. Interni in pelle e comfort assoluto.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    capacity: "8 persone"
  },
  {
    name: "Hummer H2 Stretch",
    description: "Imponente e audace. Ideale per addii al celibato/nubilato e feste indimenticabili.",
    image: "https://images.unsplash.com/photo-1517672651691-24622a91b52e?auto=format&fit=crop&q=80&w=800",
    capacity: "12-16 persone"
  },
  {
    name: "Limousine Party Bus",
    description: "Un vero club su ruote. Sistema audio premium, luci LED e spazio per ballare.",
    image: "https://images.unsplash.com/photo-1562920618-97427878696d?auto=format&fit=crop&q=80&w=800",
    capacity: "20+ persone"
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function LimousineRental() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="uppercase-none">
        {/* HERO SECTION */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000" 
              alt="Limousine luxury" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
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
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif mb-4">La Nostra Flotta</h2>
              <p className="text-muted-foreground font-light max-w-2xl mx-auto italic">
                “Scegli il modello che meglio si adatta alla tua occasione.”
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {limousineModels.map((limo, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Card className="rounded-none border-none overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={limo.image} 
                        alt={limo.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 px-4 shadow text-[10px] font-bold uppercase tracking-widest text-foreground">
                        Fino a {limo.capacity}
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <h3 className="text-xl font-serif mb-4 group-hover:text-primary transition-colors">{limo.name}</h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 h-12">
                        {limo.description}
                      </p>
                      <Button variant="outline" className="w-full rounded-none border-primary/20 hover:border-primary hover:bg-primary/5 group/btn">
                        Dettagli Flotta <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000" 
              className="w-full h-full object-cover grayscale" 
              alt="Background texture"
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
      
      <Footer />
    </div>
  );
}
