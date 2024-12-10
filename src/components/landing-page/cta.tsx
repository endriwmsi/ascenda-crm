"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cta() {
  const { resolvedTheme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState<string | null>(null);

  useEffect(() => {
    if (resolvedTheme) {
      setCurrentTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  // Garantir que a faixa seja exibida corretamente apenas após o tema ser resolvido
  const stripesImage =
    currentTheme === "dark"
      ? "/images/stripes.svg"
      : "/images/stripes-dark.svg";

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl dark:bg-zinc-950"
          data-aos="zoom-y-out"
        >
          {/* Glow */}
          <div
            className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
            aria-hidden="true"
          >
            <div className="h-56 w-[480px] rounded-full border-[20px] border-zinc-500 blur-3xl" />
          </div>
          {/* Stripes illustration */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform"
            aria-hidden="true"
          >
            <Image
              className="max-w-none"
              src={stripesImage}
              width={768}
              height={432}
              alt="Stripes"
            />
          </div>
          <div className="px-4 py-12 md:px-12 md:py-20">
            <h2 className="mb-6 border-y text-3xl font-bold text-foreground [border-image:linear-gradient(to_right,transparent,theme(colors.slate.700/.7),transparent)1] md:mb-12 md:text-4xl">
              Impulsione o crescimento do seu negócio com simplicidade.
              Experimente agora!
            </h2>
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <Button
                variant="default"
                className="shadow-[0px_0px_12px_#575757] dark:shadow-white"
              >
                <Link href={"/auth/login"}>Começar agora</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
