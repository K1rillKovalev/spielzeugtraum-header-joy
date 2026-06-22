import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ShoppingCart, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/products";

const Product = () => {
  const { slug = "" } = useParams();
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-body-bg">
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-extrabold text-logo mb-3">
            Toy not found
          </h1>
          <p className="font-body text-muted-foreground mb-6">
            We couldn't find the toy you're looking for.
          </p>
          <Link to="/catalogue">
            <Button variant="cta">Back to catalogue</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const outOfStock = product.stock === 0;
  const badgeColor =
    product.badge === "Bestseller"
      ? "bg-rating text-foreground"
      : product.badge === "Top Deal"
      ? "bg-accent text-accent-foreground"
      : "bg-cta text-cta-foreground";

  return (
    <div className="min-h-screen bg-body-bg">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        <Link
          to="/catalogue"
          className="inline-flex items-center gap-1 font-body text-sm text-foreground/70 hover:text-cta mb-6"
        >
          <ArrowLeft size={16} /> Back to catalogue
        </Link>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Image */}
          <div className="bg-card rounded-3xl shadow-lg overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full max-h-[520px] object-cover ${outOfStock ? "opacity-60" : ""}`}
            />
            <span
              className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold font-body ${badgeColor}`}
            >
              {product.badge}
            </span>
            {outOfStock && (
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold font-body bg-foreground/80 text-background">
                Out of Stock
              </span>
            )}
          </div>

          {/* Details */}
          <div className="bg-card rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col">
            <p className="font-body text-xs uppercase tracking-wider text-cta mb-2">
              {product.category}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-logo mb-2">
              {product.name}
            </h1>
            <p className="font-body text-sm text-muted-foreground mb-5">
              {product.brand} · Age {product.age}
            </p>

            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-display text-3xl font-extrabold text-cta">
                €{product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="font-body text-base text-muted-foreground line-through">
                  €{product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="mb-5">
              {outOfStock ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-destructive">
                  <X size={16} /> Out of stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-green-600">
                  <Check size={16} /> In stock — {product.stock} available
                </span>
              )}
            </div>

            <div className="mb-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-2">
                Description
              </h2>
              <p className="font-body text-foreground/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="font-display text-lg font-bold text-foreground mb-2">
                Technical Parameters
              </h2>
              <p className="font-body text-foreground/80 leading-relaxed">
                {product.specs}
              </p>
            </div>

            <div className="mt-auto">
              <Button
                variant="cta"
                size="lg"
                className="w-full sm:w-auto gap-2"
                disabled={outOfStock}
              >
                <ShoppingCart size={18} />
                {outOfStock ? "Unavailable" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
