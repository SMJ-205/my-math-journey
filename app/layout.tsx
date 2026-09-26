import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "My Math Journey — Belajar Matematika SD",
  description:
    "Simulator matematika interaktif berbasis Kurikulum Merdeka untuk siswa SD Kelas 1 hingga 6. Belajar dengan cara yang menyenangkan, tanpa biaya.",
  keywords: ["matematika SD", "belajar matematika", "kurikulum merdeka", "simulasi matematika"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${nunito.variable} ${fredoka.variable}`}>
      <body className="bg-[#FFFDF4] font-nunito antialiased">
        {children}
      </body>
    </html>
  );
}
