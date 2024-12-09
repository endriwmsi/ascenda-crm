"use server";

import { db } from "@/lib/prisma";
import { TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateTaskStatus = async (taskId: string) => {
  const task = await db.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  let newStatus: TaskStatus | undefined;

  if (task.status === "PENDING") {
    newStatus = "IN_PROGRESS";
  } else if (task.status === "IN_PROGRESS") {
    newStatus = "COMPLETED";
  } else {
    throw new Error("Invalid task status");
  }

  try {
    await db.task.update({
      where: { id: taskId },
      data: {
        status: newStatus,
      },
    });

    revalidatePath("/dashboard");
    return newStatus;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw new Error("Error updating task status in the database.");
  }
};
