'use client';

import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Force dark mode sur l'admin
    const html = document.documentElement;
    const wasLight = !html.classList.contains('dark');
    
    if (wasLight) {
      html.classList.add('dark');
    }
    
    // Restaurer le mode original quand on quitte l'admin
    return () => {
      if (wasLight) {
        html.classList.remove('dark');
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {children}
    </div>
  );
}








