import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css'

import Nav from "@/components/navigation/nav";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider"
import Toaster from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mjellma Ecommerce",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex-grow px-6 md:px-12 mx-auto max-w-8xl">
          <Nav />
          <Toaster />
          {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
