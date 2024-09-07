"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "../lib/utils";
import { SidebarItem } from "./sidebar-item";
import { SidebarItems } from "../config/SidebarItems";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export default function SideNav() {
  const { data } = useSession();
  const sidebarItems = SidebarItems();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const handleSignOut = () => signOut();

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="z-50 pr-4">
      <div
        className={cn(
          isSidebarExpanded ? "w-[200px]" : "w-[68px]",
          "hidden h-full transform rounded-lg border-r bg-card shadow-lg transition-all duration-300 ease-in-out sm:flex",
        )}
      >
        <aside className="flex h-full w-full columns-1 flex-col overflow-x-hidden break-words px-4">
          {/* Top */}
          <div className="relative mt-4 pb-2">
            <div className="flex flex-col space-y-1">
              {sidebarItems.map((item, idx) => {
                if (item.position === "top") {
                  return (
                    <div className="space-y-1" key={idx}>
                      <SidebarItem
                        label={item.name}
                        icon={item.icon}
                        path={item.href}
                        active={item.active}
                        isSidebarExpanded={isSidebarExpanded}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {/* Bottom */}
          <div className="sticky bottom-0 mb-4 mt-auto block whitespace-nowrap transition duration-200">
            <ThemeToggle isDropDown={true} />
            {sidebarItems.map((item, idx) => {
              if (item.position === "bottom") {
                return (
                  <div className="space-y-1" key={idx}>
                    <SidebarItem
                      label={item.name}
                      icon={item.icon}
                      path={item.href}
                      active={item.active}
                      isSidebarExpanded={isSidebarExpanded}
                    />
                  </div>
                );
              }
            })}
            <div className="mt-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex space-x-2">
                    <Avatar>
                      <AvatarImage
                        src={data?.user?.image!}
                        alt={data?.user?.name!}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    {isSidebarExpanded && (
                      <div className="flex flex-col items-start justify-center">
                        <span className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                          {data?.user?.name}
                        </span>
                        <span className="text-[8px] text-neutral-500 dark:text-neutral-400">
                          {data?.user?.email}
                        </span>
                      </div>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={"/dashboard/settings"}>Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </aside>

        <div className="relative mt-[calc(calc(90vh)-40px)]">
          <button
            type="button"
            className="absolute bottom-32 right-[-12px] flex h-6 w-6 items-center justify-center rounded-full border border-muted-foreground/20 bg-accent shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg"
            onClick={toggleSidebar}
          >
            {isSidebarExpanded ? (
              <ChevronLeft size={16} className="stroke-foreground" />
            ) : (
              <ChevronRight size={16} className="stroke-foreground" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
