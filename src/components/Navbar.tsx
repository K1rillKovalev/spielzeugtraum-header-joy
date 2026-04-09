import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Truck, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Bestsellers", href: "#bestseller" },
  { label: "By Age", href: "#nach-alter" },
  { label: "Reviews", href: "#reviews" },
];

const categories = ["Dolls", "Cars", "Educational Toys", "Wooden Toys", "Board Games"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [catOpen, setCatOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (label: string, href: string) => {
    setActive(label);
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[hsl(var(--nav-bg)/.92)] backdrop-blur-md shadow-lg"
          : "bg-[hsl(var(--nav-bg)/.75)] backdrop-blur-sm"
      }`}
    >
      {/* Shipping banner */}
      <div className="bg-foreground/90 text-primary-foreground text-xs sm:text-sm text-center py-1.5 font-body flex items-center justify-center gap-2">
        <Truck size={14} />
        <span>Free shipping on orders over €50</span>
        <span className="mx-2 opacity-40">|</span>
        <span className="hidden sm:inline">🎉 New toys every week!</span>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12 md:h-14">
          {/* Hamburger */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleClick(label, href)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold font-body transition-all duration-200 ${
                    active === label
                      ? "text-[hsl(var(--nav-active))] bg-card/40"
                      : "text-foreground/80 hover:text-[hsl(var(--nav-hover))] hover:bg-card/20"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
            {/* Categories dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold font-body transition-all duration-200 ${
                  active === "Categories"
                    ? "text-[hsl(var(--nav-active))] bg-card/40"
                    : "text-foreground/80 hover:text-[hsl(var(--nav-hover))] hover:bg-card/20"
                }`}
              >
                Categories
                <ChevronDown size={14} className={`transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-48 rounded-xl bg-card/95 backdrop-blur-md shadow-xl border border-border/30 py-2 z-50"
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className="w-full text-left px-4 py-2.5 text-sm font-body font-medium text-foreground/80 hover:text-[hsl(var(--nav-hover))] hover:bg-primary/10 transition-colors duration-150"
                        onClick={() => {
                          setActive("Categories");
                          setCatOpen(false);
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold font-body text-foreground/80 hover:text-[hsl(var(--nav-hover))] hover:bg-card/20 transition-all duration-200"
              aria-label="My Account"
            >
              <User size={18} />
              <span className="hidden sm:inline">My Account</span>
            </button>
            <button
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold font-body text-foreground/80 hover:text-[hsl(var(--nav-hover))] hover:bg-card/20 transition-all duration-200"
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              <span className="absolute -top-0.5 left-5 sm:left-auto sm:-top-0.5 sm:-right-1 w-4 h-4 bg-cta text-cta-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Toy-themed divider */}
      <div className="h-1 w-full flex">
        {["#EE4C7C", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6B6B", "#C084FC"].map((c, i) => (
          <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
        ))}
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[hsl(var(--nav-bg)/.95)] backdrop-blur-md border-t border-border/30"
          >
            <ul className="flex flex-col py-2 px-4">
              {navItems.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => handleClick(label, href)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold font-body transition-all duration-200 ${
                      active === label
                        ? "text-[hsl(var(--nav-active))] bg-card/40"
                        : "text-foreground/80 hover:text-[hsl(var(--nav-hover))] hover:bg-card/20"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
              {/* Mobile categories */}
              <li>
                <button
                  onClick={() => setMobileCatOpen(!mobileCatOpen)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold font-body transition-all duration-200 flex items-center justify-between ${
                    active === "Categories"
                      ? "text-[hsl(var(--nav-active))] bg-card/40"
                      : "text-foreground/80 hover:text-[hsl(var(--nav-hover))] hover:bg-card/20"
                  }`}
                >
                  Categories
                  <ChevronDown size={14} className={`transition-transform duration-200 ${mobileCatOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileCatOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden pl-4"
                    >
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-body text-foreground/70 hover:text-[hsl(var(--nav-hover))] hover:bg-card/20 transition-colors duration-150"
                          onClick={() => {
                            setActive("Categories");
                            setMobileOpen(false);
                            setMobileCatOpen(false);
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
