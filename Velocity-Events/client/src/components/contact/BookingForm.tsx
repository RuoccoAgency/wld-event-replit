import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Il nome è obbligatorio" }),
  email: z.string().email({ message: "Email non valida" }),
  phone: z.string().min(9, { message: "Telefono richiesto" }),
  date: z.string().min(1, { message: "Data richiesta" }),
  eventType: z.string().min(1, { message: "Seleziona un tipo di evento" }),
  message: z.string().optional(),
});

export function BookingForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      eventType: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Richiesta Inviata",
      description: "Grazie! Ti contatteremo al più presto per confermare la disponibilità.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-32 bg-background border-t border-border/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">Contattaci</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Raccontaci il tuo evento, ti aiuteremo a scegliere l’auto perfetta per rendere il tuo giorno speciale davvero indimenticabile.
            </p>
            <div className="space-y-4 text-sm text-foreground/80 font-light">
              <p className="flex items-center gap-3"><span className="text-primary w-20 uppercase text-xs tracking-widest">Telefono</span> 081 1878 9724</p>
              <p className="flex items-center gap-3"><span className="text-primary w-20 uppercase text-xs tracking-widest">Email</span> info@luxuryweddingcars.it</p>
              <p className="flex items-center gap-3"><span className="text-primary w-20 uppercase text-xs tracking-widest">Indirizzo</span> Piazza J. Kennedy, 25 – 80019 Qualiano (NA)</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full max-w-xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Nome e Cognome</FormLabel>
                        <FormControl>
                          <Input placeholder="Mario Rossi" {...field} className="bg-transparent border-input text-foreground focus:border-primary rounded-none h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="mario@email.com" {...field} className="bg-transparent border-input text-foreground focus:border-primary rounded-none h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Telefono</FormLabel>
                          <FormControl>
                            <Input placeholder="+39 333 000 0000" {...field} className="bg-transparent border-input text-foreground focus:border-primary rounded-none h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Data Evento</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} className="bg-transparent border-input text-foreground focus:border-primary rounded-none h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="eventType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Tipo di Evento</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-transparent border-input text-foreground focus:border-primary rounded-none h-12">
                                <SelectValue placeholder="Seleziona..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-background border-border text-foreground">
                              <SelectItem value="wedding">Matrimonio</SelectItem>
                              <SelectItem value="corporate">Evento Aziendale</SelectItem>
                              <SelectItem value="party">Festa Privata / Anniversario</SelectItem>
                              <SelectItem value="photo">Shooting Fotografico</SelectItem>
                              <SelectItem value="other">Altro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Messaggio (Opzionale)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Vorrei maggiori informazioni sulla Rolls Royce..." {...field} className="bg-transparent border-input text-foreground focus:border-primary rounded-none min-h-[120px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full md:w-auto bg-primary text-white uppercase tracking-widest text-xs font-bold py-6 px-8 hover:bg-primary/90 rounded-none transition-colors">
                    Invia Richiesta
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
