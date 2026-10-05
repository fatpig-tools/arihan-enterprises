import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

// Panchang (display) and Switzer (text) by the Indian Type Foundry, via Fontshare.
const display = localFont({
  variable: "--font-panchang",
  src: [
    { path: "../fonts/panchang-300.woff2", weight: "300" },
    { path: "../fonts/panchang-400.woff2", weight: "400" },
    { path: "../fonts/panchang-500.woff2", weight: "500" },
    { path: "../fonts/panchang-600.woff2", weight: "600" },
  ],
});
const sans = localFont({
  variable: "--font-switzer",
  src: [
    { path: "../fonts/switzer-300.woff2", weight: "300" },
    { path: "../fonts/switzer-400.woff2", weight: "400" },
    { path: "../fonts/switzer-500.woff2", weight: "500" },
    { path: "../fonts/switzer-600.woff2", weight: "600" },
  ],
});
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Heavy Machinery on Hire & Contract Work | Arihan", template: "%s" },
  description:
    "Excavators, cranes, tippers and trailers on hire with operators. Contract-based earthwork and haulage for infrastructure projects.",
  openGraph: { siteName: "Arihan Enterprises", type: "website", locale: "en_IN" },
};

export const viewport: Viewport = { themeColor: "#111417" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
