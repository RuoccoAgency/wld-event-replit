import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/contact/BookingForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

type LuxuryCategoryData = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
};

type FeaturedCard = {
  title: string;
  description: string;
  image: string;
};

const CATEGORY_DATA: Record<string, LuxuryCategoryData> = {
  "orologi-di-lusso": {
    title: "Orologi di lusso",
    subtitle: "Pezzi iconici e collezioni rare per chi vive il tempo come simbolo di prestigio.",
    description:
      "Collaboriamo con partner selezionati per offrire modelli d'alta gamma in condizioni impeccabili, con consulenza riservata e massima attenzione all'autenticita.",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1400",
    highlights: ["Modelli da collezione", "Assistenza dedicata", "Disponibilita su richiesta"],
  },
  "jet-privati": {
    title: "Jet privati",
    subtitle: "Trasferimenti esclusivi con standard premium e massima discrezione operativa.",
    description:
      "Il servizio include pianificazione itinerari, coordinamento aeroportuale e supporto concierge per offrirti un'esperienza di viaggio fluida e personalizzata.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=1400",
    highlights: ["Rotte personalizzate", "Assistenza h24", "Comfort executive"],
  },
  yacht: {
    title: "Yacht",
    subtitle: "Navigazione privata tra eleganza, comfort assoluto e servizi su misura.",
    description:
      "Proponiamo imbarcazioni selezionate per eventi, vacanze e occasioni speciali, con equipaggi professionali e gestione completa di ogni dettaglio.",
    image: "/images/yacht.png",
    highlights: ["Flotta premium", "Crew qualificata", "Esperienze tailor-made"],
  },
  "ville-e-appartamenti-di-lusso": {
    title: "Ville e appartamenti di lusso",
    subtitle: "Residenze esclusive in destinazioni di prestigio per soggiorni impeccabili.",
    description:
      "Ogni proprieta viene verificata per posizione, design e servizi, cosi da garantire privacy, sicurezza e un'accoglienza all'altezza delle tue aspettative.",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1400",
    highlights: ["Location esclusive", "Privacy totale", "Hospitality dedicata"],
  },
  "borse-di-lusso": {
    title: "Borse di lusso",
    subtitle: "Accessori iconici per completare il tuo stile con eleganza distintiva.",
    description:
      "Mettiamo a disposizione borse di maison internazionali, accuratamente selezionate per autenticita, stato e valore estetico.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1400",
    highlights: ["Maison internazionali", "Selezione curata", "Consulenza di stile"],
  },
  gioielli: {
    title: "Gioielli",
    subtitle: "Creazioni preziose che valorizzano ogni occasione importante.",
    description:
      "Disponiamo di una selezione raffinata di gioielli contemporanei e classici, ideali per eventi esclusivi, celebrazioni e shooting d'immagine.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1400",
    highlights: ["Pietre pregiate", "Design iconici", "Servizio riservato"],
  },
};

const FEATURED_CARDS: Partial<Record<string, FeaturedCard[]>> = {
  "orologi-di-lusso": [
    {
      title: "Rolex Daytona Ref.16520 Tiffany & Co.",
      image: "/images/rolex-daytona-tiffany.png",
      description:
        "Il Rolex Daytona Ref.16520 Tiffany e Co. è una versione rarissima del celebre “Zenith Daytona”, prodotta tra la fine degli anni ’80 e ’90. Si distingue per il quadrante doppia firma, dove oltre al logo Rolex compare anche “Tiffany e Co.”, rivenditore ufficiale per un breve periodo. Questi esemplari furono realizzati in quantità estremamente limitate, rendendoli oggi altamente ricercati dai collezionisti più esperti. Questo modello presenta anche il quadrante “Floating” ulteriore dettaglio che rende questo orologio ancor più raro e ricercato.",
    },
    {
      title: "Rolex Daytona (quadrante verde e oro)",
      image: "/images/rolex-daytona-green.png",
      description:
        "Rolex Daytona. Questo modello presenta un quadrante verde vivo e dorato con contatori colorati mediante spruzzatura, indici delle ore in applique e lancette in oro 18 ct con visualizzazione Chromalight, una sostanza luminescente ad alta leggibilità. Il quadrante consente al pilota di pianificare accuratamente i tempi del percorso e la tattica di guida.",
    },
    {
      title: "Rolex Submariner Date",
      image: "/images/rolex-submariner-date.png",
      description:
        "La visualizzazione luminescente Chromalight sul quadrante è un’innovazione che garantisce una visibilità maggiore in ambienti con scarsa luminosità, un aspetto essenziale per i subacquei. Le forme semplici degli indici – triangoli, tondi e rettangoli – e le ampie lancette delle ore e dei minuti assicurano una lettura istantanea e affidabile, per evitare qualsiasi rischio di confusione sott’acqua.",
    },
  ],
};

export default function LuxuryCategoryDetail() {
  const [, params] = useRoute("/luxury-rental/:slug");
  const slug = params?.slug;
  const category = slug ? CATEGORY_DATA[slug] : null;
  const featuredCards = slug ? FEATURED_CARDS[slug] : undefined;

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Categoria non trovata</h1>
          <Link href="/luxury-rental">
            <Button variant="outline">Torna alle categorie</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] overflow-x-hidden w-full">
      <Navbar />

      <main className="w-full">
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden w-full">
          <div className="absolute inset-0 z-0">
            <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif mb-6 tracking-tight"
            >
              {category.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-white/90"
            >
              {category.subtitle}
            </motion.p>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <Link
              href="/luxury-rental"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft size={14} /> Torna alle categorie
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <Card className="border-none shadow-sm rounded-none">
                <CardContent className="p-10">
                  <h2 className="text-3xl font-serif mb-6">Perche scegliere questo servizio</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">{category.description}</p>
                  <div className="space-y-4">
                    {category.highlights.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="bg-secondary/30 p-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif mb-4">Richiedi una proposta personalizzata</h3>
                  <p className="text-muted-foreground mb-8">
                    Condividi con noi destinazione, date e preferenze: prepareremo una proposta su misura con i partner piu
                    adatti alle tue esigenze.
                  </p>
                </div>
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest py-6"
                >
                  Richiedi informazioni <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {featuredCards?.length ? (
          <section className="py-16 sm:py-20 bg-[#fafafa]">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-2xl mb-10">
                <h2 className="text-3xl md:text-4xl font-serif mb-3">In evidenza</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Una selezione di pezzi particolarmente rari e ricercati, scelti per chi desidera il massimo in termini di
                  prestigio e collezionismo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {featuredCards.map((item) => (
                  <Card key={item.title} className="border-none shadow-sm rounded-none overflow-hidden bg-white">
                    <div className="relative h-72 md:h-96 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                    <CardContent className="p-10">
                      <h3 className="text-2xl font-serif mb-5">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <BookingForm />
      <Footer />
    </div>
  );
}
