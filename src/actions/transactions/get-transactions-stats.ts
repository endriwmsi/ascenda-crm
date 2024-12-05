"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getTransactionStats = async () => {
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

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const transactions = await db.transaction.findMany({
    where: {
      companyId: company.id,
      date: {
        gte: startOfYear,
      },
    },
  });

  const calculateNetRevenue = (transactions: any[]) =>
    transactions.reduce((sum, t) => {
      return t.type === "INCOME" ? sum + t.amount : sum - t.amount;
    }, 0);

  // Cálculos de receita
  const weeklyRevenue = calculateNetRevenue(
    transactions.filter((t) => t.date >= startOfWeek),
  );

  const monthlyRevenue = calculateNetRevenue(
    transactions.filter((t) => t.date >= startOfMonth),
  );

  const yearlyRevenue = calculateNetRevenue(transactions);

  // Comparação com períodos anteriores
  const lastWeekStart = new Date(startOfWeek);
  lastWeekStart.setDate(startOfWeek.getDate() - 7);

  const lastMonthStart = new Date(startOfMonth);
  lastMonthStart.setMonth(startOfMonth.getMonth() - 1);

  const lastYearStart = new Date(startOfYear);
  lastYearStart.setFullYear(startOfYear.getFullYear() - 1);

  const lastWeekRevenue = calculateNetRevenue(
    transactions.filter((t) => t.date >= lastWeekStart && t.date < startOfWeek),
  );

  const lastMonthRevenue = calculateNetRevenue(
    transactions.filter(
      (t) => t.date >= lastMonthStart && t.date < startOfMonth,
    ),
  );

  const lastYearRevenue = calculateNetRevenue(
    transactions.filter((t) => t.date >= lastYearStart && t.date < startOfYear),
  );

  // Função para calcular a mudança percentual
  const formatPercentageChange = (
    current: number,
    previous: number,
  ): string => {
    if (previous === 0) return "0%";

    const change = ((current - previous) / previous) * 100;
    const roundedChange = Math.round(change);

    return `${roundedChange > 0 ? "+" : ""}${roundedChange}%`;
  };

  const weeklyChange = formatPercentageChange(weeklyRevenue, lastWeekRevenue);
  const monthlyChange = formatPercentageChange(
    monthlyRevenue,
    lastMonthRevenue,
  );
  const yearlyChange = formatPercentageChange(yearlyRevenue, lastYearRevenue);

  return {
    weeklyRevenue,
    monthlyRevenue,
    yearlyRevenue,
    weeklyChange,
    monthlyChange,
    yearlyChange,
  };
};
