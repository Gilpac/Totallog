import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { User, Building2, Ship, Plane, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface QuoteRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuoteRequestModal = ({ open, onOpenChange }: QuoteRequestModalProps) => {
  const [clientType, setClientType] = useState<"individual" | "company">("individual");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Individual fields
    fullName: "",
    phone: "",
    email: "",
    nif: "",
    // Company fields
    companyName: "",
    companyNif: "",
    position: "",
    companyPhone: "",
    companyEmail: "",
    // Common fields
    regime: "",
    requiresInsurance: "",
    serviceType: "",
    origin: "",
    destination: "",
    merchandiseType: "",
    weight: "",
    volume: "",
    observations: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getServiceTypeName = (value: string) => {
    const types: Record<string, string> = {
      maritime: "Marítimo",
      air: "Aéreo",
      road: "Rodoviário",
    };
    return types[value] || value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailData = {
        type: "quote" as const,
        clientType,
        name: clientType === "individual" ? formData.fullName : formData.companyName,
        phone: clientType === "individual" ? formData.phone : formData.companyPhone,
        email: clientType === "individual" ? formData.email : formData.companyEmail,
        nif: clientType === "individual" ? formData.nif : formData.companyNif,
        companyName: formData.companyName,
        position: formData.position,
        regime: formData.regime,
        requiresInsurance: formData.requiresInsurance,
        serviceType: getServiceTypeName(formData.serviceType),
        merchandiseType: formData.merchandiseType,
        origin: formData.origin,
        destination: formData.destination,
        weight: formData.weight,
        volume: formData.volume,
        observations: formData.observations,
      };

      const { data, error } = await supabase.functions.invoke("send-email", {
        body: emailData,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Cotação Solicitada!",
        description: "A sua solicitação foi enviada com sucesso. Entraremos em contacto em breve.",
      });

      onOpenChange(false);
      
      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        nif: "",
        companyName: "",
        companyNif: "",
        position: "",
        companyPhone: "",
        companyEmail: "",
        serviceType: "",
        origin: "",
        destination: "",
        merchandiseType: "",
        regime: "",
        requiresInsurance: "",
        weight: "",
        volume: "",
        observations: "",
      });
    } catch (error: any) {
      console.error("Error sending quote request:", error);
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar a solicitação. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-primary flex items-center gap-2">
            Solicitar Cotação
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Client Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Tipo de Cliente</Label>
            <RadioGroup
              value={clientType}
              onValueChange={(value) => setClientType(value as "individual" | "company")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual" className="flex items-center gap-2 cursor-pointer">
                  <User className="w-4 h-4" />
                  Pessoa Singular
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company" className="flex items-center gap-2 cursor-pointer">
                  <Building2 className="w-4 h-4" />
                  Empresa
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Individual Fields */}
          {clientType === "individual" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  required
                  placeholder="Introduza o seu nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  placeholder="+351 XXX XXX XXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  placeholder="exemplo@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nif">NIF *</Label>
                <Input
                  id="nif"
                  value={formData.nif}
                  onChange={(e) => handleInputChange("nif", e.target.value)}
                  required
                  placeholder="Número de Identificação Fiscal"
                />
              </div>
            </div>
          )}

          {/* Company Fields */}
          {clientType === "company" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nome da Empresa *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  required
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyNif">NIF da Empresa *</Label>
                <Input
                  id="companyNif"
                  value={formData.companyNif}
                  onChange={(e) => handleInputChange("companyNif", e.target.value)}
                  required
                  placeholder="NIF da empresa"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Cargo na Empresa *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  required
                  placeholder="Ex: Diretor de Logística"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyPhone">Telefone da Empresa *</Label>
                <Input
                  id="companyPhone"
                  type="tel"
                  value={formData.companyPhone}
                  onChange={(e) => handleInputChange("companyPhone", e.target.value)}
                  required
                  placeholder="+351 XXX XXX XXX"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="companyEmail">E-mail da Empresa *</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={formData.companyEmail}
                  onChange={(e) => handleInputChange("companyEmail", e.target.value)}
                  required
                  placeholder="empresa@email.com"
                />
              </div>
            </div>
          )}

          {/* Service Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Detalhes do Serviço</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="regime">Regime *</Label>
                <Select
                  value={formData.regime}
                  onValueChange={(value) => handleInputChange("regime", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o regime" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="importacao">Importação</SelectItem>
                    <SelectItem value="exportacao">Exportação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requiresInsurance">Requer Seguro *</Label>
                <Select
                  value={formData.requiresInsurance}
                  onValueChange={(value) => handleInputChange("requiresInsurance", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceType">Tipo de Serviço *</Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => handleInputChange("serviceType", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maritime">
                      <span className="flex items-center gap-2">
                        <Ship className="w-4 h-4" />
                        Marítimo
                      </span>
                    </SelectItem>
                    <SelectItem value="air">
                      <span className="flex items-center gap-2">
                        <Plane className="w-4 h-4" />
                        Aéreo
                      </span>
                    </SelectItem>
                    <SelectItem value="road">
                      <span className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Rodoviário
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="merchandiseType">Tipo de Mercadoria *</Label>
                <Input
                  id="merchandiseType"
                  value={formData.merchandiseType}
                  onChange={(e) => handleInputChange("merchandiseType", e.target.value)}
                  required
                  placeholder="Ex: Equipamentos industriais"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="origin">Origem *</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => handleInputChange("origin", e.target.value)}
                  required
                  placeholder="País/Cidade de origem"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destino *</Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => handleInputChange("destination", e.target.value)}
                  required
                  placeholder="País/Cidade de destino"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Peso Aproximado</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  placeholder="Ex: 500 kg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="volume">Volume Aproximado</Label>
                <Input
                  id="volume"
                  value={formData.volume}
                  onChange={(e) => handleInputChange("volume", e.target.value)}
                  placeholder="Ex: 2 m³"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observations">Observações Adicionais</Label>
              <Textarea
                id="observations"
                value={formData.observations}
                onChange={(e) => handleInputChange("observations", e.target.value)}
                placeholder="Informações adicionais sobre a sua carga ou requisitos especiais..."
                rows={4}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              {isSubmitting ? "A enviar..." : "Enviar Solicitação"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestModal;
