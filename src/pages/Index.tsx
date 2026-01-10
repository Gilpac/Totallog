import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ValuesSection from "@/components/ValuesSection";
import DifferentialsSection from "@/components/DifferentialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSlider />
        <AboutSection />
        <ServicesSection />
        <ValuesSection />
        <DifferentialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
