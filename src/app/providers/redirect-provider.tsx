"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, createContext, ReactNode } from "react";

interface RedirectProviderProps {
  isAuthenticated: boolean;
}

const Provider = createContext<RedirectProviderProps | undefined>(undefined);

export const RedirectProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = !!session;

  useEffect(() => {
    if (status !== "authenticated" && pathname.includes("/dashboard")) {
      router.push("/");
    }

    if (status === "authenticated" && pathname === "/auth/login") {
      router.push("/dashboard");
    }
  }, [status, router, pathname]);

  return (
    <Provider.Provider value={{ isAuthenticated }}>
      {children}
    </Provider.Provider>
  );
};
