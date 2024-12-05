"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const deleteCustomer = async (id: string) => {
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
    const customer = await db.customer.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    throw new Error("Erro ao deletar clientes no banco de dados.");
  } finally {
    revalidatePath("/leads");
  }
};
