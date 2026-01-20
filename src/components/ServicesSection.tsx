import { useEffect, useRef, useState } from "react";
import { Plane, Ship, Truck, Package, FileCheck, Shield } from "lucide-react";
const services = [{
  icon: Plane,
  title: "Carga Aérea",
  subtitle: "Air Cargo",
  description: "Transporte aéreo nacional e internacional com rapidez e segurança.",
  features: ["Transporte Aéreo Internacional", "Transporte Aéreo Nacional", "Cargas Especiais", "LCL (Grupagem)", "Serviços Door-to-Door", "Gestão Aduaneira"]
}, {
  icon: Ship,
  title: "Carga Marítima",
  subtitle: "Maritime Cargo",
  description: "Soluções completas de transporte marítimo para todo o mundo.",
  features: ["FCL (Full Container Load)", "LCL (Grupagem)", "Transporte Break Bulk", "Serviços Door-to-Door", "Desembaraço Aduaneiro", "Seguro de Carga"]
}, {
  icon: Truck,
  title: "Transporte Rodoviário",
  subtitle: "Road Transportation",
  description: "Cobertura nacional com eficiência e pontualidade garantidas.",
  features: ["FTL (Full Truck Load)", "LTL (Less than Truck Load)", "Cargas Especiais", "Trânsito e Transbordo Aduaneiro", "Cabotagem"]
}];
const additionalServices = [{
  icon: Package,
  title: "Despacho Aduaneiro",
  description: "Gestão completa de processos aduaneiros com rigor, precisão e responsabilidade."
}, {
  icon: FileCheck,
  title: "Documentação",
  description: "Tratamento profissional de toda a documentação necessária para importação e exportação."
}, {
  icon: Shield,
  title: "Seguro de Carga",
  description: "Proteção total para as suas mercadorias em todas as modalidades de transporte."
}];
const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <section id="servicos" ref={sectionRef} className="section-padding bg-muted/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">Nossos serviços</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Soluções Completas em
            <span className="text-gradient block">despachos e logística Internacional</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Oferecemos um portfólio completo de serviços aduaneiros para atender todas as suas necessidades 
            de importação e exportação.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => <div key={index} className={`card-service group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{
          transitionDelay: `${index * 150}ms`
        }}>
              {/* Icon */}
              <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-500 glow-effect">
                <service.icon className="w-10 h-10 text-secondary-foreground" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
                {service.title}
              </h3>
              <p className="text-sm text-secondary font-medium mb-4 uppercase tracking-wide">
                {service.subtitle}
              </p>

              {/* Description */}
              <p className="text-muted-foreground mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-3">
                {service.features.map((feature, idx) => <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                    {feature}
                  </li>)}
              </ul>
            </div>)}
        </div>

        {/* Additional Services */}
        <div className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {additionalServices.map((service, index) => <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                <service.icon className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <h4 className="text-lg font-heading font-bold text-foreground mb-2">
                  {service.title}
                </h4>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default ServicesSection;