import { useState } from "react";
import { Mail, Instagram, Facebook, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const linkColumns = [
  {
    title: "Links",
    links: ["About Us", "Contact", "Shipping & Returns", "Privacy Policy"],
  },
  {
    title: "Categories",
    links: ["Dolls", "Cars", "Educational Toys", "Wooden Toys", "Board Games"],
  },
  {
    title: "Support",
    links: ["Help", "FAQ", "Imprint", "Terms & Conditions"],
  },
];

const MobileColumn = ({ title, links }: { title: string; links: string[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[hsl(var(--cta)/.2)] md:border-none">
      <button
        className="flex items-center justify-between w-full py-3 md:hidden"
        onClick={() => setOpen(!open)}
      >
        <h4 className="font-display text-sm font-bold text-[hsl(var(--hero-bg))]">{title}</h4>
        <ChevronDown
          size={16}
          className={`text-[hsl(var(--hero-bg)/.6)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <h4 className="hidden md:block font-display text-sm font-bold text-[hsl(var(--hero-bg))] mb-4">{title}</h4>
      <AnimatePresence>
        {(open || typeof window === "undefined") && (
          <motion.ul
            className="flex flex-col gap-2 pb-3 md:!hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link) => (
              <li key={link}>
                <a href="#" className="font-body text-sm text-[hsl(var(--hero-bg)/.7)] hover:text-cta transition-colors duration-200">
                  {link}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <ul className="hidden md:flex flex-col gap-2">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="font-body text-sm text-[hsl(var(--hero-bg)/.7)] hover:text-cta transition-colors duration-200">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    toast({ title: "🎉 Subscribed!", description: "You'll receive news from SpielzeugTraum soon." });
    setEmail("");
  };

  return (
    <footer className="relative bg-logo text-[hsl(var(--hero-bg))]">
      {/* Toy pattern border */}
      <div className="h-2 w-full flex">
        {["#EE4C7C", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6B6B", "#C084FC", "#EE4C7C", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6B6B", "#C084FC"].map(
          (c, i) => (
            <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
          )
        )}
      </div>

      <div className="container mx-auto px-4 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
          {linkColumns.map((col) => (
            <MobileColumn key={col.title} title={col.title} links={col.links} />
          ))}

          {/* Newsletter + Social */}
          <div className="md:col-span-2">
            <h4 className="font-display text-sm font-bold text-[hsl(var(--hero-bg))] mb-4">
              Newsletter
            </h4>
            <p className="font-body text-sm text-[hsl(var(--hero-bg)/.7)] mb-3">
              Get exclusive deals and new arrivals!
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-5">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full h-10 pl-9 pr-3 rounded-full bg-[hsl(var(--hero-bg)/.1)] text-[hsl(var(--hero-bg))] border border-[hsl(var(--hero-bg)/.2)] focus:border-cta focus:outline-none font-body text-sm placeholder:text-[hsl(var(--hero-bg)/.4)]"
                  maxLength={255}
                />
              </div>
              <Button type="submit" variant="cta" size="sm">
                OK
              </Button>
            </form>

            {/* Social */}
            <div className="flex items-center gap-3">
              <span className="font-body text-xs text-[hsl(var(--hero-bg)/.5)]">Follow us:</span>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-[hsl(var(--hero-bg)/.1)] flex items-center justify-center hover:bg-cta transition-colors duration-200">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-[hsl(var(--hero-bg)/.1)] flex items-center justify-center hover:bg-cta transition-colors duration-200">
                <Facebook size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="h-px bg-[hsl(var(--hero-bg)/.15)] my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-body text-xs text-[hsl(var(--hero-bg)/.5)]">Payment methods:</span>
            {["PayPal", "Klarna", "Visa", "MC"].map((name) => (
              <div key={name} className="bg-[hsl(var(--hero-bg)/.1)] rounded-md px-2.5 py-1">
                <span className="font-display text-xs font-bold text-[hsl(var(--hero-bg)/.8)]">{name}</span>
              </div>
            ))}
          </div>

          <p className="font-body text-xs text-[hsl(var(--hero-bg)/.5)] text-center">
            © 2026 SpielzeugTraum.de – Made in Germany 🇩🇪
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
