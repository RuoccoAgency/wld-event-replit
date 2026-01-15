import { motion } from "framer-motion";
import { Heart, Star, Crown, UserCheck } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Servizio Sposi",
    description: "Attenzione ai minimi dettagli per rendere il tuo giorno perfetto, dal fiocco all'autista in divisa."
  },
  {
    icon: Crown,
    title: "Auto Impeccabili",
    description: "Una flotta di proprietà sempre sanificata e lucidata a specchio prima di ogni evento."
  },
  {
    icon: Star,
    title: "Esperienza Esclusiva",
    description: "Soluzioni su misura per anniversari, feste private e shooting fotografici di alto livello."
  },
  {
    icon: UserCheck,
    title: "Autista Professionale",
    description: "Conducenti esperti, eleganti e discreti per accompagnarvi con stile e sicurezza."
  }
];

export function About() {
  return (
    <section className="py-32 bg-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-foreground mb-6"
          >
            Perché Scegliere Noi
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground leading-relaxed font-light"
          >
            Non noleggiamo solo auto, creiamo esperienze. La nostra passione per l'eccellenza è al servizio dei vostri momenti più preziosi.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 border border-border/20 hover:border-primary/50 bg-white hover:bg-white shadow-sm hover:shadow-lg transition-all duration-500 text-center flex flex-col items-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-foreground mb-4">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
