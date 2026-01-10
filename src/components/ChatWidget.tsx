import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Olá! 👋 Bem-vindo à TOTALLOG. Sou o assistente virtual com IA e estou aqui para ajudar. Como posso auxiliá-lo hoje?",
    isBot: true,
  },
];

const quickResponses = [
  "Quais serviços oferecem?",
  "Como solicitar um orçamento?",
  "Horário de funcionamento",
  "Falar com um consultor",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamChat = async (userMessages: { role: string; content: string }[]) => {
    const response = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 429) {
        throw new Error(errorData.error || "Limite de requisições excedido. Tente novamente mais tarde.");
      }
      if (response.status === 402) {
        throw new Error(errorData.error || "Créditos insuficientes.");
      }
      throw new Error(errorData.error || "Erro ao conectar com o assistente.");
    }

    if (!response.body) {
      throw new Error("Resposta vazia do servidor.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.isBot && last.id === -1) {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, text: assistantContent } : m
                );
              }
              return [...prev, { id: -1, text: assistantContent, isBot: true }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Finalize the message with a proper ID
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.id === -1) {
        return prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, id: Date.now() } : m
        );
      }
      return prev;
    });
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isBot: false,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Build conversation history for AI
    const conversationHistory = messages
      .filter((m) => m.id !== 1) // Exclude initial greeting
      .map((m) => ({
        role: m.isBot ? "assistant" : "user",
        content: m.text,
      }));

    conversationHistory.push({ role: "user", content: messageText });

    try {
      await streamChat(conversationHistory);
    } catch (error) {
      console.error("Chat error:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao enviar mensagem");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Desculpe, ocorreu um erro. Por favor, tente novamente ou entre em contato pelo telefone +244 923 102 227.",
          isBot: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
        aria-label="Abrir chat"
      >
        <MessageCircle className="w-7 h-7 text-secondary-foreground" />
        <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-25" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden transition-all duration-500 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-primary-foreground">
                Assistente TOTALLOG
              </h4>
              <p className="text-xs text-primary-foreground/70 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Powered by IA
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
            aria-label="Fechar chat"
          >
            <X className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  message.isBot
                    ? "bg-card border border-border rounded-tl-none"
                    : "bg-gradient-to-r from-secondary to-accent text-secondary-foreground rounded-tr-none"
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.isBot === false && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-2xl rounded-tl-none p-3">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Responses */}
        <div className="px-4 py-2 border-t border-border bg-card">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {quickResponses.map((response, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(response)}
                disabled={isLoading}
                className="flex-shrink-0 px-3 py-1.5 text-xs font-medium bg-muted hover:bg-secondary/20 text-muted-foreground hover:text-secondary rounded-full transition-colors disabled:opacity-50"
              >
                {response}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card flex gap-2">
          <Input
            placeholder="Escreva a sua mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="btn-gradient px-4"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
