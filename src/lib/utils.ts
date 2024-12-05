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

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);

  if (match) {
    const [, countryCode, ddd, part1, part2] = match;
    return `+${countryCode} (${ddd}) ${part1}-${part2}`;
  }

  return phone;
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
