"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const STANDALONE_PATTERNS = ["/contact"];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/(en|es)/, '') || '/';
  const isStandalone = STANDALONE_PATTERNS.some(p => pathWithoutLocale === p || pathWithoutLocale.startsWith(p + '/'));
  const isAdmin = pathname.startsWith('/admin');
  const isBlog = pathWithoutLocale.startsWith('/blog');

  if (isStandalone || isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
