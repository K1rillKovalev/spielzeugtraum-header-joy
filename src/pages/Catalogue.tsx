import { Search, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import productCar from "@/assets/product-car.jpg";
import productDoll from "@/assets/product-doll.jpg";
import productPuzzle from "@/assets/product-puzzle.jpg";
import productTeddy from "@/assets/product-teddy.jpg";
import productBlocks from "@/assets/product-blocks.jpg";
import productTrain from "@/assets/product-train.jpg";

const products = [
  { name: "Turbo Race Car", price: "€19.99", oldPrice: "€24.99", stock: 24, image: productCar, badge: "Top Deal" },
  { name: "Rag Doll Lina", price: "€24.99", oldPrice: null, stock: 12, image: productDoll, badge: "Bestseller" },
  { name: "Animal Puzzle Set", price: "€14.99", oldPrice: "€18.99", stock: 37, image: productPuzzle, badge: "In Stock" },
  { name: "Teddy Bear Bruno", price: "€29.99", oldPrice: null, stock: 8, image: productTeddy, badge: "In Stock" },
  { name: "Colorful Building Blocks", price: "€22.99", oldPrice: "€27.99", stock: 41, image: productBlocks, badge: "Top Deal" },
  { name: "Wooden Train", price: "€34.99", oldPrice: "€39.99", stock: 15, image: productTrain, badge: "In Stock" },
  { name: "Mini Sports Car", price: "€16.99", oldPrice: null, stock: 22, image: productCar, badge: "In Stock" },
  { name: "Princess Doll Mia", price: "€27.99", oldPrice: "€32.99", stock: 9, image: productDoll, badge: "Bestseller" },
  { name: "Learning Puzzle Pro", price: "€19.99", oldPrice: null, stock: 30, image: productPuzzle, badge: "In Stock" },
];

const categories = ["Dolls", "Cars", "Educational Toys", "Wooden Toys", "Board Games"];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const badgeColor =
    product.badge === "Bestseller"
      ? "bg-rating text-foreground"
      : product.badge === "Top Deal"
      ? "bg-accent text-accent-foreground"
      : "bg-cta text-cta-foreground";

  return (
    <motion.div
      className="group bg-card rounded-2xl shadow-lg overflow-hidden border border-border/50 hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <div className="relative overflow-hidden bg-muted/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          width={600}
          height={600}
        />
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold font-body ${badgeColor}`}>
          {product.badge}
        </span>
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
          <Button
            variant="cta"
            size="sm"
            className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display text-base font-bold text-foreground mb-1 truncate">{product.name}</h3>
        <p className="font-body text-xs text-muted-foreground mb-2">
          In Stock: <span className="font-bold text-foreground">{product.stock}</span>
        </p>
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-extrabold text-cta">{product.price}</span>
          {product.oldPrice && (
            <span className="font-body text-sm text-muted-foreground line-through">{product.oldPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Catalogue = () => {
  return (
    <div className="min-h-screen bg-body-bg">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        {/* Page Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-logo">Catalogue</h1>
          <p className="font-body text-foreground/70 mt-1">Browse our full collection</p>
        </motion.div>

        {/* Search bar */}
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
              placeholder="Search for toys..."
              className="w-full h-12 sm:h-14 pl-12 pr-4 rounded-full bg-card text-card-foreground shadow-lg border-2 border-transparent focus:border-cta focus:outline-none transition-all duration-300 font-body text-base placeholder:text-muted-foreground"
            />
          </div>
        </motion.div>

        {/* Content: products + categories sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product, i) => (
              <ProductCard key={i} product={product} index={i} />
            ))}
          </div>

          {/* Categories sidebar */}
          <aside className="order-first lg:order-last">
            <div
              className="rounded-2xl shadow-lg p-6 lg:sticky lg:top-24"
              style={{ backgroundColor: "#EE4C7C" }}
            >
              <h2 className="font-display text-2xl font-extrabold text-white mb-4">Categories</h2>
              <ul className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button className="w-full text-left px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/30 text-white font-body font-semibold text-sm transition-colors duration-150">
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalogue;
