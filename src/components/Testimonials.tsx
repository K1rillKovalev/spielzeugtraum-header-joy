import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Anna M.", text: "Schnelle Lieferung! Meine Tochter war begeistert vom Kuschelbär. Werde definitiv wieder bestellen.", rating: 5 },
  { name: "Markus T.", text: "Tolle Qualität bei den Holzspielzeugen. Alles sicher verpackt und pünktlich geliefert.", rating: 5 },
  { name: "Sarah K.", text: "Super Auswahl und faire Preise. Der Kundenservice hat mir sehr schnell geholfen!", rating: 4 },
];

const Testimonials = () => {
  return (
    <section className="py-12 sm:py-16">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
          💬 Das sagen unsere Kunden
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Quote size={24} className="text-cta/20 absolute top-4 right-4" />
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  size={14}
                  className={j < t.rating ? "fill-rating text-rating" : "text-muted-foreground/30"}
                />
              ))}
            </div>
            <p className="font-body text-foreground/80 text-sm mb-4 italic">"{t.text}"</p>
            <p className="font-display font-bold text-foreground text-sm">– {t.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
