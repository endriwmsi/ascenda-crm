"use client";
import { Menu } from "@/app/_components/admin-panel/menu";
import { Button } from "@/app/_components/ui/button";
import { useSidebar } from "@/app/_hooks/use-sidebar";
import { useStore } from "@/app/_hooks/use-store";
import { cn } from "@/app/_lib/utils";
import Link from "next/link";
import { SidebarToggle } from "./sidebar-toggle";
import Logo from "../Logo";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full bg-primary-foreground transition-[width] duration-300 ease-in-out lg:translate-x-0",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden",
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800"
      >
        <Button
          className={cn(
            "mb-1 transition-transform duration-300 ease-in-out",
            !getOpenState() ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            {getOpenState() ? (
              <>
                <Logo />
              </>
            ) : (
              <>
                <h1 className="text-bold font-bold">ASC</h1>
              </>
            )}
          </Link>
        </Button>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
