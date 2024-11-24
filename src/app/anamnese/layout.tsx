"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../_components/ui/loader";
import { checkAnamnesis } from "../_actions/check-anamnesis";

export default function AnamneseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const checkAnamnesisStatus = async () => {
    if (data) {
      try {
        const hasCompletedAnamnesis = await checkAnamnesis({
          userEmail: data.user!.email ?? undefined, // Ajusta null para undefined
        });

        if (hasCompletedAnamnesis) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Erro ao buscar status de anamnese:", error);
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (status === "unauthenticated") {
        router.push("/auth/login");
      } else if (status === "authenticated") {
        checkAnamnesisStatus();

        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [status, router]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex h-screen p-4">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
