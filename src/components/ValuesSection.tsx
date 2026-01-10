import { useEffect, useRef, useState } from "react";
import { Target, Eye, Heart, Lightbulb, Handshake, Leaf, ShieldCheck, Users } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Segurança",
    description: "Segurança e saúde dos trabalhadores em primeiro lugar.",
  },
  {
    icon: Target,
    title: "Excelência",
    description: "Busca constante pela melhoria contínua em gestão.",
  },
  {
    icon: Handshake,
    title: "Confiança",
    description: "Satisfação dos clientes baseada na transparência.",
  },
  {
    icon: Heart,
    title: "Ética",
    description: "Integridade em todas as relações e processos.",
  },
  {
    icon: Leaf,
    title: "Sustentabilidade",
    description: "Proteção ambiental e prevenção da poluição.",
  },
  {
    icon: Lightbulb,
    title: "Inovação",
    description: "Responsabilidade social e crescimento sustentável.",
  },
];

const ValuesSection = () => {
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
      id="valores"
      ref={sectionRef}
      className="section-padding bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Mission & Vision */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Mission */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Target className="w-7 h-7 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground">Missão</h3>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed pl-[74px]">
                Prestar serviços de excelência em Field Service, Outsourcing e Enterprise Solutions, 
                trazendo valor acrescentado aos nossos clientes. Oferecer soluções de importação com qualidade, 
                responsabilidade e respeito ao meio ambiente, garantindo a satisfação dos clientes 
                e a valorização dos colaboradores.
              </p>
            </div>

            {/* Vision */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Eye className="w-7 h-7 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground">Visão</h3>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed pl-[74px]">
                Ser uma empresa de referência no setor de importação e exportação, reconhecida pela eficiência, 
                segurança e compromisso com a sustentabilidade. Queremos ser um parceiro estratégico e de confiança, 
                promovendo operações seguras, responsáveis e ambientalmente corretas.
              </p>
            </div>

            {/* Commitment Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-secondary" />
                <h4 className="font-heading font-bold text-foreground">Nosso Compromisso</h4>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Estamos focados na satisfação do nosso cliente e em ter condições de trabalho saudáveis 
                e seguras. Comprometemo-nos com a melhoria contínua do nosso serviço, desempenho e sistema, 
                sempre respeitando os requisitos legais e normativos aplicáveis.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
              Nossos Valores
            </span>
            <h2 className="text-4xl font-heading font-bold text-foreground mb-8">
              Princípios que nos
              <span className="text-gradient block">Guiam Diariamente</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-card border border-border/50 hover:shadow-md transition-all duration-300 group hover:border-secondary/30"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-foreground mb-1">
                        {value.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
