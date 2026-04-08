import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import WelcomeBanner from "@/components/WelcomeBanner";
import ProductGrid from "@/components/ProductGrid";
import AgeCategories from "@/components/AgeCategories";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import TrustBadges from "@/components/TrustBadges";
import ToyDivider from "@/components/ToyDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-body-bg" id="home">
      <Navbar />
      <Header />

      <main className="container mx-auto px-4">
        {/* Welcome Banner */}
        <div className="py-10 sm:py-14">
          <WelcomeBanner />
        </div>

        <ToyDivider />

        {/* Bestseller Products */}
        <ProductGrid />

        <ToyDivider />

        {/* Age Categories */}
        <AgeCategories />

        <ToyDivider />

        {/* Testimonials */}
        <Testimonials />

        <ToyDivider />

        {/* Newsletter */}
        <Newsletter />

        {/* Trust Badges */}
        <TrustBadges />
      </main>
    </div>
  );
};

export default Index;
