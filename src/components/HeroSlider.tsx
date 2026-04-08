import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroToys1 from "@/assets/hero-toys-1.jpg";
import heroToys2 from "@/assets/hero-toys-2.jpg";
import heroToys3 from "@/assets/hero-toys-3.jpg";

const slides = [heroToys1, heroToys2, heroToys3];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={slides[current]}
          alt="Colorful toys for children"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={800}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current ? "bg-cta scale-125" : "bg-card/60"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
