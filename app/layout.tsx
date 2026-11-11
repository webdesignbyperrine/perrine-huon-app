import type { Metadata } from "next";
import "./globals.css";

const siteUrl = 'https://www.perrinehuon.com'

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

// The <html>/<body> document is rendered by each top-level layout through
// components/RootDocument.tsx (app/[locale]/layout.tsx passes the locale from
// its route params). Reading the locale here with getLocale() would read the
// request headers and force every page into dynamic rendering.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
