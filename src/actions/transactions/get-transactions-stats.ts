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

  const weeklyChange =
    lastWeekRevenue > 0
      ? `${Math.round(((weeklyRevenue - lastWeekRevenue) / lastWeekRevenue) * 100)}%`
      : "0%";

  const monthlyChange =
    lastMonthRevenue > 0
      ? `${Math.round(((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)}%`
      : "0%";

  const yearlyChange =
    lastYearRevenue > 0
      ? `${Math.round(((yearlyRevenue - lastYearRevenue) / lastYearRevenue) * 100)}%`
      : "0%";

  return {
    weeklyRevenue,
    monthlyRevenue,
    yearlyRevenue,
    weeklyChange,
    monthlyChange,
    yearlyChange,
  };
};
