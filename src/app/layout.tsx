import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { Toaster } from "sonner";

const plusJakarta = localFont({
  src: "../public/fonts/PlusJakartaSans-VariableFont_wght.ttf",
  variable: "--font-plus-jakarta",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kopikan POS",
  description: "POS by Kopikan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} antialiased flex justify-center`}
      >
        <Providers>
          <Toaster />

          <main className="w-[768px] lg:w-[1024px] h-screen shadow-xl">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
