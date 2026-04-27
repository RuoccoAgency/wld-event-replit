import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/contact/BookingForm";
import { motion } from "framer-motion";
import { Heart, Star, Crown, UserCheck, Award, Clock, Shield, Gem } from "lucide-react";

const values = [
  {
    icon: Crown,
    title: "Eccellenza",
    description: "Ogni veicolo della nostra flotta è selezionato con cura per garantire il massimo livello di lusso, comfort e prestigio.",
  },
  {
    icon: Heart,
    title: "Passione",
    description: "Il nostro amore per le auto di lusso e per i momenti speciali ci guida in ogni servizio che offriamo.",
  },
  {
    icon: Shield,
    title: "Affidabilità",
    description: "Puntualità, discrezione e professionalità sono i pilastri su cui costruiamo la fiducia dei nostri clienti.",
  },
  {
    icon: Gem,
    title: "Esclusività",
    description: "Offriamo un'esperienza unica e personalizzata, perché ogni evento merita un trattamento su misura.",
  },
];

const stats = [
  { number: "500+", label: "Eventi Realizzati" },
  { number: "15+", label: "Anni di Esperienza" },
  { number: "100%", label: "Clienti Soddisfatti" },
  { number: "20+", label: "Auto di Lusso" },
];

const reasons = [
  {
    icon: Award,
    title: "Flotta di Proprietà",
    description: "Tutte le nostre auto sono di proprietà, garantendo manutenzione impeccabile e disponibilità immediata.",
  },
  {
    icon: UserCheck,
    title: "Autisti Professionisti",
    description: "I nostri autisti sono selezionati per eleganza, discrezione e conoscenza del territorio.",
  },
  {
    icon: Clock,
    title: "Puntualità Garantita",
    description: "Arriviamo sempre in anticipo, perché sappiamo quanto è importante ogni minuto del vostro giorno speciale.",
  },
  {
    icon: Star,
    title: "Servizio Personalizzato",
    description: "Ogni dettaglio viene concordato in anticipo: decorazioni floreali, percorso, bevande a bordo e molto altro.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="relative h-[40vh] md:h-[50vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80')] bg-cover bg-center" />
        <div className="relative z-20 text-center px-4 sm:px-6">
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
            Chi Siamo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/60 max-w-2xl mx-auto text-base sm:text-lg"
          >
            Passione, eleganza e dedizione al servizio dei vostri momenti più importanti.
          </motion.p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">La Nostra Storia</p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              Un Viaggio Iniziato con la Passione
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Wedding Luxury Drive nasce dalla passione per le auto di lusso e dall'amore per i momenti speciali. 
                Da oltre 15 anni, accompagniamo sposi, famiglie e professionisti nei loro eventi più importanti, 
                offrendo un servizio di noleggio auto con conducente che va oltre il semplice trasporto.
              </p>
              <p>
                La nostra sede si trova a Qualiano, nel cuore della Campania, ma operiamo su tutto il territorio 
                nazionale. Ogni evento per noi è unico: curiamo ogni dettaglio, dalla scelta del veicolo perfetto 
                alla decorazione personalizzata, per creare un'esperienza indimenticabile.
              </p>
              <p>
                La nostra flotta, interamente di proprietà, comprende le auto più prestigiose al mondo: 
                da eleganti berline a sportive mozzafiato, ogni veicolo viene preparato con cura maniacale 
                per garantire il massimo del comfort e dello stile.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80"
                alt="Auto di lusso"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
              <p className="text-3xl font-serif font-bold">15+</p>
              <p className="text-xs uppercase tracking-widest mt-1">Anni di Esperienza</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-secondary/30 border-y border-border/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-serif text-primary font-bold mb-2">{stat.number}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">I Nostri Valori</p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Cosa Ci Guida
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ogni servizio che offriamo è guidato da valori che ci contraddistinguono e che i nostri clienti riconoscono.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 border border-border/20 hover:border-primary/50 bg-white hover:bg-white shadow-sm hover:shadow-lg transition-all duration-500 text-center flex flex-col items-center rounded-xl"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                <value.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif text-foreground mb-4">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">Perché Noi</p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Perché Scegliere Wedding Luxury Drive
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Non siamo solo un servizio di noleggio. Siamo il partner che rende ogni vostro evento indimenticabile.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-5 p-6 bg-white rounded-xl border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-md"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <reason.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-serif text-foreground mb-2">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">La Nostra Missione</p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">
            Trasformiamo Ogni Viaggio in un Ricordo
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-10">
            La nostra missione è semplice: rendere ogni vostro spostamento un momento di puro lusso. 
            Che si tratti di un matrimonio, un evento aziendale o un'occasione speciale, ci impegniamo 
            a superare le vostre aspettative con veicoli straordinari e un servizio impeccabile.
          </p>
          <a
            href="/#contact"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(140,191,175,0.3)] hover:shadow-[0_0_30px_rgba(140,191,175,0.5)] rounded-lg"
          >
            Contattaci Oggi
          </a>
        </motion.div>
      </section>

      </main>
      <BookingForm />
      <Footer />
    </div>
  );
}
