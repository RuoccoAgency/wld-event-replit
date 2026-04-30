import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/contact/BookingForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, 
  FileText, 
  UserPlus, 
  ShieldCheck, 
  ChevronRight,
  Upload,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

async function uploadFile(file: File): Promise<string | null> {
  try {
    const urlRes = await fetch("/api/uploads/request-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type }),
    });
    if (!urlRes.ok) return null;
    const { uploadURL, objectPath } = await urlRes.json();
    const putRes = await fetch(uploadURL, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });
    if (!putRes.ok) return null;
    return objectPath as string;
  } catch {
    return null;
  }
}

export default function BecomePartner() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomeAzienda: "", referente: "", email: "", telefono: "",
    citta: "", tipologiaServizi: "", descrizione: "",
  });
  const [files, setFiles] = useState<{ visura?: File; documento?: File; codice?: File }>({});

  const handleChange = (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleFileChange = (key: "visura" | "documento" | "codice") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setFiles((prev) => ({ ...prev, [key]: file }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const [visuraCameraleUrl, documentoIdentitaUrl, codiceFiscaleUrl] = await Promise.all([
        files.visura ? uploadFile(files.visura) : Promise.resolve(null),
        files.documento ? uploadFile(files.documento) : Promise.resolve(null),
        files.codice ? uploadFile(files.codice) : Promise.resolve(null),
      ]);
      const res = await fetch("/api/partner-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          visuraCameraleUrl,
          documentoIdentitaUrl,
          codiceFiscaleUrl,
        }),
      });
      if (!res.ok) throw new Error();
      toast({
        title: "Candidatura inviata",
        description: "Grazie per la tua richiesta. Il nostro team ti contatterà al più presto.",
      });
      setFormData({ nomeAzienda: "", referente: "", email: "", telefono: "", citta: "", tipologiaServizi: "", descrizione: "" });
      setFiles({});
    } catch {
      toast({
        title: "Errore",
        description: "Impossibile inviare la candidatura. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const form = document.getElementById("application-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="uppercase-none">
        {/* HERO SECTION */}
        <section className="relative py-16 sm:py-20 md:py-32 bg-slate-950 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
              alt="Professional building" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-20">
            <div className="max-w-3xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-primary font-bold tracking-[0.3em] text-xs mb-6 block uppercase"
              >
                Partnership Professionale
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1]"
              >
                Diventa nostro partner
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-xl md:text-2xl font-light mb-10 text-slate-300"
              >
                Entra nella nostra rete e offri i tuoi servizi di noleggio beni di lusso a una clientela d'élite.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button 
                  onClick={scrollToForm}
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest px-10 py-7 transition-all"
                >
                  Candidati ora
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* INTRO SECTION */}
        <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h2 className="text-3xl md:text-4xl font-serif mb-8">Unisciti all'eccellenza</h2>
                <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
                  <p>
                    La nostra piattaforma mette in contatto clienti esigenti con i migliori fornitori di servizi e beni di lusso. 
                    Cerchiamo partner che condividano la nostra visione di eccellenza, affidabilità e servizio su misura.
                  </p>
                  <p>
                    Come partner, otterrai maggiore visibilità e accesso diretto a un target di clienti qualificati, 
                    supportati dalla nostra infrastruttura di marketing e gestione.
                  </p>
                  <p className="font-medium text-foreground">
                    Accettiamo solo aziende verificate che rispettano i nostri rigidi standard di qualità.
                  </p>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: UserPlus, title: "Nuovi Clienti", desc: "Accesso a richieste qualificate" },
                  { icon: ShieldCheck, title: "Affidabilità", desc: "Brand posizionato nel lusso" },
                  { icon: Building2, title: "Networking", desc: "Collabora con i migliori" },
                  { icon: FileText, title: "Supporto", desc: "Assistenza dedicata partner" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 bg-slate-50 border border-slate-100 rounded-sm hover:border-primary/20 transition-all group"
                  >
                    <item.icon className="text-primary mb-4 group-hover:scale-110 transition-transform" size={24} />
                    <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* REQUIREMENTS SECTION */}
        <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-[0.3em] text-[10px] mb-4 block uppercase">Criteri di Accesso</span>
              <h2 className="text-3xl font-serif">Requisiti per la Candidatura</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                "Ragione sociale",
                "Visura camerale",
                "Documento d’identità",
                "Codice fiscale / P. IVA"
              ].map((req, i) => (
                <div key={i} className="bg-white p-6 shadow-sm border-t-2 border-primary/20 flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center mb-4 text-primary">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="font-serif text-sm font-medium">{req}</span>
                </div>
              ))}
            </div>
            
            <p className="mt-12 text-center text-muted-foreground font-light italic text-sm">
              “Tutti i documenti indicati sono necessari per verificare la tua attività e garantire gli standard di qualità della rete.”
            </p>
          </div>
        </section>

        {/* APPLICATION FORM */}
        <section id="application-form" className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="bg-white border border-slate-100 shadow-2xl p-8 md:p-12">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-serif mb-4">Modulo di Candidatura</h2>
                <p className="text-muted-foreground font-light">Compila i campi sottostanti con le informazioni della tua azienda.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Nome Azienda</label>
                    <Input value={formData.nomeAzienda} onChange={handleChange("nomeAzienda")} placeholder="Es: Luxury Rentals SRL" required className="rounded-none border-slate-200 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Nome e Cognome Referente</label>
                    <Input value={formData.referente} onChange={handleChange("referente")} placeholder="Luigi Rossi" required className="rounded-none border-slate-200 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Aziendale</label>
                    <Input type="email" value={formData.email} onChange={handleChange("email")} placeholder="info@azienda.it" required className="rounded-none border-slate-200 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Numero di Telefono</label>
                    <Input type="tel" value={formData.telefono} onChange={handleChange("telefono")} placeholder="+39 ..." required className="rounded-none border-slate-200 focus-visible:ring-primary" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Città / Sede Operativa</label>
                  <Input value={formData.citta} onChange={handleChange("citta")} placeholder="Es: Madrid, Spagna" required className="rounded-none border-slate-200 focus-visible:ring-primary" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Tipologia di Servizi Offerti</label>
                  <Input value={formData.tipologiaServizi} onChange={handleChange("tipologiaServizi")} placeholder="Es: Noleggio Jet Privati e Yacht" required className="rounded-none border-slate-200 focus-visible:ring-primary" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Descrizione Attività</label>
                  <Textarea value={formData.descrizione} onChange={handleChange("descrizione")} placeholder="Descrivi brevemente la tua esperienza e la flotta/asset a disposizione..." className="rounded-none border-slate-200 focus-visible:ring-primary min-h-[120px]" />
                </div>
                
                {/* UPLOAD FIELDS */}
                <div className="space-y-6 pt-6 border-t border-slate-100">
                  <h3 className="font-serif text-lg">Caricamento Documenti (Richiesto)</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {([
                      { label: "Visura Camerale",      key: "visura"    },
                      { label: "Documento d’Identità", key: "documento" },
                      { label: "Codice Fiscale",       key: "codice"    },
                    ] as const).map(({ label, key }) => (
                      <div key={key} className="relative group">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">{label}</label>
                        <div className="border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center cursor-pointer group-hover:border-primary/50 transition-colors">
                          <Upload size={16} className="text-slate-300 group-hover:text-primary mb-2" />
                          <span className="text-[10px] text-slate-400 group-hover:text-slate-600">
                            {files[key] ? files[key]!.name : "Carica file"}
                          </span>
                          <input type="file" onChange={handleFileChange(key)} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-8">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest py-7 sm:py-8 text-sm group"
                  >
                    {isSubmitting ? "Invio in corso..." : "Invia candidatura"} 
                    {!isSubmitting && <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
            <ShieldCheck className="text-primary mx-auto mb-8" size={48} />
            <h2 className="text-3xl font-serif mb-6">Qualità e Trasparenza Garantite</h2>
            <div className="space-y-4 text-muted-foreground font-light text-lg">
              <p>
                Ogni richiesta di partnership viene esaminata attentamente dal nostro team di esperti. 
                Valutiamo la storicità dell'azienda, la qualità dei beni offerti e il livello di servizio al cliente.
              </p>
              <p>
                Il nostro obiettivo è mantenere una rete premium dove l'eccellenza è garantita per ogni singolo asset noleggiato. 
                Riceverai una risposta dal nostro team entro 48-72 ore lavorative.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 sm:py-20 lg:py-32 bg-slate-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 max-w-2xl mx-auto leading-tight">
              Unisciti a una rete di servizi di alto livello
            </h2>
            <Button 
              onClick={scrollToForm}
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest px-12 py-7 sm:py-8 transition-all hover:scale-105"
            >
              Invia la tua candidatura
            </Button>
          </div>
        </section>
      </main>
      
      <BookingForm />
      <Footer />
    </div>
  );
}
