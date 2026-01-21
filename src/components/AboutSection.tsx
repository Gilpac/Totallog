import { useEffect, useRef, useState } from "react";
import { Shield, Globe, Users, Award } from "lucide-react";

const stats = [{
  icon: Shield,
  value: "100%",
  label: "Segurança"
}, {
  icon: Globe,
  value: "50+",
  label: "Países"
}, {
  icon: Users,
  value: "1000+",
  label: "Clientes"
}, {
  icon: Award,
  value: "15+",
  label: "Anos de Experiência"
}];

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sobre" ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-sky/20 to-transparent pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">Quem somos?</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
              O seu Parceiro de confiança em
              <span className="text-gradient block">despacho aduaneiro</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              <strong className="text-foreground">TOTALLOG - Transitário</strong> é uma empresa de referência no setor de Importação e Exportação, com forte presença nacional e internacional. Somos especialistas em soluções completas de despachos aduaneiros e logística, oferecendo serviços eficientes, seguros e sustentáveis.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Atuamos com foco na qualidade, transparência e excelência em cada etapa do processo aduaneiro e logístico, garantindo a satisfação dos nossos clientes e parceiros. Valorizamos a excelência operacional, a inovação e o desenvolvimento contínuo das nossas equipas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Shield className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Segurança</p>
                  <p className="text-sm text-muted-foreground">Total garantia</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Globe className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Global</p>
                  <p className="text-sm text-muted-foreground">Alcance mundial</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="card-service text-center group" style={{
                  animationDelay: `${index * 100}ms`
                }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <stat.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
