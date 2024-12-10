import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PageIllustration() {
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
    <>
      {/* Stripes illustration */}
      <div
        className="pointer-events-none absolute left-1/2 top-12 -z-10 -translate-x-1/2 transform sm:top-0"
        aria-hidden="true"
      >
        <Image
          src={stripesImage}
          width={768}
          height={300}
          alt="Stripes"
          className="h-auto w-auto text-primary"
          priority
        />
      </div>
      {/* Circles */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 ml-[580px] hidden -translate-x-1/2 sm:block"
        aria-hidden="true"
      >
        <div className="hidden h-80 w-80 rounded-full bg-gradient-to-tr from-zinc-500 opacity-50 blur-[160px] sm:block" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-[420px] ml-[380px] hidden -translate-x-1/2 sm:block"
        aria-hidden="true"
      >
        <div className="hidden h-80 w-80 rounded-full bg-gradient-to-tr from-zinc-500 to-zinc-900 opacity-50 blur-[160px] sm:block" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-[640px] -ml-[300px] hidden -translate-x-1/2 sm:block"
        aria-hidden="true"
      >
        <div className="hidden h-80 w-80 rounded-full bg-gradient-to-tr from-zinc-500 to-zinc-900 opacity-50 blur-[160px] sm:block" />
      </div>
    </>
  );
}
