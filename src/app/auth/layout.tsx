"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import bgImage from "./../../../public/images/abstract.jpg";
import AppLogo from "@/components/ui/app-logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex h-full w-full flex-col items-center justify-center gap-16 lg:w-1/2">
        <div className="w-full max-w-[504px] px-8">{children}</div>
      </div>

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex lg:w-1/2">
        <div
          className="absolute inset-0 bg-zinc-900"
          style={{
            backgroundImage: `url(${bgImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-20 flex items-center justify-end text-lg font-medium">
          <AppLogo />
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Essa plataforma simplificou meu processo de gerenciamento
              de estratégias de marketing do meu negócio, basicamente me deixou
              respirar ar fresco.&rdquo;
            </p>
            <footer className="text-sm">Valéria Cunha</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
