"use server";

import { authOptions } from "@/lib/auth";
import { financeSchema } from "@/lib/schemas";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type financeSchema = z.infer<typeof financeSchema>;

export const createTransaction = async (data: financeSchema) => {
  const session = await getServerSession(authOptions);

  try {
    const user = await db.user.findUnique({
      where: { email: session?.user?.email },
    });

    const company = await db.company.findUnique({
      where: { userId: user?.id },
    });

    if (!company) {
      throw new Error("Empresa não encontrada!");
    }

    const transaction = await db.transaction.create({
      data: {
        name: data.name,
        amount: data.amount,
        description: data.description ?? "",
        date: data.date,
        companyId: company.id,
        type: data.type,
      },
    });

    return transaction;
  } catch (error) {
    console.error("Erro ao salvar o cliente:", error);
    throw new Error("Erro ao salvar o cliente no banco de dados.");
  } finally {
    revalidatePath("/financial");
  }
};
