"use client";
import { Menu } from "@/app/_components/admin-panel/menu";
import { Button } from "@/app/_components/ui/button";
import { useSidebar } from "@/app/_hooks/use-sidebar";
import { useStore } from "@/app/_hooks/use-store";
import { cn } from "@/app/_lib/utils";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { SidebarToggle } from "./sidebar-toggle";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full bg-primary-foreground transition-[width] duration-300 ease-in-out dark:bg-primary-foreground lg:translate-x-0",
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
            <PanelsTopLeft className="mr-1 h-6 w-6" />
            <h1
              className={cn(
                "whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
                !getOpenState()
                  ? "hidden -translate-x-96 opacity-0"
                  : "translate-x-0 opacity-100",
              )}
            >
              Brand
            </h1>
          </Link>
        </Button>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
