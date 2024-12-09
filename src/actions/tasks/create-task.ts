"use server";

import { z } from "zod";
import { db } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { taskSchemma } from "@/lib/schemas";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const createTask = async (data: z.infer<typeof taskSchemma>) => {
  const session = await getServerSession(authOptions);

  const user = await db.user.findUnique({
    where: { email: session?.user.email },
  });

  if (!user) {
    throw new Error("Usuário não encontrada!");
  }

  try {
    const task = await db.task.create({
      data: {
        userId: user.id,
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        category: data.category,
        dueDate: data.dueDate,
      },
    });

    revalidatePath("/dashboard");

    return task;
  } catch (error) {
    console.error("Erro ao salvar o cliente:", error);
    throw new Error("Erro ao salvar o cliente no banco de dados.");
  }
};
