import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist_Mono, Jost } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const sans = Jost({ variable: "--font-jost", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Heavy Machinery on Hire & Contract Work | Arihan", template: "%s" },
  description:
    "Excavators, cranes, tippers and trailers on hire with operators. Contract-based earthwork and haulage for infrastructure projects.",
  openGraph: { siteName: "Arihan Enterprises", type: "website", locale: "en_IN" },
};

export const viewport: Viewport = { themeColor: "#0a1422" };

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
