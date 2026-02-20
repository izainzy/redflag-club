import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Red Flag Club | Chocolate-Dipped Fruit",
  description:
    "JOIN THE CLUB. Premium chocolate-dipped fruit with zero regrets. Toxic Banana, Red Flag Classic, and Mixed Signals. Order now via WhatsApp!",
  keywords: [
    "chocolate dipped fruit",
    "red flag club",
    "strawberry chocolate",
    "banana chocolate",
    "dessert",
    "Saudi Arabia",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
