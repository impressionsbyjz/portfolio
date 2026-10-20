import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/src/components/site-header";
import { SiteFooter } from "@/src/components/site-footer";

export const metadata: Metadata = {
  title: "JAS — Wedding Photography for the Real Ones",
  description: "Documentary and editorial wedding photography in Tricity, India and worldwide. Authentic, timeless wedding stories by Jas.",
  authors: [{ name: "Impressions by JZ" }],
  openGraph: {
    title: "JAS — Wedding Photography for the Real Ones",
    description: "Documentary and editorial wedding photography. Authentic, timeless, yours.",
    type: "website",
    siteName: "Impressions by JZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "JAS — Wedding Photography for the Real Ones",
    description: "Documentary and editorial wedding photography. Authentic, timeless, yours.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&family=Pinyon+Script&display=swap" />
      </head>
      <body className="min-h-screen">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
