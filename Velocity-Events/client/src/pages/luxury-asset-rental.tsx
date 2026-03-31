import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/contact/BookingForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Watch, 
  Plane, 
  Anchor, 
  Home, 
  ShoppingBag, 
  Gem, 
  Car,
  MapPin,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const categories = [
  {
    title: "Orologi di lusso",
    description: "Pezzi rari e collezioni esclusive dei marchi più prestigiosi al mondo.",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800",
    icon: Watch
  },
  {
    title: "Jet privati",
    description: "Viaggia con il massimo del comfort e della flessibilità, per i tuoi spostamenti veloci e privati.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800",
    icon: Plane
  },
  {
    title: "Yacht",
    description: "Scivola sulle onde a bordo di imbarcazioni magnifiche, dotate di ogni comfort immaginabile.",
    image: "/luxury_yacht_mediterranean_1774971768830.png",
    icon: Anchor
  },
  {
    title: "Ville e appartamenti di lusso",
    description: "Dimore da sogno nelle posizioni più esclusive, curate in ogni minimo dettaglio.",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800",
    icon: Home
  },
  {
    title: "Borse di lusso",
    description: "Accessori iconici e modelli da collezione, per completare il tuo stile con eleganza.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    icon: ShoppingBag
  },
  {
    title: "Gioielli",
    description: "Creazioni uniche e pietre preziose che catturano la luce e l'ammirazione in ogni occasione.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    icon: Gem
  },
  {
    title: "Auto di lusso",
    description: "Prestazioni mozzafiato e design leggendario per guidare il futuro dell'eleganza.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
    icon: Car
  }
];

const locations = [
  {
    name: "Canarie",
    description: "Il fascino dell'arcipelago incontra l'esclusività dei nostri partner locali per servizi nautici e ville mozzafiato."
  },
  {
    name: "Madrid",
    description: "Al centro della penisola, la nostra rete offre il meglio in termini di mobilità aerea privata e residenze d'elite."
  },
  {
    name: "Barcellona",
    description: "Lusso cosmopolita tra yacht club e boutique esclusive, gestito con eccellenza dai nostri partner in città."
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LuxuryAssetRental() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      
      <main className="overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1562190108-963df173fb73?auto=format&fit=crop&q=80&w=2000" 
              alt="Luxury background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10 text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif mb-6 tracking-tight"
            >
              Noleggio beni di lusso
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto text-white/90"
            >
              Esperienze esclusive disponibili tramite partner nelle Canarie, Madrid e Barcellona.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-white/70 font-light"
            >
              Sperimenta l'apice della raffinatezza e dell'esclusività. Offriamo ai nostri clienti l'accesso a un portfolio d'élite di beni di prestigio, per trasformare ogni momento in un'esperienza indimenticabile.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest px-10 py-7 text-sm shadow-2xl transition-all hover:scale-105"
              >
                Richiedi informazioni
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-[1px] h-20 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
          </motion.div>
        </section>

        {/* INTRO SECTION */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Esclusività Senza Confini</span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-10">L'eccellenza in ogni dettaglio</h2>
              <div className="h-1 w-20 bg-primary/20 mx-auto mb-10" />
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
                Il nostro servizio di noleggio beni di lusso è progettato per chi cerca l'eccellenza senza compromessi. 
                Che si tratti di un evento speciale, una trasferta d'affari o il desiderio di vivere un momento unico, 
                mettiamo a disposizione i asset più esclusivi del mercato.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-light italic">
                Il servizio è accessibile a tutti i nostri clienti, gestito con professionalità estrema attraverso una rete selezionata 
                di aziende partner strategicamente posizionate nelle Isole Canarie, a Madrid e a Barcellona.
              </p>
            </motion.div>
          </div>
        </section>

        {/* LUXURY CATEGORIES */}
        <section className="py-24 bg-[#f8f8f8]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">La Nostra Selezione</span>
                <h2 className="text-4xl md:text-5xl font-serif text-foreground">Categorie di Prestigio</h2>
              </div>
              <p className="text-muted-foreground max-w-sm text-sm font-light">
                Esplora la nostra collezione curata di asset di lusso, selezionati per soddisfare i gusti più esigenti.
              </p>
            </div>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {categories.map((cat, i) => (
                <motion.div key={i} variants={fadeIn}>
                  <Card className="group border-none overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 rounded-none h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={cat.image} 
                        alt={cat.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-full text-white">
                        <cat.icon size={20} />
                      </div>
                    </div>
                    <CardContent className="p-8 flex-grow flex flex-col">
                      <h3 className="text-xl font-serif mb-4 group-hover:text-primary transition-colors">{cat.title}</h3>
                      <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6 flex-grow">{cat.description}</p>
                      <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                        Scopri di più <ArrowRight size={12} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* LOCATION SECTION */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Operatività</span>
              <h2 className="text-4xl font-serif text-foreground">I Nostri Hub Esclusivi</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {locations.map((loc, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="text-center p-8 border border-border/10 hover:border-primary/20 transition-all rounded-sm"
                >
                  <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-2xl font-serif mb-4 tracking-wide">{loc.name}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {loc.description}
                  </p>
                  <p className="mt-4 text-[10px] text-primary font-bold uppercase tracking-widest">Sede Operativa Partner</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE MODEL SECTION */}
        <section className="py-24 bg-secondary/30 relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Come Funziona</span>
                  <h2 className="text-4xl font-serif text-foreground mb-8">Un modello di servizio impeccabile</h2>
                  <p className="text-muted-foreground text-lg mb-10 font-light leading-relaxed">
                    Abbiamo costruito una rete che garantisce affidabilità e qualità in ogni fase del noleggio.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      { 
                        title: "Accessibile a tutti", 
                        text: "Il servizio è disponibile per chiunque desideri elevare il proprio standard di vita o celebrare un successo in modo grandioso." 
                      },
                      { 
                        title: "Partner Radicati", 
                        text: "La logistica e la disponibilità effettiva sono garantite dai nostri partner radicati sul territorio, assicurando una conoscenza profonda delle località e degli asset." 
                      },
                      { 
                        title: "Qualità Garantita", 
                        text: "Tutti i beni rispettano rigorosi standard di qualità e manutenzione premium, per offrirvi sicurezza, affidabilità e bellezza senza tempo." 
                      }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="mt-1">
                          <CheckCircle2 className="text-primary" size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground mb-1 font-serif">{item.title}</h4>
                          <p className="text-sm text-muted-foreground font-light leading-snug">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:w-1/2 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1579445710183-f9a816f5da05?auto=format&fit=crop&q=80&w=1000" 
                    alt="Service quality" 
                    className="w-full rounded-none shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 -z-10" />
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary -z-10" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 bg-white text-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Pronto a vivere il lusso?</h2>
              <p className="text-lg text-muted-foreground font-light mb-10 leading-relaxed">
                Il nostro team è a tua disposizione per personalizzare ogni dettaglio della tua richiesta. 
                Scegli l'eccellenza, scegli il prestigio.
              </p>
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest px-12 py-8 text-sm group"
              >
                Contattaci <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <BookingForm />
      <Footer />
    </div>
  );
}
