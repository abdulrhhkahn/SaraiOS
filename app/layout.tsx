import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { JsonLd } from "@/components/layout/JsonLd";
import { organizationJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

// Body text and UI copy.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
// Main headings (Fraunces primary, Cormorant Garamond as the loaded fallback).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SaraiOS — AI-Native Guest Experience Platform",
    template: "%s | SaraiOS",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: { siteName: siteConfig.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${cormorantGaramond.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <JsonLd data={organizationJsonLd()} />
        <MotionProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
