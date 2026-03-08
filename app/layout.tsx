import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Permanent_Marker } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-permanent-marker",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
        />
      </head>
      <body
        className={`${cormorant.variable} ${permanentMarker.variable} font-sans bg-ink text-warmwhite antialiased selection:bg-rust selection:text-warmwhite`}
      >
        <Navbar />
        <ScrollReveal />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
