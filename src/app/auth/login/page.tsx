"use client";

import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLoginWithGoogle = () =>
    signIn("google", { callbackUrl: "/dashboard" });

  // Redirecionar após login bem-sucedido
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard"); // ou a página que desejar
    }
  }, [status, router]);

  // Mostrar loading enquanto verifica o status da sessão
  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-white-900 text-2xl font-bold tracking-[-1px]">
          Entre em sua conta
        </h1>

        <Button
          variant="outline"
          className="gap-1 font-bold"
          onClick={handleLoginWithGoogle}
        >
          <Image
            src="/images/google.svg"
            width={18}
            height={18}
            alt="Fazer login com o Google"
          />
          Google
        </Button>

        <p className="space-x-2">
          <span className="tracking-[-0.5px] text-gray-700">
            Novo por aqui?
          </span>

          <Link
            href="/auth/register"
            className="font-medium tracking-[-0.5px] text-teal-900"
          >
            Crie uma conta
          </Link>
        </p>
      </header>
    </div>
  );
};

export default Login;
