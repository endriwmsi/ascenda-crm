import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email().min(2, {
    message: "Você deve fornecer um e-mail válido.",
  }),
  name: z.string().min(2, {
    message: "O Nome deve ter pelo menos 6 caracteres.",
  }),
  password: z.string().min(8, {
    message: "A senha deve ter pelo menos 8 caracteres.",
  }),
});

export const loginSchema = z.object({
  email: z.string().email("Você deve inserir um e-mail válido."),
  password: z.string().min(8, {
    message: "A senha deve ter pelo menos 8 caracteres.",
  }),
});

export const companySchema = z.object({
  companyName: z.string().min(3, "Nome da empresa é obrigatório."),
  foundationYear: z.number().min(3, "Ano de fundação é obrigatório."),
  niche: z.string().min(3, "O nicho é obrigatório."),
  location: z.string().min(2, "A Localização da sua empresa é obrigatória."),
  mission: z.string().min(50, "Escreva um pouco sobre a sua empresa."),
});

export const customerSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "O Email é obrigatório" }),
  phoneNumber: z.string({ message: "O Telefone é obrigatório" }),
  status: z.enum(["ACTIVE", "INACTIVE"], { message: "Status é obrigatório" }),
  description: z.string().min(1, { message: "A Descrição é obrigatória" }),
  birthDate: z.date({ message: "Data é obrigatória" }),
});

export const financeSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  amount: z.number().min(1, { message: "Valor é obrigatório" }),
  description: z.string().optional(),
  type: z.enum(["INCOME", "OUTCOME"], { message: "Tipo é obrigatório" }),
  date: z.date({ message: "Data é obrigatória" }),
});

export const taskSchemma = z.object({
  title: z.string().min(1, { message: "Titulo é obrigatório" }),
  description: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"], {
    message: "Status é obrigatório",
  }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"], {
    message: "Prioridade é obrigatória",
  }),
  category: z.string().optional(),
  dueDate: z.date({ message: "Data é obrigatória" }),
});
