import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AMBIENTAR | Arquitectura Sostenible en Panamá",
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
  openGraph: {
    title: "AMBIENTAR | Arquitectura Sostenible en Panamá",
    description:
      "Estudio de arquitectura sostenible en Panamá. Diseño arquitectónico, remodelaciones, supervisión de obra, construcción modular y análisis integral de proyectos.",
    locale: "es_PA",
    type: "website",
    siteName: "AMBIENTAR",
  },
  alternates: {
    languages: {
      "es-PA": "/",
      "en-US": "/",
    },
  },
  robots: {
    index: true,
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
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="bg-offwhite font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
