"use client";

import Loader from "../_components/ui/loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAnamnesis } from "../_actions/is-answered";
import AdminPanelLayout from "../_components/admin-panel/admin-panel-layout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  const checkAnamnesisStatus = async () => {
    if (data) {
      try {
        const hasCompletedAnamnesis = await checkAnamnesis({
          userEmail: data.user!.email ?? undefined, // Ajusta null para undefined
        });

        if (!hasCompletedAnamnesis) {
          router.push("/anamnese");
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
      }

      console.log(status);

      checkAnamnesisStatus();
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [status]);

  if (isLoading) {
    return <Loader />;
  }

  return <AdminPanelLayout>{children}</AdminPanelLayout>;
};

export default DashboardLayout;
