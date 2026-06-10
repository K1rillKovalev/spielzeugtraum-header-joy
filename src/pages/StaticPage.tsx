import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface StaticPageProps {
  title: string;
  paragraphs: string[];
}

const StaticPage = ({ title, paragraphs }: StaticPageProps) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="bg-hero-bg py-8 text-center">
        <button onClick={() => navigate("/")} className="font-display text-3xl md:text-4xl font-extrabold text-logo tracking-tight">
          SpielzeugTraum
        </button>
      </div>
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-logo mb-8">{title}</h1>
        <div className="space-y-5 font-body text-base md:text-lg text-foreground/80 leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StaticPage;
