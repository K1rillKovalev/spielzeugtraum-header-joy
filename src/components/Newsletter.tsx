import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Bitte gib eine gültige E-Mail-Adresse ein.", variant: "destructive" });
      return;
    }
    toast({ title: "🎉 Willkommen!", description: "Du erhältst bald deine ersten Gutscheine per E-Mail." });
    setEmail("");
  };

  return (
    <section className="py-12 sm:py-16">
      <motion.div
        className="bg-gradient-to-br from-cta/90 to-cta rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-cta-foreground/10 rounded-full" />
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cta-foreground/10 rounded-full" />

        <Gift size={40} className="text-cta-foreground/80 mx-auto mb-4" />
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-cta-foreground mb-2">
          Gutscheine per E-Mail 🎁
        </h2>
        <p className="font-body text-cta-foreground/80 mb-6 max-w-md mx-auto">
          Melde dich an und erhalte exklusive Rabatte und Neuheiten direkt in dein Postfach!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto relative z-10">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Deine E-Mail-Adresse"
              className="w-full h-12 pl-11 pr-4 rounded-full bg-card text-card-foreground shadow-md border-2 border-transparent focus:border-cta-foreground/30 focus:outline-none font-body text-sm placeholder:text-muted-foreground"
              maxLength={255}
            />
          </div>
          <Button type="submit" variant="default" size="lg" className="font-display">
            Anmelden
          </Button>
        </form>
      </motion.div>
    </section>
  );
};

export default Newsletter;
