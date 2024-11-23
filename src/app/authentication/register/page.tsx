// "use client";

// import { Button } from "@/app/_components/ui/button";
// import { signIn } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";

// const Login = () => {
//   const handleLoginWithGoogle = () =>
//     signIn("google", { callbackUrl: "/dashboard" });

//   return (
//     <div>
//       <header className="flex flex-col items-center gap-4 text-center">
//         <h1 className="text-white-900 text-2xl font-bold tracking-[-1px]">
//           Entre em sua conta
//         </h1>

//         <Button
//           variant="outline"
//           className="w-full gap-1 font-bold"
//           onClick={handleLoginWithGoogle}
//         >
//           <Image
//             src="/images/google.svg"
//             width={18}
//             height={18}
//             alt="Fazer login com o Google"
//           />
//           Google
//         </Button>

//         <p className="space-x-2">
//           <span className="tracking-[-0.5px] text-gray-700">
//             Novo por aqui?
//           </span>

//           <Link
//             href="/auth/register"
//             className="font-medium tracking-[-0.5px] text-teal-900"
//           >
//             Crie uma conta
//           </Link>
//         </p>
//       </header>
//     </div>
//   );
// };

// export default Login;

"use client";

import { Button } from "@/app/_components/ui/button";
import { Icons } from "@/app/_components/ui/icons";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { cn } from "@/app/_lib/utils";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const Login = ({ className, ...props }: UserAuthFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginWithGoogle = () =>
    signIn("google", { callbackUrl: "/dashboard" });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Crie sua conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Insira seu e-mail abaixo para criar sua conta
          </p>
        </div>

        <div className={cn("grid gap-6", className)} {...props}>
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Entrar com e-mail
              </Button>
            </div>
          </form>
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
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}{" "}
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
            Politica de Privacidade.
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
