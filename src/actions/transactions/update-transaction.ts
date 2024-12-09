"use server";

import { z } from "zod";
import { db } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { financeSchema } from "@/lib/schemas";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

type financeSchema = z.infer<typeof financeSchema>;

export const updateTransaction = async (
  data: financeSchema,
  transactionId: string,
) => {
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

    const transaction = await db.transaction.update({
      where: { id: transactionId },
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
    console.error("Erro ao alterar a transação:", error);
    throw new Error("Erro ao alterar a transação no banco de dados.");
  } finally {
    revalidatePath("/financial");
  }
};
