import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProviders from "./providers/app-providers";
import LPHeader from "./components/lp/LPHeader";
import Footer from "./components/lp/footer";

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
        </AppProviders>
      </body>
    </html>
  );
}
