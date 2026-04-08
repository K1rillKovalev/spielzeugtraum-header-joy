import { Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import productCar from "@/assets/product-car.jpg";
import productDoll from "@/assets/product-doll.jpg";
import productPuzzle from "@/assets/product-puzzle.jpg";
import productTeddy from "@/assets/product-teddy.jpg";
import productBlocks from "@/assets/product-blocks.jpg";
import productTrain from "@/assets/product-train.jpg";

const products = [
  { name: "Rennwagen Turbo", price: "19,99€", oldPrice: "24,99€", rating: 5, image: productCar, badge: "Sofort lieferbar" },
  { name: "Stoffpuppe Lina", price: "24,99€", oldPrice: null, rating: 4, image: productDoll, badge: "Bestseller" },
  { name: "Tierpuzzle Set", price: "14,99€", oldPrice: "18,99€", rating: 5, image: productPuzzle, badge: "Sofort lieferbar" },
  { name: "Kuschelbär Bruno", price: "29,99€", oldPrice: null, rating: 5, image: productTeddy, badge: "Sofort lieferbar" },
  { name: "Bauklötze Bunt", price: "22,99€", oldPrice: "27,99€", rating: 4, image: productBlocks, badge: "Top Angebot" },
  { name: "Holzeisenbahn", price: "34,99€", oldPrice: "39,99€", rating: 5, image: productTrain, badge: "Sofort lieferbar" },
];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const badgeColor = product.badge === "Bestseller"
    ? "bg-rating text-foreground"
    : product.badge === "Top Angebot"
    ? "bg-accent text-accent-foreground"
    : "bg-cta text-cta-foreground";

  return (
    <motion.div
      className="group bg-card rounded-2xl shadow-lg overflow-hidden border border-border/50 hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-muted/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          width={600}
          height={600}
        />
        {/* Badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold font-body ${badgeColor}`}>
          {product.badge}
        </span>
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
          <Button
            variant="cta"
            size="sm"
            className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            <ShoppingCart size={16} />
            In den Warenkorb
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-base font-bold text-foreground mb-1 truncate">
          {product.name}
        </h3>
        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < product.rating ? "fill-rating text-rating" : "text-muted-foreground/30"}
            />
          ))}
        </div>
        {/* Price */}
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

const ProductGrid = () => {
  return (
    <section id="bestseller" className="py-12 sm:py-16">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
          ⭐ Top Bestseller
        </h2>
        <p className="font-body text-muted-foreground text-base">
          Die beliebtesten Spielzeuge unserer kleinen Kunden
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {products.map((product, i) => (
          <ProductCard key={product.name} product={product} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
