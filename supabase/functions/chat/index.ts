import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `Você é o assistente virtual da TOTALLOG, uma empresa especializada em soluções completas de importação, exportação e logística.

SOBRE A EMPRESA:
A TOTALLOG oferece serviços eficientes, seguros e sustentáveis, com foco na qualidade, transparência e excelência em cada etapa do processo logístico.

SERVIÇOS OFERECIDOS:

1. CARGA AÉREA (Air Cargo):
- Transporte Aéreo Internacional e Nacional
- Cargas Especiais
- LCL (Less than Container Load - Grupagem)
- Serviços Door-to-Door
- Gestão Aduaneira

2. CARGA MARÍTIMA (Maritime Cargo):
- FCL (Full Container Load)
- LCL (Less than Container Load - Grupagem)
- Transporte Break Bulk
- Serviços Door-to-Door
- Desembaraço Aduaneiro
- Seguro de Carga

3. TRANSPORTE RODOVIÁRIO (Road Transportation):
- Carga Completa (FTL - Full Truck Load)
- Carga Fracionada (LTL - Less than Truck Load)
- Transporte de Cargas Especiais
- Trânsito e Transbordo Aduaneiro
- Cabotagem

4. DESPACHO ADUANEIRO:
- Gestão completa de processos
- Precisão, conformidade e segurança
- Tratamento profissional de documentos

CONTATOS:
- Angola: +244 923 102 227 / +244 923 102 228
- Portugal: +351 936 678 136
- Email: despachos@totallog.ao

ENDEREÇOS:
- Angola: Rua Rainha Nginga, Prédio da Suave 3º Andar - Luanda
- Portugal: Avenida do Município da Ribeira Grande - Lote 121 - 2350-088 - Torres Novas

HORÁRIO DE FUNCIONAMENTO:
- Segunda a Sexta: 08h às 17h
- Sábado: 8h às 13h

MISSÃO: Prestar serviços de excelência trazendo valor acrescentado aos clientes.
VISÃO: Ser um parceiro estratégico e de confiança nas áreas de Importação e Exportação.

VALORES: Atitude, Compromisso, Confiança, Inovação, Flexibilidade, Disponibilidade, Sustentabilidade.

INSTRUÇÕES:
- Responda sempre em português de forma clara, amigável e profissional
- Seja conciso mas informativo
- Quando não souber responder algo específico, direcione para os contatos da empresa
- Use emojis com moderação para tornar a conversa mais agradável
- Ajude os visitantes a entender os serviços e como solicitar orçamentos`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requisições excedido. Por favor, tente novamente mais tarde." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes. Entre em contato com o suporte." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Erro ao processar a solicitação." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
