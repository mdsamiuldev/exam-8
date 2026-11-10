import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Development Events Platform",
  description: "Empowering communities and organizing events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-slate-100 min-h-screen flex flex-col justify-between`}>
        <div className="flex flex-col min-h-screen">
          <Suspense fallback={<div className="h-20 bg-slate-900/90 border-b border-white/10" />}>
            <Navbar />
          </Suspense>
          <main className="grow">
            <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="loading loading-spinner loading-lg text-blue-500" /></div>}>
              {children}
            </Suspense>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}