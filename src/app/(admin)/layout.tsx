"use client";

import Loader from "../../components/ui/loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAnswered } from "../../actions/is-answered";
import AdminPanelLayout from "../../components/admin-panel/admin-panel-layout";

const REDIRECT_PATHS = {
  login: "/auth/login",
  companyInfo: "/company-info",
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      if (status === "loading") return;

      if (status === "unauthenticated") {
        router.push(REDIRECT_PATHS.login);
        return;
      }

      if (status === "authenticated" && data?.user?.email) {
        try {
          const hasDoneCompanyInfo = await isAnswered({
            userEmail: data.user.email,
          });

          if (!hasDoneCompanyInfo) {
            router.push(REDIRECT_PATHS.companyInfo);
            return;
          }
        } catch (error) {
          console.error("Erro ao buscar status de anamnese:", error);
        }
      }

      setIsLoading(false);
    };

    checkSessionAndRedirect();
  }, [status, data, router]);

  if (isLoading) {
    return <Loader />;
  }

  return <AdminPanelLayout>{children}</AdminPanelLayout>;
};

export default DashboardLayout;
