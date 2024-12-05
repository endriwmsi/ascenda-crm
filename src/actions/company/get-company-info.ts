import { db } from "@/lib/prisma";
import { getUserEmail } from "@/actions/get-user-email";

export async function getCompanyInfo() {
  const userEmail = await getUserEmail();

  if (!userEmail) {
    throw new Error("Usuário não autenticado ou email ausente.");
  }

  const user = await db.user.findUnique({
    where: { email: userEmail },
  });

  const company = await db.company.findUnique({
    where: { userId: user?.id },
  });

  if (!company) {
    throw new Error("Nenhuma empresa encontrada para este usuário.");
  }

  return company;
}
