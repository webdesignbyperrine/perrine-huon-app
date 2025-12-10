'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [logoUrl, setLogoUrl] = useState('/images/logo_vert_perrine_huon.png');

  useEffect(() => {
    // Charger le logo depuis les settings
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => {
        if (data.logo_url) {
          setLogoUrl(data.logo_url);
        }
      })
      .catch(error => {
        console.error('Error loading logo:', error);
      });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-900">
      {/* Fond avec grille subtile */}
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Éléments 3D colorés en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orbe gauche */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-secondary via-accent-red to-accent-orange rounded-full animate-glow animate-float-3d" style={{ animationDelay: '0s' }} />
        
        {/* Orbe droite */}
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-accent-blue via-accent-cyan to-secondary rounded-full animate-glow animate-float-3d" style={{ animationDelay: '2s' }} />
        
        {/* Cercles supplémentaires */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-rotate-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/3 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Logo perroquet au centre avec effet 3D */}
          <div className="flex justify-center mb-12">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary via-accent-orange to-accent-red rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              
              {/* Logo container */}
              <div className="relative w-48 h-48 glass-dark rounded-full flex items-center justify-center transform hover:scale-105 transition-transform duration-500 p-8">
                <Image
                  src={logoUrl}
                  alt="Perrine Huon"
                  width={120}
                  height={120}
                  className="object-contain"
                  priority
                  key={logoUrl}
                />
              </div>
            </div>
          </div>

          {/* Nom et titre */}
          <div className="text-center space-y-8">
            {/* Nom */}
            <h1 className="text-8xl md:text-9xl font-bold tracking-tight">
              <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                PERRINE
              </span>
              <span className="block mt-2 bg-gradient-to-r from-secondary via-accent-orange to-accent-red bg-clip-text text-transparent text-glow">
                HUON
              </span>
            </h1>

            {/* Séparateur décoratif */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent" />
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent" />
            </div>

            {/* Titre professionnel */}
            <h2 className="text-2xl md:text-4xl font-light tracking-[0.3em] uppercase text-white/60">
              WEB DESIGNER & DEVELOPER
            </h2>

            {/* Sous-titre SEO */}
            <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed font-light">
              Création de sites web & applications avec
              <span className="text-secondary font-medium"> SEO géolocalisé ultra performant</span>
            </p>
          </div>

          {/* CTAs minimalistes */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
            <Link
              href="#rdv"
              className="group relative px-12 py-5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-accent-red to-accent-orange opacity-100 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-accent-red to-accent-orange blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
              <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Réserver un appel
              </span>
            </Link>

            <Link
              href="#contact"
              className="group relative px-12 py-5 glass-dark hover:glass transition-all duration-300"
            >
              <span className="relative z-10 text-white/80 group-hover:text-white font-semibold tracking-wider uppercase text-sm flex items-center gap-3 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Me contacter
              </span>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce">
            <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* Overlay noise */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
    </section>
  );
}
