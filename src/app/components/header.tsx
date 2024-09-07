"use client";

import React, { useState } from "react";

import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/app/components/ui/sheet";
import { NavItems } from "@/app/config/NavItems";
import { Menu } from "lucide-react";

export default function Header() {
  const navItems = NavItems();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 md:px-6">
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
        prefetch={false}
      >
        <span className="h-8 w-8 rounded-full border bg-accent" />
        <span>Acme Inc</span>
      </Link>

      <div className="ml-4 flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button onClick={() => setIsOpen(true)} className="block sm:hidden">
          <Menu size={24} />
        </button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="right" className="block md:hidden">
            <div className="flex h-fit w-full flex-col gap-1 overflow-y-auto pt-4">
              {navItems.map((navItem, idx) => (
                <Link
                  key={idx}
                  href={navItem.href}
                  onClick={() => setIsOpen(false)}
                  className={`relative flex h-full items-center whitespace-nowrap rounded-md ${
                    navItem.active
                      ? "font-base bg-neutral-200 text-sm text-neutral-700 shadow-sm dark:bg-neutral-800 dark:text-white"
                      : "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                  }`}
                >
                  <div className="font-base relative flex flex-row items-center space-x-2 rounded-md px-2 py-1.5 text-sm duration-100">
                    {navItem.icon}
                    <span>{navItem.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
