import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { AboutSection } from "@/components/landing/AboutSection";

const Index = () => {
  return (
    <>
      {/* SEO Meta Tags - handled in index.html */}
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
