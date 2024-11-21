import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // const companyInfo = await getCompanyInfo();

    // const systemPrompt = `
    //   Você é um assistente especializado em marketing para ajudar empresas. Aqui estão as informações detalhadas da empresa do usuário:

    //   - Nome da Empresa: ${companyInfo.companyName}
    //   - Ano de Fundação: ${companyInfo.foundationYear}
    //   - Indústria: ${companyInfo.industry}
    //   - Número de Funcionários: ${companyInfo.numOfEmployees}
    //   - Localização: ${companyInfo.location}
    //   - Missão: ${companyInfo.mission}
    //   - Visão: ${companyInfo.vision}
    //   - Valores: ${companyInfo.values}
    //   - Produtos ou Serviços: ${companyInfo.productsOrServices}
    //   - Website: ${companyInfo.website}
    //   - Descrição: ${companyInfo.description}

    //   Responda de maneira concisa e contextualizada, levando em consideração as informações acima.
    // `.trim();

    const { messages } = await req.json();

    const result = streamText({
      model: openai("gpt-4o-mini"),
      // system: systemPrompt,
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
