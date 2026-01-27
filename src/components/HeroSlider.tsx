import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuoteRequestModal from "@/components/QuoteRequestModal";
import { useIsMobile } from "@/hooks/use-mobile";
import heroTotallog from "@/assets/hero-totallog-new.jpg";
import heroMaritime from "@/assets/hero-maritime-new.jpg";
import heroAir from "@/assets/hero-air-new.jpg";
import heroRoad from "@/assets/hero-road-new.jpg";
import heroEntrega from "@/assets/hero-entrega.png";
import heroCarrinha from "@/assets/hero-carrinha.png";
import heroContentor from "@/assets/hero-contentor.png";
import heroFarmacia from "@/assets/hero-farmacia.jpg";
import heroEscritorio1 from "@/assets/hero-escritorio1.jpg";
import heroEscritorio2 from "@/assets/hero-escritorio2.jpg";
import heroStock from "@/assets/hero-stock.png";

const slides = [
  {
    image: heroTotallog,
    title: "",
    subtitle: "",
    description: "",
    isLogoSlide: true,
    hasOverlay: false,
  },
  {
    image: heroMaritime,
    title: "Carga Marítima",
    subtitle: "Transporte Global",
    description: "Soluções completas de FCL, LCL e Break Bulk para os seus envios marítimos internacionais.",
    hasOverlay: true,
    desktopBgPosition: "bg-[right_top]",
  },
  {
    image: heroAir,
    title: "Carga Aérea",
    subtitle: "Rapidez e Eficiência",
    description: "Transporte aéreo nacional e internacional com segurança e pontualidade.",
    hasOverlay: true,
    desktopBgPosition: "bg-[right_top]",
  },
  {
    image: heroRoad,
    title: "Transporte Rodoviário",
    subtitle: "Cobertura Nacional",
    description: "Carga completa e fracionada com trânsito e transbordo aduaneiro.",
    hasOverlay: true,
  },
  {
    image: heroEntrega,
    title: "Entrega Eficiente",
    subtitle: "Última Milha",
    description: "Entregas pontuais e seguras com equipas especializadas.",
    hasOverlay: true,
  },
  {
    image: heroCarrinha,
    title: "Logística Integrada",
    subtitle: "Multimodal",
    description: "Soluções completas combinando transporte marítimo, aéreo e rodoviário.",
    hasOverlay: true,
  },
  {
    image: heroContentor,
    title: "Gestão de Contentores",
    subtitle: "Movimentação",
    description: "Operações portuárias eficientes e gestão completa de contentores.",
    hasOverlay: true,
  },
  {
    image: heroFarmacia,
    title: "Logística farmacêutica sem falhas",
    subtitle: "Especialização",
    description: "Logística especializada para produtos farmacêuticos e de saúde.",
    hasOverlay: false,
    desktopBgPosition: "bg-[right_top]",
  },
  {
    image: heroEscritorio1,
    title: "Atendimento Personalizado",
    subtitle: "Excelência",
    description: "Equipa dedicada para soluções logísticas à medida das suas necessidades.",
    hasOverlay: false,
  },
  {
    image: heroEscritorio2,
    title: "Tecnologia e Inovação",
    subtitle: "Modernização",
    description: "Sistemas integrados para rastreamento e gestão em tempo real.",
    hasOverlay: false,
  },
  {
    image: heroStock,
    title: "Logística segura e eficiente.",
    subtitle: "Armazenagem",
    description: "Controle, armazenagem e distribuição de cargas.",
    hasOverlay: false,
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: index === 0 
                ? (isMobile ? 'center right 13%' : 'center')
                : slide.desktopBgPosition 
                  ? (isMobile ? 'center' : 'right top')
                  : 'center'
            }}
          />
          {/* Overlay - only for slides with hasOverlay true and not logo slide */}
          {slide.hasOverlay && !slide.isLogoSlide && <div className="absolute inset-0 hero-overlay" />}
        </div>
      ))}

      {/* Content */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-10 transition-all duration-700 ${
            index === currentSlide
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {index === currentSlide && (
            <>
              {slide.isLogoSlide ? (
                <div className="absolute inset-0" />
              ) : (
                <div className="absolute bottom-14 sm:bottom-16 md:bottom-20 left-2 sm:left-4 md:left-8">
                  <div className="bg-primary/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 max-w-[220px] sm:max-w-sm lg:max-w-md shadow-xl border border-white/5 animate-slide-in-left">
                    <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-secondary text-secondary-foreground rounded-full text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2">
                      {slide.subtitle}
                    </span>
                    <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-heading font-bold text-primary-foreground mb-1.5 sm:mb-2 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-[10px] sm:text-xs md:text-sm text-primary-foreground/90 mb-2.5 sm:mb-4 leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
                      <Button
                        size="sm"
                        onClick={() => setIsQuoteModalOpen(true)}
                        className="bg-white hover:bg-white/90 text-primary font-semibold px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs rounded-lg transition-all duration-300 hover:scale-105"
                      >
                        Solicite a sua Cotação
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}

      {/* Navigation Arrows - hidden on mobile to avoid overlap with text */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-sm rounded-full transition-all duration-300 group hidden sm:block"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-sm rounded-full transition-all duration-300 group hidden sm:block"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 800);
              }
            }}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide
                ? "w-6 sm:w-10 h-2 sm:h-3 bg-secondary"
                : "w-2 sm:w-3 h-2 sm:h-3 bg-primary-foreground/50 hover:bg-primary-foreground/70"
            }`}
          />
        ))}
      </div>

      {/* Quote Request Modal */}
      <QuoteRequestModal open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen} />
    </section>
  );
};

export default HeroSlider;
