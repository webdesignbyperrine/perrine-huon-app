'use client';

import Script from 'next/script';
import SectionDivider from './SectionDivider';

export default function CalendlySection() {
  return (
    <section id="rdv" className="relative py-20 pb-32 bg-primary-900">
      {/* Divider en haut - prend la couleur de cette section (#0d1a2d) */}
      <SectionDivider bottomSectionColor="#0d1a2d" position="top" />
      {/* Script Calendly */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 
              className="inline-flex items-center justify-center gap-5" 
              style={{ fontSize: '46px', fontWeight: 'bold', lineHeight: 1.2 }}
            >
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Discutons en visio
              </span>
              {/* Icône visio à droite */}
              <svg 
                className="text-secondary flex-shrink-0" 
                style={{ width: '48px', height: '48px', marginTop: '4px' }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                />
              </svg>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mt-6">
              Pour parler tranquillement de votre projet.
            </p>
          </div>

          {/* Widget Calendly intégré */}
          <div className="card bg-white/5 backdrop-blur-xl border-secondary/30 p-4 md:p-8 overflow-hidden">
            <div 
              id="calendly-embed"
              className="calendly-inline-widget"
              data-url="https://calendly.com/prne-hn/30min?hide_gdpr_banner=1&background_color=0a1628&text_color=F0EAD6&primary_color=2F4558"
              style={{ 
                minWidth: '320px', 
                height: '700px',
                width: '100%'
              }}
            />
            
            <p className="text-white/40 text-sm mt-4 text-center">
              ✨ Première consultation offerte • Sans engagement • Réponse sous 48h
            </p>
          </div>

          {/* Bénéfices */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Rendez-vous rapide</h3>
              <p className="text-white/60 text-sm">30 minutes pour faire le point</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Gratuit et sans engagement</h3>
              <p className="text-white/60 text-sm">Aucun frais, discussion libre</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Réponse personnalisée</h3>
              <p className="text-white/60 text-sm">Solutions adaptées à vos besoins</p>
            </div>
          </div>

        </div>
      </div>
      
      {/* Divider en bas - prend la couleur de la section suivante (#0d433e) */}
      <SectionDivider bottomSectionColor="#0d433e" position="bottom" />
    </section>
  );
}
