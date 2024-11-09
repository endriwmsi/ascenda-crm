import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;

  return window.innerWidth <= 768;
};

export function getUserInitials(name: string | null | undefined) {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
