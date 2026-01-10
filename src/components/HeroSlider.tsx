import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroMaritime from "@/assets/hero-maritime.jpg";
import heroAir from "@/assets/hero-air.jpg";
import heroRoad from "@/assets/hero-road.jpg";

const slides = [
  {
    image: heroMaritime,
    title: "Carga Marítima",
    subtitle: "Transporte Global",
    description: "Soluções completas de FCL, LCL e Break Bulk para os seus envios marítimos internacionais.",
  },
  {
    image: heroAir,
    title: "Carga Aérea",
    subtitle: "Rapidez e Eficiência",
    description: "Transporte aéreo nacional e internacional com segurança e pontualidade.",
  },
  {
    image: heroRoad,
    title: "Transporte Rodoviário",
    subtitle: "Cobertura Nacional",
    description: "Carga completa e fracionada com trânsito e transbordo aduaneiro.",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
    <section id="inicio" className="relative h-[90vh] min-h-[600px] overflow-hidden">
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
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 hero-overlay" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-3xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 absolute"
                }`}
              >
                {index === currentSlide && (
                  <>
                    <span className="inline-block px-4 py-2 bg-secondary/90 text-secondary-foreground rounded-full text-sm font-semibold mb-6 animate-fade-in">
                      {slide.subtitle}
                    </span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground mb-6 leading-tight animate-fade-in delay-100">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed animate-fade-in delay-200">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
                      <Button
                        size="lg"
                        onClick={() => scrollToSection("#servicos")}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        Nossos Serviços
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => scrollToSection("#contactos")}
                        className="border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300"
                      >
                        Entre em Contacto
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-sm rounded-full transition-all duration-300 group"
      >
        <ChevronLeft className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-sm rounded-full transition-all duration-300 group"
      >
        <ChevronRight className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
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
                ? "w-10 h-3 bg-secondary"
                : "w-3 h-3 bg-primary-foreground/50 hover:bg-primary-foreground/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:block">
        <div className="flex flex-col items-center gap-2 text-primary-foreground/70">
          <span className="text-xs uppercase tracking-wider rotate-90 origin-center translate-y-8">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary-foreground/50 to-transparent animate-pulse-slow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
