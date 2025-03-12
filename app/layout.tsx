import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Momentum",
  description: "Momentum - Progress Tracking Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-firago">
        {children}
      </body>
    </html>
  );
}
