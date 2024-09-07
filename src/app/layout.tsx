import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/app/providers/context-provider";
import AuthProvider from "./providers/auth";
import { RedirectProvider } from "./providers/RedirectProvider";

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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <RedirectProvider>
            <ContextProvider>
              <div className="flex h-full flex-col">
                <div>{children}</div>
              </div>
            </ContextProvider>
          </RedirectProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
