import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import ClientChrome from "./ClientChrome";
import DocumentLangSync from "@/components/common/DocumentLangSync";
import SiteJsonLd from "@/components/seo/SiteJsonLd";
import { SITE_URL } from "@/config/site";
import { buildSiteVerificationMetadata } from "@/lib/seo/site-verification";

const siteVerification = buildSiteVerificationMetadata();

const inter = Inter({
  subsets: ["latin"],
  display: "optional",
  preload: true,
  variable: "--font-inter",
  adjustFontFallback: true,
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  display: "optional",
  preload: false,
  variable: "--font-devanagari",
  weight: ["800"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Shiksha Mahakumbh",
    default: "Shiksha Mahakumbh 6.0 — National Education Summit",
  },
  description:
    "Shiksha Mahakumbh 6.0 will be held at National Institute of Technology Hamirpur (NIT Hamirpur / NITH), Himachal Pradesh, India, on 9–11 October 2026. Theme: शिक्षा, प्रकृति और प्रगति — Education for Development and Harmony with Nature.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/sLogo.png",
    apple: "/sLogo.png",
  },
  appleWebApp: {
    capable: true,
    title: "Shiksha Mahakumbh",
  },
  ...(siteVerification ? { verification: siteVerification } : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e3a5f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${notoDevanagari.variable}`}>
      <body className={`${inter.className} overflow-x-hidden antialiased`}>
        <DocumentLangSync />
        <SiteJsonLd />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-brand-saffron"
        >
          Skip to main content
        </a>
        {children}
        <ClientChrome />
      </body>
    </html>
  );
}
