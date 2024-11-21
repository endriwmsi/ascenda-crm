"use server";

import { z } from "zod";
import { companyInfoSchema } from "../_lib/company-info-schema";
import { db } from "../_lib/prisma";

// Define o tipo inferido a partir do esquema de validação
type CompanyInfo = z.infer<typeof companyInfoSchema>;

export async function saveCompanyInfo(data: CompanyInfo, userEmail: any) {
  try {
    const {
      companyName,
      foundationYear,
      industry,
      numOfEmployees,
      location,
      mission,
      vision,
      values,
      productsOrServices,
      website,
      description,
    } = data;

    // Localiza o usuário pelo email
    const user = await db.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    // Atualiza ou cria os dados da empresa associada ao usuário
    const updatedCompany = await db.company.upsert({
      where: { userId: user.id },
      update: {
        companyName,
        foundationYear,
        industry,
        numOfEmployees,
        location,
        mission,
        vision,
        values,
        productsOrServices,
        website,
        description,
      },
      create: {
        userId: user.id,
        companyName,
        foundationYear,
        industry,
        numOfEmployees,
        location,
        mission,
        vision,
        values,
        productsOrServices,
        website,
        description,
      },
    });

    // Atualiza o campo `hasCompletedAnamnesis` no usuário
    await db.user.update({
      where: { id: user.id },
      data: { hasCompletedAnamnesis: true },
    });

    return updatedCompany;
  } catch (error) {
    console.error("Erro ao salvar informações da empresa:", error);
    throw new Error("Não foi possível salvar as informações da empresa.");
  }
}
