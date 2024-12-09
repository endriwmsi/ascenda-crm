import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;

  return window.innerWidth <= 768;
};

export const getUserInitials = (name: string | null | undefined) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export const formatCurrency = (
  value: number,
  locale = "pt-BR",
  currency = "BRL",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
};
