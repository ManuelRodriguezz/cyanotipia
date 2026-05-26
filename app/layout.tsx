import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "cyanotipia — Archivo de Moda & Belleza",
  description: "Curaduría de piezas atemporales. Moda, belleza y accesorios de autor. Envíos a todo Argentina.",
  keywords: ["moda", "belleza", "accesorios", "maquillaje", "ropa", "tienda online", "argentina"],
  openGraph: {
    title: "cyanotipia — Archivo de Moda & Belleza",
    description: "Curaduría de piezas atemporales. Moda, belleza y accesorios de autor.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "cyanotipia — Archivo de Moda & Belleza",
    description: "Curaduría de piezas atemporales.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
