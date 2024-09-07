"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const { data } = useSession();
  const handleLoginWithGoogle = () => signIn("google");

  useEffect(() => {
    if (data?.user) {
      router.push("/dashboard");
    }
  }, [data]);

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

      {/* <>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon">
              <LogInIcon />
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[90%]">
            <DialogHeader>
              <DialogTitle>Faça login na plataforma</DialogTitle>

              <DialogDescription>
                Conecte-se usando usa conta Google.
              </DialogDescription>
            </DialogHeader>

            
          </DialogContent>
        </Dialog>
      </>  */}
    </div>
  );
};

export default Login;
