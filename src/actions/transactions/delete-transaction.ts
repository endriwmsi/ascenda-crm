"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async (id: string) => {
  const session = await getServerSession(authOptions);

  const user = await db.user.findUnique({
    where: { email: session?.user.email },
  });

  const company = await db.company.findUnique({
    where: { userId: user?.id },
  });

  if (!company) {
    throw new Error("Empresa não encontrada!");
  }

  try {
    const transaction = await db.transaction.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Erro ao deletar transação no banco de dados.", error);
    throw new Error("Erro ao deletar transação no banco de dados.");
  } finally {
    revalidatePath("/financial");
  }
};
