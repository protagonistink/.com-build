import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Permanent_Marker } from "next/font/google";
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
  title: "Protagonist Ink",
  description:
    "We translate complex organizational shifts into language that moves markets.",
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
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body
        className={`${cormorant.variable} ${permanentMarker.variable} font-sans bg-ink text-warmwhite antialiased selection:bg-rust selection:text-warmwhite`}
      >
        <Navbar />
        <ScrollReveal />
        {children}
        <Footer />
      </body>
    </html>
  );
}
