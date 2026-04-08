import { motion } from "framer-motion";
import { Baby, Puzzle, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    label: "0–3 Jahre",
    description: "Greiflinge, Rasseln & Kuscheltiere",
    Icon: Baby,
    color: "from-pink-300 to-rose-400",
  },
  {
    label: "4–7 Jahre",
    description: "Puzzles, Bausteine & Kreativsets",
    Icon: Puzzle,
    color: "from-amber-300 to-orange-400",
  },
  {
    label: "8+ Jahre",
    description: "Brettspiele, Technik & Modellbau",
    Icon: Gamepad2,
    color: "from-sky-300 to-blue-400",
  },
];

const AgeCategories = () => {
  return (
    <section id="nach-alter" className="py-12 sm:py-16">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
          🎂 Nach Alter shoppen
        </h2>
        <p className="font-body text-muted-foreground">
          Finde das perfekte Spielzeug für jede Altersgruppe
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {categories.map(({ label, description, Icon, color }, i) => (
          <motion.div
            key={label}
            className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${color} p-6 sm:p-8 text-center shadow-lg group cursor-pointer`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileHover={{ y: -4 }}
          >
            <div className="bg-card/30 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon size={32} className="text-foreground" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">
              {label}
            </h3>
            <p className="font-body text-foreground/80 text-sm mb-4">{description}</p>
            <Button variant="outline" size="sm" className="bg-card/60 border-card/80 text-foreground hover:bg-card/90">
              Entdecken →
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AgeCategories;
