import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoModal from "@/components/PromoModal";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Fade District Barber Co. | Barbershop in Maboneng, Johannesburg",
    template: "%s | Fade District Barber Co.",
  },
  description: "Skin fades, beard sculpts and hot towel shaves at 27 Fox Street, Maboneng, Johannesburg. Book online in two minutes and add it straight to your calendar.",
  openGraph: {
    title: "Fade District Barber Co.",
    description: "Sharp cuts in Maboneng, Johannesburg. Book online, open 7 days.",
    type: "website",
    locale: "en_ZA",
  },
};

export const viewport: Viewport = { themeColor: "#17141C" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-ZA" className={archivo.variable}>
      <body className="font-sans antialiased">
        <ToastProvider>
          <a href="#main" className="absolute -left-[999px] top-0 z-[999] bg-taxi px-4 py-2.5 font-bold focus:left-2.5 focus:top-2.5">
            Skip to content
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">{children}</main>
          <Footer />
          <PromoModal />
        </ToastProvider>
      </body>
    </html>
  );
}
