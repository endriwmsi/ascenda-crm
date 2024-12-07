"use client";

import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import useIsMobile from "@/hooks/use-is-mobile-hook";
import AppLogo from "../ui/app-logo";

const LPHeader = () => {
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between rounded-full px-4 shadow-lg backdrop-blur-lg">
          {/* Site branding */}
          <div className="flex">
            <AppLogo />
          </div>

          {/* Links for desktop and mobile */}
          <div className="relative flex items-center justify-end gap-3">
            {isMobile ? (
              <>
                <ModeToggle />
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
                <ModeToggle />
                <Button
                  className="rounded-full border-2 bg-transparent text-foreground"
                  variant="outline"
                >
                  <Link href={"/auth/login"}>Entrar</Link>
                </Button>
                <Button className="rounded-full">
                  <Link href={"/auth/register"}>Registrar-se</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LPHeader;
