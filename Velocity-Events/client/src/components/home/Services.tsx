import { motion } from "framer-motion";
import { Briefcase, Users, Utensils, GraduationCap, Church, Award, Mic2 } from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Eventi aziendali",
    description: "Trasporto di lusso per meeting, conferenze e cene di gala con autisti professionali."
  },
  {
    icon: Utensils,
    title: "Catering",
    description: "Supporto logistico di alto livello per servizi di catering esclusivi."
  },
  {
    icon: Mic2,
    title: "Coordinamento conferenze",
    description: "Gestione degli spostamenti per speaker e ospiti VIP durante i congressi."
  },
  {
    icon: Users,
    title: "Team Building",
    description: "Esperienze di guida e tour organizzati per rafforzare lo spirito di squadra."
  },
  {
    icon: Church,
    title: "Eventi religiosi",
    description: "Auto di prestigio per cerimonie, battesimi e celebrazioni solenni."
  },
  {
    icon: GraduationCap,
    title: "Eventi scolastici",
    description: "Arrivo in grande stile per balli di fine anno e cerimonie di laurea."
  },
  {
    icon: Award,
    title: "Eventi di Gala",
    description: "Red carpet ready. Le nostre auto sono perfette per le serate più esclusive."
  }
];

export function Services() {
  return (
    <section id="services" className="py-32 bg-background border-t border-border/20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-foreground mb-6"
          >
            I Nostri Servizi per Eventi
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground leading-relaxed font-light"
          >
            Offriamo soluzioni complete per ogni tipo di occasione, garantendo sempre la massima professionalità e un tocco di classe inconfondibile.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ 
                delay: index * 0.1,
                y: { type: "spring", stiffness: 300, damping: 20 },
                scale: { duration: 0.2 }
              }}
              className="group p-8 border border-border/20 hover:border-primary/30 bg-secondary hover:bg-secondary/80 transition-all duration-500 flex flex-col items-start text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <service.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-foreground mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
