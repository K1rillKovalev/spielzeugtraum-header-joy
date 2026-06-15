import { Shield, RotateCcw, MousePointerClick } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SecurityCompliance() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[hsl(var(--bg))] py-12"
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          to="/"
          className="inline-block font-body text-sm text-[hsl(var(--hero-bg)/.6)] hover:text-cta transition-colors mb-6"
        >
          &larr; Home
        </Link>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-[hsl(var(--hero-bg))] mb-8">
          Security & Compliance
        </h1>

        {/* Refund Policy */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[hsl(var(--cta)/.15)] flex items-center justify-center">
              <RotateCcw className="text-cta" size={20} />
            </div>
            <h2 className="font-display text-2xl font-bold text-[hsl(var(--hero-bg))]">
              Refund Policy
            </h2>
          </div>

          <div className="space-y-4 font-body text-[hsl(var(--hero-bg)/.8)] leading-relaxed">
            <p>
              At SpielzeugTraum, we believe every child deserves a toy that sparks joy — and every parent deserves peace of mind. If your purchase does not meet your expectations, you have the right to request a full refund within 14 days of delivery, no questions asked.
            </p>

            <h3 className="font-display text-lg font-bold text-[hsl(var(--hero-bg))] mt-6 mb-2">
              Legal Address for Transparency
            </h3>
            <div className="bg-[hsl(var(--hero-bg)/.05)] border border-[hsl(var(--hero-bg)/.1)] rounded-xl p-5">
              <p className="font-body text-sm text-[hsl(var(--hero-bg)/.7)] leading-relaxed">
                SpielzeugTraum GmbH<br />
                Musterstraße 12<br />
                10115 Berlin, Germany<br />
                Email: support@spielzeugtraum.de<br />
                VAT ID: DE123456789
              </p>
            </div>

            <h3 className="font-display text-lg font-bold text-[hsl(var(--hero-bg))] mt-6 mb-2">
              How to Request a Refund
            </h3>
            <p>
              To initiate a refund, simply contact our support team via email or through your account dashboard. Please include your order number and a brief description of the reason for return. Once approved, you will receive a prepaid return label via email.
            </p>

            <h3 className="font-display text-lg font-bold text-[hsl(var(--hero-bg))] mt-6 mb-2">
              Refund Processing
            </h3>
            <p>
              Refunds are processed within 5–10 business days after we receive the returned item. The amount will be credited to your original payment method. If you paid using SpielzeugTraum Buttons, they will be restored to your account immediately upon approval.
            </p>

            <h3 className="font-display text-lg font-bold text-[hsl(var(--hero-bg))] mt-6 mb-2">
              Exceptions & Conditions
            </h3>
            <p>
              Items must be returned in their original, unused condition with all tags and packaging intact. Personalized or custom-made items are non-refundable unless defective. Digital gift cards are also exempt from refunds once redeemed.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-[hsl(var(--hero-bg)/.15)] my-8" />

        {/* Button-Lösung */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[hsl(var(--cta)/.15)] flex items-center justify-center">
              <MousePointerClick className="text-cta" size={20} />
            </div>
            <h2 className="font-display text-2xl font-bold text-[hsl(var(--hero-bg))]">
              Button-Lösung
            </h2>
          </div>

          <div className="space-y-4 font-body text-[hsl(var(--hero-bg)/.8)] leading-relaxed">
            <p>
              In accordance with German consumer protection regulations, we provide a clear and unambiguous description of the order button you click to finalize your purchase. This ensures complete transparency and informed consent before any payment obligation arises.
            </p>

            <h3 className="font-display text-lg font-bold text-[hsl(var(--hero-bg))] mt-6 mb-2">
              Exact Button Description
            </h3>
            <div className="bg-[hsl(var(--cta)/.1)] border border-[hsl(var(--cta)/.3)] rounded-xl p-5 flex flex-col items-center text-center">
              <div className="bg-cta text-white font-display font-bold text-base px-8 py-3 rounded-full shadow-md mb-3">
                Complete Purchase — Pay Now
              </div>
              <p className="font-body text-sm text-[hsl(var(--hero-bg)/.7)]">
                This is the exact label and appearance of the button displayed on the checkout page.
              </p>
            </div>

            <h3 className="font-display text-lg font-bold text-[hsl(var(--hero-bg))] mt-6 mb-2">
              What Happens When You Click
            </h3>
            <p>
              By clicking the "Complete Purchase — Pay Now" button, you place a binding order for the items in your shopping cart. This action constitutes a legal purchase agreement between you and SpielzeugTraum GmbH. You will immediately receive an order confirmation by email summarizing your purchase details, selected payment method, and estimated delivery date.
            </p>

            <h3 className="font-display text-lg font-bold text-[hsl(var(--hero-bg))] mt-6 mb-2">
              Payment Authorization
            </h3>
            <p>
              Clicking the button also authorizes us to charge your selected payment method for the total order amount, including any applicable shipping fees and discounts applied via SpielzeugTraum Buttons. No charges are processed before this button is clicked.
            </p>

            <h3 className="font-display text-lg font-bold text-[hsl(var(--hero-bg))] mt-6 mb-2">
              Right of Withdrawal Reminder
            </h3>
            <p>
              Immediately adjacent to the order button, you will see a concise notice reminding you of your 14-day right of withdrawal under the German Distance Selling Act (Fernabsatzgesetz). This reminder includes a direct link to our full Refund Policy for your convenience.
            </p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
