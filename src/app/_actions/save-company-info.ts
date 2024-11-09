"use server";

import { db } from "../_lib/prisma";

export async function saveCompanyInfo(userEmail: string, companyInfo: string) {
  try {
    const updatedUser = await db.user.update({
      where: { email: userEmail },
      data: {
        companyInfo,
        hasCompletedAnamnesis: true,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Erro ao salvar as informações da empresa:", error);
    throw new Error("Não foi possível salvar as informações da empresa.");
  }
}
