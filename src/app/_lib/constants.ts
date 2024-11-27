import { z } from "zod";

export const companySchema = z.object({
  companyName: z.string().min(3, "Nome da empresa é obrigatório."),
  foundationYear: z.number().min(3, "Ano de fundação é obrigatório."),
  niche: z.string().min(3, "O nicho é obrigatório."),
  location: z.string().min(2, "A Localização da sua empresa é obrigatória."),
  mission: z.string().min(50, "Escreva um pouco sobre a sua empresa."),
});
