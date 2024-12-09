"use server";

import { authOptions } from "@/lib/auth";
import { customerSchema } from "@/lib/schemas";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createCustomer = async (data: z.infer<typeof customerSchema>) => {
  const session = await getServerSession(authOptions);

  try {
    const user = await db.user.findUnique({
      where: { email: session?.user.email },
    });

    const company = await db.company.findUnique({
      where: { userId: user?.id },
    });

    if (!company) {
      throw new Error("Empresa não encontrada!");
    }

    const customer = await db.customer.create({
      data: {
        companyId: company.id,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        status: data.status,
        birthDate: data.birthDate,
        description: data.description,
      },
    });

    revalidatePath("/leads");

    return customer;
  } catch (error) {
    console.error("Erro ao salvar o cliente:", error);
    throw new Error("Erro ao salvar o cliente no banco de dados.");
  }
};
