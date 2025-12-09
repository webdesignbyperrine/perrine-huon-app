'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'À propos', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-primary/90 backdrop-blur-md border-b border-primary-400/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent-red rounded-full flex items-center justify-center font-bold text-xl">
              PH
            </div>
            <span className="text-xl font-bold hidden sm:block">Perrine Huon</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-secondary transition-colors duration-300 font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#rdv"
              className="btn-primary"
            >
              Réserver un appel
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-white/80 hover:text-secondary transition-colors duration-300 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#rdv"
              className="block w-full btn-primary text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Réserver un appel
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

