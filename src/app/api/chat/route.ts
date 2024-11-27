import { getCompanyInfo } from "@/app/_actions/get-company-info";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const companyInfo = await getCompanyInfo();

    const systemPrompt = `
      Você é um assistente especializado em marketing para ajudar empresas. Aqui estão as informações detalhadas da empresa do usuário:

      - Nome da Empresa: ${companyInfo.companyName}
      - Ano de Fundação: ${companyInfo.foundationYear}
      - Indústria: ${companyInfo.niche}
      - Localização: ${companyInfo.location}
      - Missão: ${companyInfo.mission}

      Responda de maneira concisa e contextualizada, levando em consideração as informações acima.
    `.trim();

    const { messages } = await request.json();

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Erro ao buscar informações da empresa:", error);
    return new Response("Erro interno ao processar a solicitação.", {
      status: 500,
    });
  }
}
