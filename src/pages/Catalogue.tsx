import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter,
} from "@/components/ui/sheet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, type Product, type AgeGroup } from "@/lib/products";

const allCategories = ["Dolls", "Cars", "Educational Toys", "Wooden Toys", "Board Games", "Plush"];
const allBrands = ["SpeedyToys", "DreamPlay", "LearnFun", "CuddleCo", "BrickWorld", "EcoToys"];
const allAvailability = ["In Stock", "Out of Stock"] as const;
const allAges: AgeGroup[] = ["0-3", "4-7", "8+"];
const PRICE_MIN = 0;
const PRICE_MAX = 50;
const ITEMS_PER_PAGE = 9;

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const badgeColor =
    product.badge === "Bestseller"
      ? "bg-rating text-foreground"
      : product.badge === "Top Deal"
      ? "bg-accent text-accent-foreground"
      : "bg-cta text-cta-foreground";
  const outOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block bg-card rounded-2xl shadow-lg overflow-hidden border border-border/50 hover:shadow-2xl transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cta"
      >
        <div className="relative overflow-hidden bg-muted/30">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500 ${outOfStock ? "opacity-60" : ""}`}
            loading="lazy"
            width={600}
            height={600}
          />
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold font-body ${badgeColor}`}>
            {product.badge}
          </span>
          {outOfStock && (
            <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold font-body bg-foreground/80 text-background">
              Out of Stock
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-display text-base font-bold text-foreground mb-1 truncate">{product.name}</h3>
          <p className="font-body text-xs text-muted-foreground mb-2">
            {product.brand} · Age {product.age}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-extrabold text-cta">€{product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="font-body text-sm text-muted-foreground line-through">€{product.oldPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const CheckboxList = ({
  options, selected, onToggle,
}: { options: readonly string[]; selected: string[]; onToggle: (v: string) => void }) => (
  <div className="flex flex-col gap-2">
    {options.map((opt) => (
      <label key={opt} className="flex items-center gap-2 cursor-pointer font-body text-sm">
        <Checkbox checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} />
        <span>{opt}</span>
      </label>
    ))}
  </div>
);

const getVisiblePages = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];

  if (currentPage <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i);
    pages.push("...");
    pages.push(totalPages);
  } else if (currentPage >= totalPages - 3) {
    pages.push(1);
    pages.push("...");
    for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push("...");
    pages.push(currentPage - 1);
    pages.push(currentPage);
    pages.push(currentPage + 1);
    pages.push("...");
    pages.push(totalPages);
  }

  return pages;
};

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border/50 text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {visiblePages.map((page, idx) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="flex items-center justify-center w-10 h-10 font-body text-muted-foreground select-none"
            >
              ...
            </span>
          );
        }

        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            disabled={isCurrent}
            className={`flex items-center justify-center w-10 h-10 rounded-full font-body text-sm font-semibold transition-colors ${
              isCurrent
                ? "bg-cta/20 text-cta opacity-60 cursor-default"
                : "bg-card border border-border/50 text-foreground hover:bg-muted"
            }`}
            aria-label={`Page ${page}`}
            aria-current={isCurrent ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border/50 text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

const Catalogue = () => {
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const [price, setPrice] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [cats, setCats] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && allCategories.includes(cat)) {
      setCats((prev) => (prev.includes(cat) ? prev : [cat]));
    }
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, price, cats]);

  const [brands, setBrands] = useState<string[]>([]);
  const [avail, setAvail] = useState<string[]>([]);
  const [ages, setAges] = useState<string[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (v: string) =>
    setter((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (p.price < price[0] || p.price > price[1]) return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (ages.length && !ages.includes(p.age)) return false;
      if (avail.length) {
        const status = p.stock > 0 ? "In Stock" : "Out of Stock";
        if (!avail.includes(status)) return false;
      }
      return true;
    });
  }, [search, price, cats, brands, ages, avail]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const activeExtraCount = brands.length + avail.length + ages.length;

  const clearAll = () => {
    setPrice([PRICE_MIN, PRICE_MAX]);
    setCats([]); setBrands([]); setAvail([]); setAges([]);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-body-bg">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-logo">Catalogue</h1>
          <p className="font-body text-foreground/70 mt-1">Browse our full collection</p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for toys..."
              className="w-full h-12 sm:h-14 pl-12 pr-4 rounded-full bg-card text-card-foreground shadow-lg border-2 border-transparent focus:border-cta focus:outline-none transition-all duration-300 font-body text-base placeholder:text-muted-foreground"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Filters sidebar */}
          <aside className="space-y-5">
            <div className="bg-card rounded-2xl shadow-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-extrabold text-foreground">Filters</h2>
                <button
                  onClick={clearAll}
                  className="font-body text-xs text-cta hover:underline"
                >
                  Clear all
                </button>
              </div>

              {/* Price */}
              <div className="mb-6">
                <Label className="font-display font-bold text-sm mb-3 block">Price</Label>
                <div className="space-y-4">
                  <div>
                    <Label className="font-body text-xs text-muted-foreground mb-1 block">Min Price</Label>
                    <Slider
                      min={PRICE_MIN}
                      max={PRICE_MAX}
                      step={1}
                      value={[price[0]]}
                      onValueChange={(v) => setPrice([Math.min(v[0], price[1]), price[1]])}
                    />
                    <span className="text-xs font-body text-muted-foreground">€{price[0]}</span>
                  </div>
                  <div>
                    <Label className="font-body text-xs text-muted-foreground mb-1 block">Max Price</Label>
                    <Slider
                      min={PRICE_MIN}
                      max={PRICE_MAX}
                      step={1}
                      value={[price[1]]}
                      onValueChange={(v) => setPrice([price[0], Math.max(v[0], price[0])])}
                    />
                    <span className="text-xs font-body text-muted-foreground">€{price[1]}</span>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="mb-4">
                <Label className="font-display font-bold text-sm mb-3 block">Category</Label>
                <CheckboxList options={allCategories} selected={cats} onToggle={toggle(setCats)} />
              </div>

              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full gap-2">
                    <SlidersHorizontal size={16} />
                    All filters
                    {activeExtraCount > 0 && (
                      <span className="ml-1 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-cta text-cta-foreground text-xs font-bold">
                        {activeExtraCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="font-display">All filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div>
                      <Label className="font-display font-bold text-sm mb-3 block">Brand</Label>
                      <CheckboxList options={allBrands} selected={brands} onToggle={toggle(setBrands)} />
                    </div>
                    <div>
                      <Label className="font-display font-bold text-sm mb-3 block">Availability</Label>
                      <CheckboxList options={allAvailability} selected={avail} onToggle={toggle(setAvail)} />
                    </div>
                    <div>
                      <Label className="font-display font-bold text-sm mb-3 block">Age of the child</Label>
                      <CheckboxList
                        options={allAges.map((a) => `${a} years`)}
                        selected={ages.map((a) => `${a} years`)}
                        onToggle={(v) => toggle(setAges)(v.replace(" years", ""))}
                      />
                    </div>
                  </div>
                  <SheetFooter className="mt-6 flex-row gap-2 sm:justify-between">
                    <Button variant="outline" onClick={() => { setBrands([]); setAvail([]); setAges([]); }}>
                      Reset
                    </Button>
                    <Button onClick={() => setSheetOpen(false)} className="bg-cta hover:bg-cta/90 text-cta-foreground">
                      Apply
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </aside>

          {/* Products */}
          <div>
            {filtered.length === 0 ? (
              <div className="bg-card rounded-2xl p-12 text-center shadow-lg">
                <p className="font-body text-muted-foreground">No toys match your filters.</p>
                <Button onClick={clearAll} variant="outline" className="mt-4">
                  <X size={16} className="mr-1" /> Clear filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {paginated.map((product, i) => (
                    <ProductCard key={`${product.name}-${i}`} product={product} index={i} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalogue;
