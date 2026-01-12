import type { Metadata } from "next";
import { Outfit, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { MainJsonLd } from "@/components/JsonLd";

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

const siteUrl = 'https://perrinehuon.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Perrine Huon | Web Designer & Développeuse Freelance | Création Sites Web",
    template: "%s | Perrine Huon - Web Designer Freelance",
  },
  description: "Web designer et développeuse freelance spécialisée en création de sites web sur mesure, applications web et SEO géolocalisé. Sites vitrines, e-commerce, landing pages optimisés pour la conversion. Devis gratuit.",
  keywords: [
    // Métier principal
    "web designer freelance",
    "développeuse web freelance",
    "créatrice de sites web",
    "web designer indépendante",
    // Services
    "création site web sur mesure",
    "création site vitrine",
    "création site e-commerce",
    "création landing page",
    "développement application web",
    "refonte site web",
    // SEO
    "SEO local",
    "référencement géolocalisé",
    "optimisation SEO",
    "référencement naturel",
    // Technologies
    "Next.js",
    "React",
    "Tailwind CSS",
    // Localisation
    "France",
    "Paris",
    "Lyon",
    "Lille",
    "Bordeaux",
  ],
  authors: [{ name: "Perrine Huon", url: siteUrl }],
  creator: "Perrine Huon",
  publisher: "Perrine Huon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Perrine Huon - Web Designer Freelance",
    title: "Perrine Huon | Web Designer & Développeuse Freelance",
    description: "Web designer et développeuse freelance spécialisée en création de sites web sur mesure et SEO géolocalisé. Sites vitrines, e-commerce, applications web. Devis gratuit.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Perrine Huon - Web Designer & Développeuse Freelance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perrine Huon | Web Designer & Développeuse Freelance",
    description: "Création de sites web sur mesure et SEO géolocalisé. Sites vitrines, e-commerce, applications web.",
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
      { url: "/favicon.svg?v=3", type: "image/svg+xml" },
      { url: "/icon.png?v=3", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png?v=3", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png?v=3", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Perrine Huon",
  },
  category: "technology",
  classification: "Web Design, Web Development, SEO",
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
        <MainJsonLd />
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
