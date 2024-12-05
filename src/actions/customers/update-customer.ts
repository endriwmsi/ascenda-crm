"use server";

import { authOptions } from "@/lib/auth";
import { customerSchema } from "@/lib/constants";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type CustomerSchema = z.infer<typeof customerSchema>;

export const updateCustomer = async (
  data: { name: string; email: string; phone: string; notes?: string },
  customerId: string,
) => {
  const session = await getServerSession(authOptions);

  try {
    const user = await db.user.findUnique({
      where: { email: session?.user.email },
    });

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    const company = await db.company.findUnique({
      where: { userId: user.id },
    });

    if (!company) {
      throw new Error("Empresa não encontrada!");
    }

    const existingCustomer = await db.customer.findUnique({
      where: { id: customerId },
    });

    if (!existingCustomer || existingCustomer.companyId !== company.id) {
      throw new Error("Cliente não encontrado ou não pertence à sua empresa!");
    }

    // Atualizar o cliente com os novos dados
    const updatedCustomer = await db.customer.update({
      where: { id: customerId },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        notes: data.notes || null,
      },
    });

    return updatedCustomer;
  } catch (error) {
    console.error("Erro ao editar o cliente:", error);
    throw new Error("Erro ao editar o cliente no banco de dados.");
  } finally {
    revalidatePath("/financial");
  }
};
