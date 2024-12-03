import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/assets/css/globals.css";
import AppProviders from "./providers/app-providers";
import { Toaster } from "../components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ascenda CRM",
  description: "Tudo o que você precisa para o seu negócio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <main className="grow scroll-smooth">{children}</main>
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
