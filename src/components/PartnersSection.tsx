import { useEffect, useState } from "react";
import { Handshake, Award, Globe } from "lucide-react";
import partnerEdilena from "@/assets/partner-edilena.png";
import partnerDachser from "@/assets/partner-dachser.jpeg";
import partnerCdoa from "@/assets/partner-cdoa.png";
import partnerNossaSeguros from "@/assets/partner-nossa-seguros.png";

const PartnersSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("parceiros-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const partners = [
    { 
      name: "Nossa Seguros", 
      logo: partnerNossaSeguros,
      description: "Parceiro em soluções de seguros"
    },
    { 
      name: "Edilena - Transitário, LDA", 
      logo: partnerEdilena,
      description: "Parceiro estratégico em transitário"
    },
    { 
      name: "Dachser Intelligent Logistics", 
      logo: partnerDachser,
      description: "Logística inteligente global"
    },
    { 
      name: "CDOA", 
      logo: partnerCdoa,
      description: "Associação profissional de despachantes"
    },
  ];

  const stats = [
    { icon: Handshake, value: "10+", label: "Anos de Parcerias" },
    { icon: Award, value: "100%", label: "Compromisso" },
    { icon: Globe, value: "2", label: "Países" },
  ];

  // Quadruple partners for seamless infinite scroll on all devices
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section id="parceiros-section" className="py-24 bg-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Handshake className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Parcerias de Confiança
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-4">
            Os Nossos Parceiros
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
            Trabalhamos com parceiros de excelência para oferecer soluções logísticas integradas e de alta qualidade
          </p>
        </div>

        {/* Stats Row */}
        <div className={`grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-20 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Partners Infinite Scroll Carousel */}
        <div className={`relative overflow-hidden transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <div className="flex animate-infinite-scroll" style={{ width: 'max-content' }}>
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center justify-center w-[200px] md:w-[240px] lg:w-[280px]"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-14 md:h-20 lg:h-24 w-auto max-w-[160px] md:max-w-[200px] object-contain transition-all duration-500 hover:scale-110"
                />
                <span className="mt-3 text-xs md:text-sm text-muted-foreground text-center px-2">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-muted-foreground">
            Interessado em tornar-se nosso parceiro?{" "}
            <a 
              href="#contactos" 
              className="text-primary font-semibold hover:underline transition-all"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contactos")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Entre em contacto connosco
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
