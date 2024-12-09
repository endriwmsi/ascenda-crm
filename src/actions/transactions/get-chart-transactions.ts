"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getChartTransactions = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Usuário não autenticado!");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("Usuário não encontrado!");
  }

  const company = await db.company.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!company) {
    throw new Error("Empresa não encontrada!");
  }

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const transactions = await db.transaction.findMany({
    where: {
      companyId: company.id,
      date: {
        gte: startOfYear,
      },
    },
  });

  // Pré-popular dados para todos os meses do ano atual
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("pt-BR", { month: "short" }),
    incomeCount: 0,
    outcomeCount: 0,
  }));

  // Agregar transações por tipo e mês
  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    if (transactionDate.getFullYear() === now.getFullYear()) {
      const monthIndex = transactionDate.getMonth();

      if (transaction.type === "INCOME") {
        monthlyData[monthIndex].incomeCount += 1;
      } else if (transaction.type === "OUTCOME") {
        monthlyData[monthIndex].outcomeCount += 1;
      }
    }
  });

  // Filtrar apenas os meses que possuem transações
  const filteredMonthlyData = monthlyData.filter(
    (data) => data.incomeCount > 0 || data.outcomeCount > 0,
  );

  return filteredMonthlyData;
};
