"use client";

import Header from "../_components/header";
import Sidebar from "../_components/sidebar";
import Loader from "../_components/loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAnamnesis } from "../_actions/check-anamnesis";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  const checkAnamnesisStatus = async () => {
    if (data) {
      try {
        const hasCompletedAnamnesis = await checkAnamnesis({
          userEmail: data.user!.email,
        });

        if (hasCompletedAnamnesis) {
          router.push("/dashboard");
        }

        router.push("/anamnese");
      } catch (error) {
        console.error("Erro ao buscar status de anamnese:", error);
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (status === "unauthenticated") {
        router.push("/auth/login");
      }

      checkAnamnesisStatus();
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [status]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header />
      <div className="flex h-screen p-4">
        <Sidebar />

        <div className="w-full overflow-x-auto rounded-lg bg-card p-4 shadow-lg">
          <div className="sm:h-[calc(99vh-60px)]">
            <div className="h-[calc(100vh - 120px)] relative mx-auto flex w-full justify-center">
              <div className="w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
