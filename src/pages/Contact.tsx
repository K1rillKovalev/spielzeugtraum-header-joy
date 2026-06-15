import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Store } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStoreInfo } from "@/lib/storeInfo";

export default function Contact() {
  const navigate = useNavigate();
  const info = useStoreInfo();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="bg-hero-bg py-8 text-center">
        <button
          onClick={() => navigate("/")}
          className="font-display text-3xl md:text-4xl font-extrabold text-logo tracking-tight"
        >
          SpielzeugTraum
        </button>
      </div>
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-logo mb-8">
          Contact Us
        </h1>
        <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed mb-10">
          We'd love to hear from you — whether it's a question about an order,
          a wish for a new toy, or a story about your child's favourite plush.
          Reach out through any of the channels below and a real human will write
          back between gift-wrapping marathons.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-card border border-border/60 shadow-sm p-5 flex items-start gap-3">
            <Store className="h-5 w-5 text-accent shrink-0 mt-1" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Store</p>
              <p className="font-medium">{info.name}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-border/60 shadow-sm p-5 flex items-start gap-3">
            <Mail className="h-5 w-5 text-accent shrink-0 mt-1" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Email</p>
              <a href={`mailto:${info.email}`} className="font-medium hover:text-accent">
                {info.email}
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-border/60 shadow-sm p-5 flex items-start gap-3">
            <Phone className="h-5 w-5 text-accent shrink-0 mt-1" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Phone</p>
              <a href={`tel:${info.phone.replace(/\s+/g, "")}`} className="font-medium hover:text-accent">
                {info.phone}
              </a>
              <p className="text-xs text-muted-foreground mt-1">Mon–Fri, 9:00 – 18:00</p>
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-border/60 shadow-sm p-5 flex items-start gap-3">
            <MapPin className="h-5 w-5 text-accent shrink-0 mt-1" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Address</p>
              <p className="font-medium">{info.address}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
