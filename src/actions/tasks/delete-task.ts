"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const deleteTask = async (id: string) => {
  const session = await getServerSession(authOptions);

  const user = await db.user.findUnique({
    where: { email: session?.user.email },
  });

  if (!user) {
    throw new Error("Usuário não encontrado!");
  }

  try {
    const transaction = await db.task.delete({
      where: {
        id: id,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Erro ao deletar taréfa", error);
    throw new Error("Erro ao deletar taréfa no banco de dados.");
  } finally {
    revalidatePath("/dashboard");
  }
};
