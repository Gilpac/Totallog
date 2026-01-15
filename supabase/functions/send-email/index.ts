import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteEmailRequest {
  type: "quote";
  clientType: "individual" | "company";
  name: string;
  phone: string;
  email: string;
  nif: string;
  companyName?: string;
  position?: string;
  serviceType: string;
  merchandiseType: string;
  origin: string;
  destination: string;
  weight: string;
  volume: string;
  observations: string;
}

interface ContactEmailRequest {
  type: "contact";
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type EmailRequest = QuoteEmailRequest | ContactEmailRequest;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    
    const resend = new Resend(RESEND_API_KEY);
    const data: EmailRequest = await req.json();
    const toEmail = "despachos@totallog.ao";
    
    let subject: string;
    let htmlContent: string;

    if (data.type === "quote") {
      const quoteData = data as QuoteEmailRequest;
      subject = `Nova Solicitação de Cotação - ${quoteData.clientType === "individual" ? "Pessoa Singular" : "Empresa"}`;
      
      htmlContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 30px; text-align: center;">
            <h2 style="color: white; margin: 0 0 10px 0; font-size: 24px; font-weight: 700;">TOTALLOG</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 14px; font-style: italic;">logística a todo alcance.</p>
          </div>
          
          <!-- Title Banner -->
          <div style="background: #f97316; padding: 15px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 600;">Nova Solicitação de Cotação</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px; background: #f8f9fa;">
            <div style="background: white; border-radius: 8px; padding: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e3a5f; font-size: 16px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #f97316;">
                Dados do Cliente (${quoteData.clientType === "individual" ? "Pessoa Singular" : "Empresa"})
              </h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                ${quoteData.clientType === "company" ? `
                  <tr><td style="padding: 8px 0; color: #666; width: 140px;">Empresa:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${quoteData.companyName}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">Contacto:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${quoteData.name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">Cargo:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${quoteData.position}</td></tr>
                ` : `
                  <tr><td style="padding: 8px 0; color: #666; width: 140px;">Nome:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${quoteData.name}</td></tr>
                `}
                <tr><td style="padding: 8px 0; color: #666;">Telefone:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${quoteData.phone}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">E-mail:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${quoteData.email}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">NIF:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${quoteData.nif}</td></tr>
              </table>
            </div>
            
            <div style="background: white; border-radius: 8px; padding: 25px; margin-top: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e3a5f; font-size: 16px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #f97316;">
                Detalhes do Serviço
              </h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666; width: 140px;">Tipo de Serviço:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${quoteData.serviceType}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Mercadoria:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${quoteData.merchandiseType}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Origem:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${quoteData.origin}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Destino:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${quoteData.destination}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Peso Aprox.:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${quoteData.weight}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Volume Aprox.:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${quoteData.volume}</td></tr>
              </table>
            </div>
            
            ${quoteData.observations ? `
              <div style="background: white; border-radius: 8px; padding: 25px; margin-top: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #1e3a5f; font-size: 16px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #f97316;">
                  Observações
                </h2>
                <p style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #f97316; margin: 0; color: #333; line-height: 1.6;">
                  ${quoteData.observations}
                </p>
              </div>
            ` : ''}
          </div>
          
          <!-- Footer -->
          <div style="background: #1e3a5f; padding: 25px; text-align: center;">
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 10px 0; font-size: 14px;">TOTALLOG - Logística a Todo Alcance</p>
            <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 12px;">Este email foi enviado automaticamente pelo website totallog.ao</p>
          </div>
        </div>
      `;
    } else {
      const contactData = data as ContactEmailRequest;
      subject = `Nova Mensagem de Contacto - ${contactData.subject}`;
      
      htmlContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 30px; text-align: center;">
            <h2 style="color: white; margin: 0 0 10px 0; font-size: 24px; font-weight: 700;">TOTALLOG</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 14px; font-style: italic;">logística a todo alcance.</p>
          </div>
          
          <!-- Title Banner -->
          <div style="background: #f97316; padding: 15px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 600;">Nova Mensagem de Contacto</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px; background: #f8f9fa;">
            <div style="background: white; border-radius: 8px; padding: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e3a5f; font-size: 16px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #f97316;">
                Dados do Remetente
              </h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666; width: 100px;">Nome:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${contactData.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">E-mail:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${contactData.email}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Telefone:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${contactData.phone}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Assunto:</td><td style="padding: 8px 0; color: #1e3a5f; font-weight: 500;">${contactData.subject}</td></tr>
              </table>
            </div>
            
            <div style="background: white; border-radius: 8px; padding: 25px; margin-top: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e3a5f; font-size: 16px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #f97316;">
                Mensagem
              </h2>
              <p style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #f97316; margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">
                ${contactData.message}
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e3a5f; padding: 25px; text-align: center;">
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 10px 0; font-size: 14px;">TOTALLOG - Logística a Todo Alcance</p>
            <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 12px;">Este email foi enviado automaticamente pelo website totallog.ao</p>
          </div>
        </div>
      `;
    }

    console.log(`Sending email to ${toEmail} with subject: ${subject}`);

    const emailResponse = await resend.emails.send({
      from: "TOTALLOG <no-reply@totallog.ao>",
      to: [toEmail],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
