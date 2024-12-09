"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getCustomers = async () => {
  const session = await getServerSession(authOptions);

  const user = await db.user.findUnique({
    where: { email: session?.user.email },
  });

  const company = await db.company.findUnique({
    where: {
      userId: user?.id,
    },
  });

  if (!company) {
    throw new Error("Empresa não encontrada!");
  }

  const customers = await db.customer.findMany({
    where: { companyId: company.id },
  });

  return customers;
};
