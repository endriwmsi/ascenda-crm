"use server";

import { db } from "../_lib/prisma";

interface CheckAnamnesisRequest {
  userEmail: string | null | undefined;
}

export const checkAnamnesis = async (params: CheckAnamnesisRequest) => {
  const user = await db.user.findUnique({
    where: {
      email: params.userEmail,
    },
    select: {
      hasCompletedAnamnesis: true,
    },
  });

  if (user) {
    return user.hasCompletedAnamnesis;
  } else {
    throw new Error("Usuário não encontrado");
  }
};
