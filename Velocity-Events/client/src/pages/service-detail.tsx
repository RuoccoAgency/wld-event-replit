import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { SERVIZI_DATA } from "@/data/servizi";
import { CheckCircle2, ChevronRight, Info, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ServiceDetail() {
  const [, params] = useRoute("/servizi/:slug");
  const slug = params?.slug;
  const data = slug ? SERVIZI_DATA[slug] : null;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Pagina non trovata</h1>
          <Link href="/">
            <Button variant="outline">Torna alla Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const scrollToContact = () => {
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 uppercase-none">
        {/* HERO SECTION */}
        <section className="relative py-32 bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
             {/* Using a generic high-end event image for the background */}
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000" 
              alt={data.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif mb-6 leading-tight"
            >
              {data.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-light mb-10 text-slate-300 max-w-2xl mx-auto"
            >
              {data.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest px-12 py-8 transition-transform hover:scale-105"
              >
                Richiedi informazioni
              </Button>
            </motion.div>
          </div>
        </section>

        {/* DESCRIPTION SECTION */}
        <section className="py-24 border-b border-slate-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 text-center md:text-left">
                   <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0 text-primary">
                    <Info size={24} />
                  </div>
                  <h2 className="text-3xl font-serif mb-6">Un evento unico, curato in ogni dettaglio</h2>
                  <p className="text-lg text-muted-foreground font-light leading-relaxed mb-6">
                    {data.description}
                  </p>
                  <p className="text-lg text-slate-800 font-medium leading-relaxed">
                    {data.presentation}
                  </p>
                </div>
                <div className="flex-1 w-full h-[400px] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=1000" 
                    alt="Event detail" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PACKAGES SECTION */}
        <section className="py-32 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Le Nostre Proposte</span>
              <h2 className="text-4xl font-serif mb-6">Scegli il tuo Livello di Eccellenza</h2>
              <div className="w-20 h-1 bg-primary/20 mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {/* BASE PACKAGE */}
              <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="h-full border-none shadow-sm rounded-none hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                  <div className="h-2 bg-slate-200" />
                  <CardHeader className="text-center pb-8 pt-12">
                    <h3 className="text-2xl font-serif mb-2">{data.packages.base.name}</h3>
                    <p className="text-sm text-muted-foreground font-light italic">{data.packages.base.description}</p>
                  </CardHeader>
                  <CardContent className="px-8 pb-12">
                    <ul className="space-y-4">
                      {data.packages.base.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="px-8 pb-12">
                    <Button 
                      onClick={scrollToContact}
                      variant="outline" 
                      className="w-full rounded-none border-slate-200 hover:border-primary hover:bg-primary/5 py-6 group"
                    >
                      Richiedi base <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* PREMIUM PACKAGE */}
              <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <Card className="h-full border-none shadow-xl rounded-none hover:shadow-2xl transition-all duration-500 overflow-hidden relative group">
                  <div className="h-2 bg-primary" />
                  <div className="absolute top-6 right-6">
                    <Star size={24} className="text-primary fill-primary/20" />
                  </div>
                  <CardHeader className="text-center pb-8 pt-12">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Il più scelto</span>
                    <h3 className="text-2xl font-serif mb-2">{data.packages.premium.name}</h3>
                    <p className="text-sm text-muted-foreground font-light italic">{data.packages.premium.description}</p>
                  </CardHeader>
                  <CardContent className="px-8 pb-12">
                    <ul className="space-y-4">
                      {data.packages.premium.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-800 font-medium">
                          <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="px-8 pb-12">
                    <Button 
                      onClick={scrollToContact}
                      className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 py-6 group shadow-lg shadow-primary/20"
                    >
                      Richiedi premium <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* EXCLUSIVE PACKAGE */}
              <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.4 }}>
                <Card className="h-full border-none shadow-sm rounded-none hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                  <div className="h-2 bg-slate-900" />
                  <CardHeader className="text-center pb-8 pt-12">
                    <h3 className="text-2xl font-serif mb-2">{data.packages.exclusive.name}</h3>
                    <p className="text-sm text-muted-foreground font-light italic">{data.packages.exclusive.description}</p>
                  </CardHeader>
                  <CardContent className="px-8 pb-12">
                    <ul className="space-y-4">
                      {data.packages.exclusive.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="px-8 pb-12">
                    <Button 
                      onClick={scrollToContact}
                      variant="outline" 
                      className="w-full rounded-none border-slate-200 hover:border-slate-900 hover:bg-slate-50 py-6 group"
                    >
                      Richiedi exclusive <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-32 bg-slate-950 text-white text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 max-w-3xl mx-auto leading-tight">
              Rendiamo il tuo evento {data.title} un capolavoro di eleganza
            </h2>
            <p className="text-lg text-slate-400 font-light mb-12 max-w-2xl mx-auto">
              Il nostro team è pronto a personalizzare ogni aspetto per soddisfare i tuoi desideri più esclusivi.
            </p>
            <Button 
              onClick={scrollToContact}
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest px-14 py-8 shadow-2xl transition-all hover:scale-105"
            >
              Contattaci per un Preventivo
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
