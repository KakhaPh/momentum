import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Momentum",
  description: "Momentum - Progress Tracking Software",
  icons: '/images/favicon.ico'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-firago">
        <Header />
        {children}
      </body>
    </html>
  );
}
