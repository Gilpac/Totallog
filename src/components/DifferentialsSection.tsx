import { useEffect, useRef, useState } from "react";
import { CheckCircle, Clock, HeadphonesIcon, Globe2, Truck, FileCheck } from "lucide-react";

const differentials = [
  {
    icon: CheckCircle,
    title: "Precisão e Rigor",
    description: "Cada processo é tratado com total atenção aos detalhes, assegurando conformidade e segurança em todas as etapas.",
  },
  {
    icon: Clock,
    title: "Agilidade",
    description: "Processos otimizados para garantir rapidez sem comprometer a qualidade e segurança das operações.",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte Dedicado",
    description: "Equipa especializada disponível para acompanhar e orientar cada etapa do processo aduaneiro e logístico.",
  },
  {
    icon: Globe2,
    title: "Alcance Global",
    description: "Rede de parceiros internacionais para cobrir rotas em todo o mundo com eficiência.",
  },
  {
    icon: Truck,
    title: "Soluções Integradas",
    description: "Combinamos transporte aéreo, marítimo e rodoviário para soluções personalizadas.",
  },
  {
    icon: FileCheck,
    title: "Transparência Total",
    description: "Documentação clara e acompanhamento em tempo real de todas as operações.",
  },
];

const DifferentialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-primary relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-semibold mb-6">
            Por Que Escolher-nos
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-6">
            TOTALLOG — Excelência em
            <span className="block text-blue-pale">Despacho Aduaneiro</span>
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Na TOTALLOG - Transitário, o seu despacho aduaneiro é tratado com rigor, precisão e responsabilidade. 
            A forma mais segura, eficiente e confiável de lidar com a alfândega.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentials.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/15 transition-all duration-500 group ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 mb-4 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-7 h-7 text-blue-pale" />
              </div>
              <h3 className="text-xl font-heading font-bold text-primary-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground">
            Precisão. Confiança. Segurança. Profissionalismo.
          </p>
          <p className="text-blue-pale mt-2">Logística a todo alcance.</p>
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
