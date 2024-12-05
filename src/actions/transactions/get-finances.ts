"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getFinances = async () => {
  const session = await getServerSession(authOptions);

  const user = await db.user.findUnique({
    where: { email: session?.user?.email },
  });

  const company = await db.company.findUnique({
    where: {
      userId: user?.id,
    },
  });

  if (!company) {
    throw new Error("Empresa não encontrada!");
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { companyId: company.id },
    });

    return transactions;
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    throw new Error("Erro ao buscar as transações no banco de dados.");
  }
};
