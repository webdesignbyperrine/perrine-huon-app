import type { Metadata } from "next";
import { Outfit, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { MainJsonLd } from "@/components/JsonLd";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: false,
  fallback: ['cursive'],
});

const siteUrl = 'https://perrinehuon.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  authors: [{ name: "Perrine Huon", url: siteUrl }],
  creator: "Perrine Huon",
  publisher: "Perrine Huon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
};

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
    <html className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#D4C4A8" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <MainJsonLd />
        <link rel="preload" href="/images/logo_vert_perrine_huon.png" as="image" />
      </head>
      <body
        className={`${outfit.variable} ${caveat.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
