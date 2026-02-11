import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services"; // New Component
import { CarCollection } from "@/components/cars/CarCollection";
import { BookingForm } from "@/components/contact/BookingForm";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

const timelineContainer = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.18,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function WeddingTimeline() {
  const steps = [
    { time: "Arrivo Sposa", desc: "Ingresso trionfale in chiesa" },
    { time: "Shooting", desc: "Foto indimenticabili in location" },
    { time: "Ricevimento", desc: "Arrivo scenografico alla festa" },
  ];

  return (
    <section className="py-24 bg-secondary/30 border-t border-border/20 overflow-hidden">
      <motion.div
        className="container mx-auto px-6 text-center"
        variants={timelineContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-serif text-foreground mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Il Tuo Giorno Perfetto
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-0 relative">
          {/* Connecting Line (Desktop) */}
          <motion.div
            className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-border/30 to-transparent -z-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            style={{ transformOrigin: "center" }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={stepVariants}
              className="flex-1 max-w-xs relative group"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              {/* Punto luminoso */}
              <div className="relative mb-6 flex justify-center">
                <motion.div
                  className="w-4 h-4 bg-primary rounded-full shadow-[0_0_18px_rgba(140,191,175,0.6)]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* alone glow */}
                <div className="absolute w-9 h-9 rounded-full bg-primary/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <h3 className="text-lg md:text-xl font-serif text-foreground mb-2 tracking-wide">
                {step.time}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    if (window.location.hash === "#contact") {
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <CarCollection />
        <Services />
        <WeddingTimeline />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}
