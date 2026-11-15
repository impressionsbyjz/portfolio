import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.impressionsbyjz.ca"),
  title: "JAS — Wedding Photography for the Real Ones",
  description:
    "Documentary and editorial wedding photography in Tricity, India and worldwide. Authentic, timeless wedding stories by Jas.",
  authors: [{ name: "Impressions by JZ" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "JAS — Wedding Photography for the Real Ones",
    description: "Documentary and editorial wedding photography. Authentic, timeless, yours.",
    type: "website",
    siteName: "Impressions by JZ",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wedding photography by JAS — Impressions by JZ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JAS — Wedding Photography for the Real Ones",
    description: "Documentary and editorial wedding photography. Authentic, timeless, yours.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Photographer", "LocalBusiness"],
  name: "JAS — Impressions by JZ",
  url: "https://www.impressionsbyjz.ca/",
  image: "https://www.impressionsbyjz.ca/og-image.jpg",
  description:
    "Documentary and editorial wedding photography in Tricity, India and worldwide. Authentic, timeless wedding stories by Jas.",
  sameAs: ["https://www.instagram.com/impressionsbyjz/"],
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&family=Pinyon+Script&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
