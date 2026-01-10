import { Phone, Mail, ArrowUp, Linkedin, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/totallog-logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Sobre Nós", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Valores", href: "#valores" },
    { name: "Contactos", href: "#contactos" },
  ];

  const services = [
    "Carga Aérea",
    "Carga Marítima",
    "Transporte Rodoviário",
    "Despacho Aduaneiro",
    "Seguro de Carga",
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <img src={logo} alt="Totallog" className="h-16 mb-6 brightness-0 invert" />
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Soluções completas de importação, exportação e logística. 
              Excelência em cada etapa do processo.
            </p>
            <p className="text-blue-pale font-semibold italic">
              "Logística a todo alcance."
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/70 hover:text-blue-pale transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Serviços</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-primary-foreground/70">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Contactos</h4>
            <div className="space-y-4">
              <a
                href="tel:+244923102227"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-blue-pale transition-colors"
              >
                <Phone size={18} />
                +244 923 102 227
              </a>
              <a
                href="tel:+351936678136"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-blue-pale transition-colors"
              >
                <Phone size={18} />
                +351 936 678 136
              </a>
              <a
                href="mailto:despachos@totallog.ao"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-blue-pale transition-colors"
              >
                <Mail size={18} />
                despachos@totallog.ao
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors duration-300"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} TOTALLOG. Todos os direitos reservados.
          </p>
          <p className="text-sm text-primary-foreground/60">
            Precisão. Confiança. Profissionalismo.
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute right-8 -top-6 w-12 h-12 rounded-full bg-secondary hover:bg-secondary/90 flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        <ArrowUp className="w-5 h-5 text-secondary-foreground" />
      </button>
    </footer>
  );
};

export default Footer;
