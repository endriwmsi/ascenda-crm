import { z } from "zod";

export const companyInfoSchema = z.object({
  companyName: z.string().min(1, "Nome da empresa é obrigatório"),
  foundationYear: z
    .string()
    .min(1, "Ano de fundação é obrigatório")
    .transform((value) => parseInt(value, 10)),
  numOfEmployees: z
    .string()
    .min(1, "Número de funcionários é obrigatório")
    .transform((value) => parseInt(value, 10)),
  industry: z.string().min(1, "Indústria é obrigatória"),
  location: z.string().min(1, "Localização é obrigatória"),
  mission: z.string().min(1, "Missão é obrigatória"),
  vision: z.string().min(1, "Visão é obrigatória"),
  values: z.string().min(1, "Valores são obrigatórios"),
  productsOrServices: z
    .string()
    .min(1, "Produtos ou serviços são obrigatórios"),
  website: z.string().url("Website inválido"),
  description: z.string().min(1, "Descrição é obrigatória"),
});
