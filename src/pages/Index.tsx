import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ValuesSection from "@/components/ValuesSection";
import DifferentialsSection from "@/components/DifferentialsSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ChatProvider } from "@/contexts/ChatContext";

const Index = () => {
  return (
    <ChatProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSlider />
          <AboutSection />
          <ServicesSection />
          <ValuesSection />
          <DifferentialsSection />
          <PartnersSection />
          <ContactSection />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </ChatProvider>
  );
};

export default Index;
