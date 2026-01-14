import { useEffect, useState } from "react";
import { Handshake, Award, Globe } from "lucide-react";
import partnerEdilena from "@/assets/partner-edilena.png";
import partnerDachser from "@/assets/partner-dachser.jpeg";
import partnerCdoa from "@/assets/partner-cdoa.png";

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
      name: "CDOA - Câmara dos Despachantes Oficiais de Angola", 
      logo: partnerCdoa,
      description: "Associação profissional de despachantes"
    },
  ];

  const stats = [
    { icon: Handshake, value: "10+", label: "Anos de Parcerias" },
    { icon: Award, value: "100%", label: "Compromisso" },
    { icon: Globe, value: "2", label: "Países" },
  ];

  return (
    <section id="parceiros-section" className="py-24 bg-gradient-to-b from-muted/30 via-background to-muted/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

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
        <div className={`grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`group relative bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Top accent line */}
              <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
              
              {/* Logo container */}
              <div className="relative p-8 flex flex-col items-center">
                <div className="w-full h-40 flex items-center justify-center mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-32 max-w-full object-contain transition-transform duration-500 group-hover:scale-110 relative z-10"
                  />
                </div>
                
                {/* Partner info */}
                <div className="text-center mt-4 pt-4 border-t border-border/50 w-full">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {partner.description}
                  </p>
                </div>
              </div>

              {/* Corner decoration */}
              <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent transform translate-x-1/2 translate-y-1/2 rotate-45" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
