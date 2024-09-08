"use client";

import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../components/loader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (status === "unauthenticated") {
        router.push("/auth/login");
      } else if (status === "authenticated") {
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
