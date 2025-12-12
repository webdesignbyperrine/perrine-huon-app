'use client';

import { useState } from 'react';
import { useQualifier } from '../context';
import NavigationButtons from '../ui/NavigationButtons';
import ProgressBar from '../ui/ProgressBar';

// Fonction pour générer l'URL de preview d'un site (WordPress mshots - gratuit et fiable)
const getPreviewUrl = (siteUrl: string) => {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(siteUrl)}?w=800&h=600`;
};

// Liste réduite à 8 sites avec des designs variés et des aperçus fiables
const INSPIRATION_SITES = [
  { name: 'Apple', url: 'https://apple.com', style: 'Minimaliste', color: '#000000' },
  { name: 'Nike', url: 'https://nike.com', style: 'Dynamique', color: '#ff6b35' },
  { name: 'Spotify', url: 'https://spotify.com', style: 'Coloré', color: '#1db954' },
  { name: 'Airbnb', url: 'https://www.airbnb.fr/s/Paris/homes', style: 'Chaleureux', color: '#ff5a5f' },
  { name: 'Stripe', url: 'https://stripe.com', style: 'Tech', color: '#635bff' },
  { name: 'Netflix', url: 'https://netflix.com', style: 'Immersif', color: '#e50914' },
  { name: 'Notion', url: 'https://notion.so', style: 'Productif', color: '#000000' },
  { name: 'Linear', url: 'https://linear.app', style: 'SaaS moderne', color: '#5e6ad2' },
];

export default function InspirationsStep() {
  const { data, setInspirations } = useQualifier();
  const [selectedSites, setSelectedSites] = useState<string[]>(() => {
    if (data.inspirations) {
      return data.inspirations.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  });
  const [expandedSite, setExpandedSite] = useState<string | null>(null);

  const toggleSite = (siteName: string) => {
    let newSelected: string[];
    if (selectedSites.includes(siteName)) {
      newSelected = selectedSites.filter(s => s !== siteName);
    } else {
      newSelected = [...selectedSites, siteName];
    }
    setSelectedSites(newSelected);
    setInspirations(newSelected.join(', '));
  };

  const handleCardClick = (siteName: string) => {
    if (expandedSite === siteName) {
      setExpandedSite(null);
    } else {
      setExpandedSite(siteName);
    }
  };

  const openSite = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const expandedSiteData = INSPIRATION_SITES.find(s => s.name === expandedSite);

  return (
    <div className="py-4">
      <ProgressBar />
      
      {/* Titre */}
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Quels univers vous inspirent ?
          </span>
        </h2>
        <p className="text-white/50 font-light">
          Cliquez sur une carte pour l&apos;agrandir • Cochez pour sélectionner
        </p>
      </div>

      {/* Tags sélectionnés */}
      {selectedSites.length > 0 && (
        <div className="mb-6 p-4 glass-dark rounded-xl max-w-4xl mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-white/40 uppercase tracking-wider">Vos inspirations :</span>
            {selectedSites.map((site) => {
              const siteData = INSPIRATION_SITES.find(s => s.name === site);
              return (
                <span
                  key={site}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: siteData?.color || '#666' }}
                >
                  {site}
                  <button
                    onClick={() => toggleSite(site)}
                    className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Grille de sites avec miniatures */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {INSPIRATION_SITES.map((site) => {
          const isSelected = selectedSites.includes(site.name);
          
          return (
            <div
              key={site.name}
              className="relative group"
            >
              {/* Card avec miniature */}
              <div
                onClick={() => handleCardClick(site.name)}
                className={`
                  relative w-full rounded-xl overflow-hidden cursor-pointer transition-all duration-300
                  ${isSelected 
                    ? 'ring-2 ring-secondary ring-offset-2 ring-offset-primary-900' 
                    : 'hover:scale-[1.02]'
                  }
                `}
              >
                {/* Miniature du site */}
                <div className="relative h-28 overflow-hidden bg-white">
                  <img
                    src={getPreviewUrl(site.url)}
                    alt={`Aperçu ${site.name}`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  {/* Overlay au hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs bg-black/50 px-2 py-1 rounded">
                      Cliquez pour agrandir
                    </span>
                  </div>
                </div>
                
                {/* Info bar */}
                <div className="p-3 glass-dark">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: site.color }}
                    />
                    <span className="font-semibold text-white text-sm truncate">{site.name}</span>
                  </div>
                  <span className="text-xs text-white/40 ml-5">{site.style}</span>
                </div>

                {/* Checkbox pour sélectionner */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSite(site.name);
                  }}
                  className={`
                    absolute top-2 right-2 w-6 h-6 rounded-md flex items-center justify-center
                    transition-all duration-200 z-10
                    ${isSelected 
                      ? 'bg-secondary text-white' 
                      : 'bg-black/50 text-white/50 hover:bg-black/70 hover:text-white'
                    }
                  `}
                >
                  {isSelected ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal d'aperçu agrandi - clic n'importe où pour fermer */}
      {expandedSite && expandedSiteData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setExpandedSite(null)}
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <div 
            className="w-full max-w-3xl cursor-pointer"
            style={{ animation: 'scaleIn 0.25s ease-out' }}
          >
            <div className="glass-dark rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              {/* Browser chrome */}
              <div className="px-4 py-3 flex items-center gap-3 bg-black/50 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 bg-white/10 rounded-md px-3 py-1">
                  <span className="text-xs text-white/60">{expandedSiteData.url}</span>
                </div>
                <button
                  onClick={() => setExpandedSite(null)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Grande preview */}
              <div className="relative h-96 overflow-hidden bg-white">
                <img
                  src={getPreviewUrl(expandedSiteData.url)}
                  alt={`Aperçu ${expandedSiteData.name}`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              {/* Footer avec actions */}
              <div className="px-4 py-3 bg-black/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: expandedSiteData.color }}
                  />
                  <span className="text-white font-semibold">{expandedSiteData.name}</span>
                  <span className="text-white/50 text-sm">• {expandedSiteData.style}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSite(expandedSiteData.name);
                    }}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${selectedSites.includes(expandedSiteData.name)
                        ? 'bg-secondary text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }
                    `}
                  >
                    {selectedSites.includes(expandedSiteData.name) ? '✓ Sélectionné' : 'Sélectionner'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openSite(expandedSiteData.url, e);
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    Visiter
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Instruction */}
            <p className="text-center text-white/40 text-sm mt-4">
              Cliquez n&apos;importe où pour fermer
            </p>
          </div>
        </div>
      )}

      {/* Champ texte pour inspirations personnalisées */}
      <div className="mt-6 max-w-2xl mx-auto">
        <div className="glass-dark rounded-xl p-4">
          <label className="block text-sm text-white/50 mb-2">
            💡 Autre inspiration ? Ajoutez un site ou une marque :
          </label>
          <input
            type="text"
            placeholder="Ex: Le site de mon concurrent, une boutique que j'aime..."
            className="w-full px-4 py-3 bg-primary-800/50 border border-primary-400/30 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors text-sm"
            onBlur={(e) => {
              if (e.target.value) {
                const customValue = e.target.value;
                const allInspirations = [...selectedSites];
                if (!allInspirations.includes(customValue)) {
                  allInspirations.push(customValue);
                  setSelectedSites(allInspirations);
                  setInspirations(allInspirations.join(', '));
                }
                e.target.value = '';
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
              }
            }}
          />
        </div>
      </div>

      <NavigationButtons nextLabel="Voir mon récapitulatif" />

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
      `}</style>
    </div>
  );
}
