import { motion } from "framer-motion";
import { ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";

const badges = [
  { Icon: ShieldCheck, label: "Secure Payment", desc: "SSL encrypted" },
  { Icon: Truck, label: "Free Shipping", desc: "On orders over €50" },
  { Icon: RotateCcw, label: "30-Day Returns", desc: "No questions asked" },
  { Icon: CreditCard, label: "Payment Methods", desc: "PayPal, Klarna, Card" },
];

const TrustBadges = () => {
  return (
    <section className="py-10">
      <motion.h2
        className="font-display text-3xl sm:text-4xl font-extrabold text-primary text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        We care about your happiness...
      </motion.h2>
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
