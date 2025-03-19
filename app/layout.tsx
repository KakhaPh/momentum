import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { ModalProvider } from "@/components/context/ModalContext";
import EmployerModal from "@/components/createEmployer/EmployerModal";

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
      <body>
        <ModalProvider>
          <Header />
          <main className="font-firago lg:px-[120px] md:px-10 sm:px-6 xs:px-4 py-[30px]">
            {children}
          </main>
        </ModalProvider>
      </body>
    </html>
  );
}