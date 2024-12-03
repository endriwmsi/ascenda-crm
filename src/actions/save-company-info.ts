"use server";

import { z } from "zod";
import { db } from "../lib/prisma";
import { companySchema } from "../lib/constants";

type companySchema = z.infer<typeof companySchema>;

export async function saveCompanyInfo(data: companySchema, userEmail: any) {
  try {
    const { companyName, niche, foundationYear, location, mission } = data;

    const user = await db.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const createdCompany = await db.company.create({
      data: {
        userId: user.id,
        companyName,
        niche,
        foundationYear,
        location,
        mission,
      },
    });

    await db.user.update({
      where: { id: user.id },
      data: { isAnswered: true },
    });

    return createdCompany;
  } catch (error) {
    console.error("Erro ao salvar informações da empresa:", error);
    throw new Error("Não foi possível salvar as informações da empresa.");
  }
}
