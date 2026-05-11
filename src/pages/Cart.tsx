import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trash2, Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import productTeddy from "@/assets/product-teddy.jpg";

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
  starred: boolean;
};

const initialItems: CartItem[] = [
  { id: 1, name: "Teddy Bear Bruno", price: 29.99, qty: 1, image: productTeddy, starred: false },
];

type Step = null | "address" | "shipping" | "payment" | "summary" | "confirmed";

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [step, setStep] = useState<Step>(null);
  const [address, setAddress] = useState({ name: "", street: "", city: "", zip: "" });
  const [shipping, setShipping] = useState<"standard" | "express">("standard");
  const [payment, setPayment] = useState<"card" | "paypal" | "klarna">("card");

  const updateQty = (id: number, delta: number) =>
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(0, it.qty + delta) } : it))
        .filter((it) => it.qty > 0),
    );

  const removeItem = (id: number) => setItems((prev) => prev.filter((it) => it.id !== id));

  const toggleStar = (id: number) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, starred: !it.starred } : it)));

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const shippingCost = subtotal === 0 ? 0 : shipping === "express" ? 9.99 : subtotal >= 50 ? 0 : 4.99;
  const vat = subtotal * 0.19;
  const total = subtotal + shippingCost + vat;

  const handleStartPurchase = () => {
    if (items.length === 0) {
      toast({ title: "Your cart is empty", description: "Add some toys first!" });
      return;
    }
    setStep("address");
  };

  const next = () => {
    if (step === "address") {
      if (!address.name || !address.street || !address.city || !address.zip) {
        toast({ title: "Please fill in all fields" });
        return;
      }
      setStep("shipping");
    } else if (step === "shipping") setStep("payment");
    else if (step === "payment") setStep("summary");
    else if (step === "summary") setStep("confirmed");
  };

  const closeAndReset = () => {
    setStep(null);
    if (step === "confirmed") {
      setItems([]);
      navigate("/");
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
        >
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-logo">Your Cart</h1>
          <p className="font-body text-foreground/70 mt-1">Review your toys before checkout</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 max-w-5xl mx-auto">
          {/* Items */}
          <div className="flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="bg-card rounded-2xl shadow-lg p-10 text-center">
                <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-3" />
                <p className="font-body text-foreground/70 mb-4">Your cart is empty.</p>
                <Button variant="cta" onClick={() => navigate("/catalogue")}>
                  Browse Catalogue
                </Button>
              </div>
            ) : (
              items.map((it) => (
                <motion.div
                  key={it.id}
                  layout
                  className="bg-card rounded-2xl shadow-lg border border-border/50 p-4 flex gap-4 items-center"
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-bold text-foreground truncate">
                      {it.name}
                    </h3>
                    <p className="font-display text-cta font-extrabold text-lg">
                      €{it.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(it.id, -1)}
                        className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70"
                        aria-label="Decrease"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-body font-bold w-6 text-center">{it.qty}</span>
                      <button
                        onClick={() => updateQty(it.id, 1)}
                        className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70"
                        aria-label="Increase"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant={it.starred ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleStar(it.id)}
                      className="gap-1.5"
                    >
                      <Star
                        size={14}
                        className={it.starred ? "fill-rating text-rating" : ""}
                      />
                      Starred
                    </Button>
                    <Button variant="cta" size="sm" onClick={handleStartPurchase}>
                      Purchase
                    </Button>
                    <button
                      onClick={() => removeItem(it.id)}
                      className="text-muted-foreground hover:text-destructive text-xs flex items-center gap-1 justify-center"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Summary */}
          <aside>
            <div className="bg-card rounded-2xl shadow-lg p-6 lg:sticky lg:top-24 border border-border/50">
              <h2 className="font-display text-xl font-extrabold mb-4">Order Summary</h2>
              <div className="space-y-2 font-body text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping (est.)</span>
                  <span>€{shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>VAT (19%)</span>
                  <span>€{vat.toFixed(2)}</span>
                </div>
                <div className="border-t border-border/50 my-2" />
                <div className="flex justify-between font-display text-lg font-extrabold text-cta">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>
              <Button variant="cta" className="w-full mt-5" onClick={handleStartPurchase}>
                Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => navigate("/catalogue")}
              >
                Continue Shopping
              </Button>
            </div>
          </aside>
        </div>
      </main>

      {/* Checkout Dialogs */}
      <Dialog open={step === "address"} onOpenChange={(o) => !o && setStep(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Shipping Address</DialogTitle>
            <DialogDescription>Where should we send your toys?</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Full Name</Label>
              <Input value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
            </div>
            <div>
              <Label>Street & Number</Label>
              <Input value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>City</Label>
                <Input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
              </div>
              <div>
                <Label>ZIP</Label>
                <Input value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="cta" onClick={next}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={step === "shipping"} onOpenChange={(o) => !o && setStep(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Shipping Method</DialogTitle>
            <DialogDescription>Choose how fast you want your toys.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {[
              { id: "standard", label: "Standard (3–5 days)", price: subtotal >= 50 ? "Free" : "€4.99" },
              { id: "express", label: "Express (1–2 days)", price: "€9.99" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setShipping(opt.id as "standard" | "express")}
                className={`w-full flex justify-between p-4 rounded-xl border-2 transition ${
                  shipping === opt.id ? "border-cta bg-cta/5" : "border-border/50 hover:border-cta/50"
                }`}
              >
                <span className="font-body font-semibold">{opt.label}</span>
                <span className="font-bold">{opt.price}</span>
              </button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStep("address")}>Back</Button>
            <Button variant="cta" onClick={next}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={step === "payment"} onOpenChange={(o) => !o && setStep(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Method</DialogTitle>
            <DialogDescription>Select how you'd like to pay.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {[
              { id: "card", label: "Credit / Debit Card" },
              { id: "paypal", label: "PayPal" },
              { id: "klarna", label: "Klarna — Pay Later" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPayment(opt.id as typeof payment)}
                className={`w-full text-left p-4 rounded-xl border-2 transition ${
                  payment === opt.id ? "border-cta bg-cta/5" : "border-border/50 hover:border-cta/50"
                }`}
              >
                <span className="font-body font-semibold">{opt.label}</span>
              </button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStep("shipping")}>Back</Button>
            <Button variant="cta" onClick={next}>Review Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={step === "summary"} onOpenChange={(o) => !o && setStep(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Summary</DialogTitle>
            <DialogDescription>Please review before confirming.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 font-body text-sm">
            <div className="bg-muted/30 rounded-xl p-3">
              <p className="font-bold mb-1">Shipping to</p>
              <p className="text-muted-foreground">
                {address.name}, {address.street}, {address.zip} {address.city}
              </p>
            </div>
            <div className="bg-muted/30 rounded-xl p-3">
              <p className="font-bold mb-1">Items</p>
              {items.map((it) => (
                <div key={it.id} className="flex justify-between text-muted-foreground">
                  <span>{it.name} × {it.qty}</span>
                  <span>€{(it.price * it.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between"><span>Subtotal</span><span>€{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping ({shipping})</span><span>€{shippingCost.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>VAT (19%)</span><span>€{vat.toFixed(2)}</span></div>
              <div className="flex justify-between font-display font-extrabold text-lg text-cta border-t border-border/50 pt-2 mt-2">
                <span>Total</span><span>€{total.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Payment: {payment.toUpperCase()}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStep("payment")}>Back</Button>
            <Button variant="cta" onClick={next}>Confirm & Pay</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={step === "confirmed"} onOpenChange={(o) => !o && closeAndReset()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="text-green-600" /> Order Confirmed!
            </DialogTitle>
            <DialogDescription>
              Thank you, {address.name || "friend"}! Your toys are on their way. 🎁
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="cta" onClick={closeAndReset}>Back to Home</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AnimatePresence />
      <Footer />
    </div>
  );
};

export default Cart;
