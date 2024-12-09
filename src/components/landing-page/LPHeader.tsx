"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import useIsMobile from "@/hooks/use-is-mobile-hook";
import AppLogo from "../ui/app-logo";
import { ModeToggle } from "../ui/mode-toggle";

const LPHeader = () => {
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between rounded-xl border border-white/10 px-4 shadow-lg backdrop-blur-sm">
          {/* Site branding */}
          <div className="flex">
            <AppLogo />
          </div>

          {/* Links for desktop and mobile */}
          <div className="relative flex items-center justify-end gap-3">
            {/* {isMobile ? (
              <>
                <Sheet>
                  <SheetTrigger>
                    <Menu size={16} />
                  </SheetTrigger>

                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Menu</SheetTitle>
                      <SheetDescription className="mt-8 flex flex-col gap-2">
                        <Button
                          className="rounded-full border-2 bg-transparent text-foreground"
                          variant="outline"
                        >
                          <SheetClose asChild>
                            <Link href={"/auth/login"}>Entrar</Link>
                          </SheetClose>
                        </Button>

                        <Button className="rounded-full">
                          <SheetClose asChild>
                            <Link href={"/auth/register"}>Registrar-se</Link>
                          </SheetClose>
                        </Button>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </>
            ) : (
              <>
                <Button
                  className="rounded-full border-2 bg-transparent text-foreground"
                  variant="default"
                >
                  <Link href={"/auth/login"}>Entrar</Link>
                </Button>
              </>
            )} */}

            <div className="flex items-center justify-between gap-2">
              <ModeToggle />
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
    </header>
  );
};

export default LPHeader;
