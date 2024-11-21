import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getUserEmail(): Promise<string | null> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    console.error("Usuário não autenticado ou email ausente.");
    return null;
  }

  return session.user.email;
}
