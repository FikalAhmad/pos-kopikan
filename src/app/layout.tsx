import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { Toaster } from "sonner";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ 
  subsets: ["latin"],
  variable: "--font-urbanist",
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
      <body className={`${urbanist.variable} font-sans antialiased flex justify-center`}>
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
