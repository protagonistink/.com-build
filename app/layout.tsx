import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.protagonist.ink"),
  title: {
    default: "Protagonist Ink",
    template: "%s | Protagonist Ink",
  },
  description:
    "We translate complex organizational shifts into language that moves markets.",
  openGraph: {
    siteName: "Protagonist Ink",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 914,
        height: 512,
        alt: "Protagonist Ink — Where Stories Get Their Edge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-default.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${cormorant.variable} font-sans bg-ink text-warmwhite antialiased selection:bg-rust selection:text-warmwhite`}
      >
        <Navbar />
        <ScrollReveal />
        {children}
        <Footer />
        {isDraftMode && <VisualEditing />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
