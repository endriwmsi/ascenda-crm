"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, createContext, ReactNode } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

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
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
