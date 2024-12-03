"use client";

import Link from "next/link";
import { LayoutGrid, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { getUserInitials } from "@/lib/utils";

export function UserNav() {
  const { data } = useSession();

  const handleSignOut = () =>
    signOut({
      redirect: true,
      callbackUrl: "/",
    });

  const initials = getUserInitials(data?.user?.name);

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger className="flex items-center" asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 w-8 rounded-full border-primary"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={data?.user?.image!}
                    alt={data?.user?.name!}
                  />
                  <AvatarFallback className="">{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Perfil</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Perfil</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={data?.user?.image!} alt={data?.user?.name!} />
              <AvatarFallback className="bg-transparent">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {data?.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {data?.user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard" className="flex items-center">
              <LayoutGrid className="mr-3 h-4 w-4 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/account" className="flex items-center">
              <User className="mr-3 h-4 w-4 text-muted-foreground" />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={handleSignOut}
        >
          <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
