import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Racha Contas",
  description: "Divisor de despesas domésticas",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={geist.className}>
      <body className="bg-gray-50 min-h-screen">
        <main className="max-w-md mx-auto pb-24 px-4 pt-4">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
