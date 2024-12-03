"use server";

import { db } from "../lib/prisma";

interface IsAnsweredParams {
  userEmail?: string;
}

export const isAnswered = async ({
  userEmail,
}: IsAnsweredParams): Promise<boolean> => {
  if (!userEmail) {
    console.error("Email do usuário ausente");
    return false;
  }

  try {
    const user = await db.user.findUnique({
      where: { email: userEmail },
      select: { isAnswered: true },
    });

    return user?.isAnswered ?? false;
  } catch (error) {
    console.error("Erro ao verificar status de resposta:", error);
    return false;
  }
};
