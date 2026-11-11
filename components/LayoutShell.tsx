"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const STANDALONE_PATTERNS = ["/contact"];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // During static prerendering the pathname is the internal route path
  // (e.g. "/fr/contact"), while in the browser the default locale has no
  // prefix ("/contact"). Strip every locale so both resolve to the same shell.
  const pathWithoutLocale = pathname.replace(/^\/(fr|en|es)(?=\/|$)/, '') || '/';
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
