import { motion } from "framer-motion";
import welcomeBanner from "@/assets/welcome-banner.jpg";

const WelcomeBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl shadow-2xl mx-4 sm:mx-0">
      <img
        src={welcomeBanner}
        alt="Bunte Spielzeuge – Autos, Puppen, Puzzles"
        className="w-full h-[250px] sm:h-[320px] md:h-[400px] object-cover"
        width={1920}
        height={600}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent flex items-center">
        <motion.div
          className="px-6 sm:px-10 md:px-16 max-w-2xl"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight mb-3">
            Willkommen bei SpielzeugTraum
          </h2>
          <p className="font-body text-primary-foreground/90 text-base sm:text-lg md:text-xl mb-1">
            Spaß für jedes Kind! 🎈
          </p>
          <p className="font-body text-primary-foreground/70 text-sm sm:text-base">
            Entdecke über 1.000 Spielzeuge für alle Altersgruppen
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
