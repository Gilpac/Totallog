import { MessageCircle } from "lucide-react";
import { useChatContext } from "@/contexts/ChatContext";

const WhatsAppButton = () => {
  const { isOpen: isChatOpen } = useChatContext();
  const whatsappNumber = "+244923102227";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, "")}`;

  if (isChatOpen) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-24 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Contactar via WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
    </a>
  );
};

export default WhatsAppButton;
