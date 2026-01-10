import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefones",
    details: ["+244 923 102 227", "+244 923 102 228", "+351 936 678 136"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["despachos@totallog.ao"],
  },
  {
    icon: Clock,
    title: "Horário",
    details: ["Segunda - Sexta: 8h - 18h", "Sábado: 8h - 13h"],
  },
];

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contacto brevemente.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <section
      id="contactos"
      ref={sectionRef}
      className="section-padding bg-muted/50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/5 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
            Contactos
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Entre em Contacto
            <span className="text-gradient block">Connosco</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Estamos prontos para ajudar com as suas necessidades logísticas. 
            Entre em contacto e descubra como podemos ser o seu parceiro de confiança.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">
                      {info.title}
                    </h4>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">
                        {info.title === "Telefones" ? (
                          <a href={`tel:${detail.replace(/\s/g, "")}`} className="hover:text-secondary transition-colors">
                            {detail}
                          </a>
                        ) : info.title === "Email" ? (
                          <a href={`mailto:${detail}`} className="hover:text-secondary transition-colors">
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-6 rounded-xl overflow-hidden border border-border/50 h-48 bg-card flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-sm">Angola | Portugal</p>
                <p className="text-xs mt-1">Presença Internacional</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border/50 shadow-lg">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                Envie-nos uma mensagem
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nome Completo
                  </label>
                  <Input
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Telefone
                  </label>
                  <Input
                    placeholder="+244 9XX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Assunto
                  </label>
                  <Input
                    placeholder="Assunto da mensagem"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Mensagem
                </label>
                <Textarea
                  placeholder="Escreva a sua mensagem..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="min-h-32 resize-none"
                />
              </div>

              <Button type="submit" className="w-full btn-gradient h-14 text-lg">
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
