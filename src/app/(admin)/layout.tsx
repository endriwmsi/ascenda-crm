"use client";

import Loader from "../../components/ui/loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAnswered } from "../../actions/is-answered";
import AdminPanelLayout from "../../components/admin-panel/admin-panel-layout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  const isAnsweredStatus = async () => {
    if (data) {
      try {
        const hasDoneCompanyInfo = await isAnswered({
          userEmail: data.user!.email ?? undefined,
        });

        if (!hasDoneCompanyInfo) {
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

      isAnsweredStatus();
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
