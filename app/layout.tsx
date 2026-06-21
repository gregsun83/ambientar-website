import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Comfortaa } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const siteUrl = "https://ambientar-website.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AMBIENTAR",
  url: siteUrl,
  telephone: "+507 6602-9004",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PA",
    addressRegion: "Panamá",
  },
  description:
    "Estudio de arquitectura sostenible en Panamá. Diseño arquitectónico, remodelaciones, supervisión de obra, construcción modular y análisis integral de proyectos.",
  founder: {
    "@type": "Person",
    name: "Cecilia Tejada",
    jobTitle: "Architectural Designer",
    sameAs: "https://www.linkedin.com/in/cecilia-tejada-00a6652a4/",
  },
};

const cormorant = Cormorant_Garamond({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display:  "swap",
});

const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
});

// Comfortaa — subtitle font per brand reference
// Used as the primary fallback while Balgin (wordmark) is not yet locally installed
const comfortaa = Comfortaa({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa",
  display:  "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:        "AMBIENTAR | Arquitectura Sostenible en Panamá",
  description:
    "Estudio de arquitectura sostenible en Panamá. Diseño arquitectónico, remodelaciones, supervisión de obra, construcción modular y análisis integral de proyectos.",
  keywords: [
    "arquitectura sostenible",
    "Panama",
    "diseño arquitectónico",
    "construcción modular",
    "AMBIENTAR",
    "Cecilia Tejada",
    "remodelaciones Panamá",
  ],
  authors: [{ name: "Arq. Cecilia Tejada AMBIENTAR" }],
  alternates: {
    canonical: "/",
    languages: {
      "es-PA": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    title:       "AMBIENTAR | Arquitectura Sostenible en Panamá",
    description:
      "Estudio de arquitectura sostenible en Panamá. Diseño arquitectónico, remodelaciones, supervisión de obra, construcción modular y análisis integral de proyectos.",
    url:      siteUrl + "/",
    locale:   "es_PA",
    type:     "website",
    siteName: "AMBIENTAR",
    images: [
      {
        url: "/assets/brand/cecilia-portrait-warm.jpg",
        alt: "AMBIENTAR — Arquitectura Sostenible en Panamá",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "AMBIENTAR | Arquitectura Sostenible en Panamá",
    description:
      "Estudio de arquitectura sostenible en Panamá. Diseño arquitectónico, remodelaciones, supervisión de obra, construcción modular y análisis integral de proyectos.",
    images:      ["/assets/brand/cecilia-portrait-warm.jpg"],
  },
  robots: {
    index:  true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${inter.variable} ${comfortaa.variable}`}
    >
      <body className="bg-offwhite font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
