import type { Metadata } from "next";
import { Outfit, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { MainJsonLd } from "@/components/JsonLd";
import LayoutShell from "@/components/LayoutShell";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Réduit de 4 à 3 poids pour améliorer les performances
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600"], // Réduit de 4 à 2 poids (cette police est moins utilisée)
  display: "swap",
  preload: false, // Ne pas précharger car moins critique
  fallback: ['cursive'],
});

const siteUrl = 'https://perrinehuon.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Perrine Huon | Création de Sites Internet Sur Mesure | Développeuse Web Freelance",
    template: "%s | Perrine Huon - Création de Sites Internet",
  },
  description: "Développeuse web freelance spécialisée en création de sites internet sur mesure, applications web et SEO géolocalisé. Sites vitrines, e-commerce, landing pages optimisés pour la conversion. Devis gratuit.",
  keywords: [
    "création site internet",
    "création site web sur mesure",
    "développeuse web freelance",
    "développeur web freelance",
    "créer un site internet professionnel",
    "faire créer un site web",
    "création site vitrine",
    "création site e-commerce",
    "création landing page",
    "développement application web",
    "refonte site web",
    "création CRM sur mesure",
    "web designer freelance",
    "SEO local",
    "référencement géolocalisé",
    "optimisation SEO",
    "référencement naturel",
    "Next.js",
    "React",
    "Tailwind CSS",
    "France",
    "Paris",
    "Lyon",
    "Marseille",
    "Lille",
    "Bordeaux",
    "Toulouse",
    "Nantes",
    "site internet professionnel",
    "site web PME",
    "site internet professions libérales",
  ],
  authors: [{ name: "Perrine Huon", url: siteUrl }],
  creator: "Perrine Huon",
  publisher: "Perrine Huon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Perrine Huon - Création de Sites Internet",
    title: "Perrine Huon | Création de Sites Internet Sur Mesure | Développeuse Web Freelance",
    description: "Développeuse web freelance spécialisée en création de sites internet sur mesure et SEO géolocalisé. Sites vitrines, e-commerce, applications web. Devis gratuit.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Perrine Huon - Création de Sites Internet Sur Mesure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perrine Huon | Création de Sites Internet Sur Mesure",
    description: "Création de sites internet sur mesure et SEO géolocalisé. Sites vitrines, e-commerce, applications web. Développeuse web freelance.",
    images: ["/images/og-image.jpg"],
    creator: "@perrinehuon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon-192.png?v=4", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png?v=4", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/icon-192.png?v=4", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Perrine Huon",
  },
  category: "technology",
  classification: "Création de Sites Internet, Développement Web, SEO",
};

// Script pour appliquer le thème avant le rendu (évite le flash)
const themeScript = `
  (function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#D4C4A8" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <MainJsonLd />
        {/* Preload des ressources critiques */}
        <link rel="preload" href="/images/logo_vert_perrine_huon.png" as="image" />
      </head>
      <body
        className={`${outfit.variable} ${caveat.variable} antialiased`}
      >
        <ThemeProvider>
          <LayoutShell>
            {children}
          </LayoutShell>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
