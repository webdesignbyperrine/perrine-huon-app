import type { Metadata } from "next";
import { Outfit, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ThemeProvider } from "@/contexts/ThemeContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perrine Huon | Création de Sites Web & Apps avec SEO Géolocalisé",
  description: "Expert en création de sites web et applications avec SEO géolocalisé performant. Développement sur mesure pour propulser votre visibilité locale.",
  keywords: ["création site web", "développement web", "SEO local", "référencement géolocalisé", "application web"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Perrine Huon",
  },
};

// Script pour appliquer le thème avant le rendu (évite le flash)
const themeScript = `
  (function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${outfit.variable} ${caveat.variable} antialiased`}
      >
        <ThemeProvider>
          <Header />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
