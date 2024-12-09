"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getTasks = async () => {
  const session = await getServerSession(authOptions);

  const user = await db.user.findUnique({
    where: { email: session?.user.email },
  });

  if (!user) {
    throw new Error("Usuário não encontrado!");
  }

  try {
    const tasks = await db.task.findMany({
      where: { userId: user.id },
    });

    return tasks;
  } catch (e) {
    console.error("Erro ao buscar as tarefas:", e);
    throw new Error("Erro ao buscar as tarefas no banco de dados.");
  }
};
