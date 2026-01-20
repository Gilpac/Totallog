import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/totallog-logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Sobre Nós", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Valores", href: "#valores" },
    { name: "Contactos", href: "#contactos" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-primary text-primary-foreground py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+244923102227" className="flex items-center gap-2 hover:text-blue-pale transition-colors">
              <Phone size={14} />
              +244 923 102 227
            </a>
            <a href="mailto:despachos@totallog.ao" className="flex items-center gap-2 hover:text-blue-pale transition-colors">
              <Mail size={14} />
              despachos@totallog.ao
            </a>
          </div>
          <p className="font-medium">Logística a todo alcance.</p>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-card/95 backdrop-blur-lg shadow-lg"
            : "bg-card/80 backdrop-blur-sm"
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#inicio" className="flex-shrink-0" onClick={(e) => { e.preventDefault(); scrollToSection("#inicio"); }}>
              <img src={logo} alt="Totallog" className="h-20 w-auto" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="nav-link text-sm uppercase tracking-wide"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Flags and CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img 
                  src="https://flagcdn.com/w40/ao.png" 
                  alt="Angola" 
                  className="h-5 w-auto rounded-sm shadow-sm"
                />
                <img 
                  src="https://flagcdn.com/w40/pt.png" 
                  alt="Portugal" 
                  className="h-5 w-auto rounded-sm shadow-sm"
                />
              </div>
              <Button
                onClick={() => scrollToSection("#contactos")}
                className="btn-gradient border-0"
              >
                Fale Connosco
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute w-full bg-card shadow-xl transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 border-b" : "max-h-0"
          }`}
        >
          <div className="container-custom py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-left py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("#contactos")}
              className="btn-gradient border-0 mt-2"
            >
              Fale Connosco
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
