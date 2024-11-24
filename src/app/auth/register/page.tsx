"use client";

import { Button } from "@/app/_components/ui/button";
import { Icons } from "@/app/_components/ui/icons";
import Link from "next/link";
import RegisterForm from "./register-form";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  const handleLoginWithGoogle = () =>
    signIn("google", { callbackUrl: "/dashboard" });

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Crie sua conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Insira seu e-mail abaixo para criar sua conta ou
            <br />
            <Link
              href="/auth/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Faça login
            </Link>{" "}
          </p>
        </div>

        <div className="grid gap-6">
          <RegisterForm />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continuar com
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            onClick={handleLoginWithGoogle}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          Clicando em continuar, você concorda com nossos{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Termos de serviço
          </Link>{" "}
          e{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Politica de Privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
