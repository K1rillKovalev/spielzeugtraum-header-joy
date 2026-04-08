import { motion } from "framer-motion";
import { ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";

const badges = [
  { Icon: ShieldCheck, label: "Sichere Zahlung", desc: "SSL-verschlüsselt" },
  { Icon: Truck, label: "Kostenloser Versand", desc: "Ab 50€ Bestellwert" },
  { Icon: RotateCcw, label: "30 Tage Rückgabe", desc: "Ohne Wenn & Aber" },
  { Icon: CreditCard, label: "Zahlungsarten", desc: "PayPal, Klarna, Karte" },
];

const TrustBadges = () => {
  return (
    <section className="py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map(({ Icon, label, desc }, i) => (
          <motion.div
            key={label}
            className="flex flex-col items-center text-center p-4 rounded-2xl bg-card/60 border border-border/40"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
              <Icon size={22} className="text-foreground" />
            </div>
            <h4 className="font-display text-sm font-bold text-foreground">{label}</h4>
            <p className="font-body text-xs text-muted-foreground">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
