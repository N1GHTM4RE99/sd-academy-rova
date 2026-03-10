import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SD Academy - Formation Expert",
  description: "Master 11 formations across Brand Identity, Content Creation, and Funnel Systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-background min-h-screen">
        {children}
      </body>
    </html>
  );
}
