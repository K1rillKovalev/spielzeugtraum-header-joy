import { Search, ShoppingCart, Heart, Star, Puzzle, Gamepad2, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import HeroSlider from "./HeroSlider";

const floatingIcons = [
  { Icon: Star, className: "top-4 left-4 md:top-8 md:left-12", delay: 0 },
  { Icon: Puzzle, className: "top-6 right-6 md:top-10 md:right-16", delay: 0.2 },
  { Icon: Gamepad2, className: "bottom-48 left-8 md:bottom-56 md:left-20", delay: 0.4 },
  { Icon: Baby, className: "top-20 left-1/4", delay: 0.6 },
  { Icon: Heart, className: "top-16 right-1/4", delay: 0.3 },
  { Icon: Star, className: "bottom-48 right-12 md:bottom-56 md:right-24", delay: 0.5 },
];

const GermanFlag = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" className="rounded-sm shadow-sm">
    <rect width="24" height="5.33" fill="#000" />
    <rect y="5.33" width="24" height="5.33" fill="#DD0000" />
    <rect y="10.66" width="24" height="5.34" fill="#FFCC00" />
  </svg>
);

const Header = () => {
  return (
    <header className="relative overflow-hidden bg-hero-bg">
      {/* Floating toy icons */}
      {floatingIcons.map(({ Icon, className, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute ${className} text-cta/30 hidden sm:block`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [-4, 4, -4], rotate: [-5, 5, -5] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon size={28 + i * 4} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      ))}

      <div className="container mx-auto px-4 pt-8 pb-8 relative z-10">

        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-logo tracking-tight">
            SpielzeugTraum
          </h1>
          <p className="font-body text-foreground/70 text-sm sm:text-base mt-1">
            Dein Traumland für Spielzeug ✨
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Suche nach Spielzeug..."
              className="w-full h-12 sm:h-14 pl-12 pr-4 rounded-full bg-card text-card-foreground shadow-lg border-2 border-transparent focus:border-cta focus:outline-none transition-all duration-300 font-body text-base placeholder:text-muted-foreground"
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Button variant="cta" size="lg" className="font-display text-lg">
            🎁 Jetzt shoppen
          </Button>
        </motion.div>

        {/* Hero Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <HeroSlider />
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
