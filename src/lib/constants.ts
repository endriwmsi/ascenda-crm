import { z } from "zod";

export const companySchema = z.object({
  companyName: z.string().min(3, "Nome da empresa é obrigatório."),
  foundationYear: z.number().min(3, "Ano de fundação é obrigatório."),
  niche: z.string().min(3, "O nicho é obrigatório."),
  location: z.string().min(2, "A Localização da sua empresa é obrigatória."),
  mission: z.string().min(50, "Escreva um pouco sobre a sua empresa."),
});

export const customerSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email().min(1, { message: "Email é obrigatório" }),
  phone: z
    .string()
    .min(13, { message: "Telefone inválido" })
    .max(13, { message: "Telefone inválido" }),
  notes: z.string().optional(),
});

export const financeSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  amount: z.number().min(1, { message: "Valor é obrigatório" }),
  description: z.string().optional(),
  type: z.enum(["INCOME", "OUTCOME"], { message: "Tipo é obrigatório" }),
  date: z.date({ message: "Data é obrigatória" }),
});
