import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#059669",
};

export const metadata: Metadata = {
  title: "Djassa Pro CI | Services de proximité & Entraide des jeunes en Côte d'Ivoire",
  description: "Trouvez rapidement un jeune prestataire qualifié et vérifié à Abidjan.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <ToastProvider>
          <Navbar />
          <main className="min-w-0 flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
        </ToastProvider>
      </body>
    </html>
  );
}
