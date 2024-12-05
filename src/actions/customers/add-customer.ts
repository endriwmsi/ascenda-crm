"use server";

import { customerSchema } from "@/lib/constants";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type customerSchema = z.infer<typeof customerSchema>;

export const createCustomer = async (
  data: customerSchema,
  userEmail: string,
) => {
  try {
    const user = await db.user.findUnique({
      where: { email: userEmail },
    });

    const company = await db.company.findUnique({
      where: { userId: user?.id },
    });

    if (!company) {
      throw new Error("Empresa não encontrada!");
    }

    const customer = await db.customer.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        notes: data.notes || null,
        companyId: company.id,
      },
    });

    return customer;
  } catch (error) {
    console.error("Erro ao salvar o cliente:", error);
    throw new Error("Erro ao salvar o cliente no banco de dados.");
  } finally {
    revalidatePath("/leads");
  }
};
