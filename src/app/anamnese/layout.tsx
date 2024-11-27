"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAnswered } from "../_actions/is-answered";
import Loader from "../_components/ui/loader";

export default function AnamneseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkStatus = async () => {
      if (status === "unauthenticated") {
        router.push("/auth/login");
        return;
      }

      if (status === "authenticated" && session?.user?.email) {
        try {
          const hasCompleted = await isAnswered({
            userEmail: session.user.email,
          });

          if (hasCompleted) {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Erro ao verificar status de anamnese:", error);
        }
      }
    };

    checkStatus();
  }, [status, session?.user?.email, router]);

  if (status === "loading") {
    return <Loader />;
  }

  return <div className="h-screen w-full">{children}</div>;
}
