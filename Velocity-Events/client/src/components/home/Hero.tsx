import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/luxury_white_wedding_car_hero.png";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src={heroBg} 
          alt="Auto Matrimonio Lusso" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.4
            }
          }
        }}
      >

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <h2 className="text-primary text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            The Art of Celebration
          </h2>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-8 leading-tight max-w-5xl mx-auto">
            Auto di Lusso per Matrimoni <br />
            <span className="italic font-light text-white/90">ed Eventi Indimenticabili</span>
          </h1>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
          }}
          className="max-w-2xl mx-auto mb-10"
        >
          <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
            Noleggio auto esclusive con servizio personalizzato per sposi ed eventi speciali. 
            Rendi unico il tuo arrivo con la nostra collezione di prestigio.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
          }}
          className="flex flex-col md:flex-row gap-6"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/collection" className="px-8 py-4 bg-primary text-primary-foreground uppercase tracking-widest text-xs font-bold hover:bg-primary/90 transition-colors duration-300 flex items-center gap-2 group justify-center shadow-lg w-full md:w-auto">
              Scopri la Collezione
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 border border-white/30 text-white uppercase tracking-widest text-xs font-bold hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm justify-center flex w-full md:w-auto"
            >
              Prenota per il tuo matrimonio
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
