'use client';

import { useState } from 'react';
import { useQualifier } from '../context';
import ProgressBar from '../ui/ProgressBar';
import { ArrowLeftIcon } from '../icons';

// Fonction pour générer l'URL de preview via WordPress mshots
const getPreviewUrl = (siteUrl: string) => {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(siteUrl)}?w=800&h=600`;
};

// Liste de 8 sites avec des univers graphiques différents
const INSPIRATION_SITES = [
  { 
    name: 'Créatif', 
    url: 'https://www.figma.com', 
    color: '#a259ff'
  },
  { 
    name: 'Chaleureux', 
    url: 'https://www.brasserie-jules.fr/fr', 
    color: '#8b6914'
  },
  { 
    name: 'Sobre', 
    url: 'https://solwos.com/', 
    color: '#1a365d'
  },
  { 
    name: 'Immersif', 
    url: 'https://www.ferrari.com', 
    color: '#dc0000'
  },
  { 
    name: 'Raffiné', 
    url: 'https://www.voyageursdumonde.fr/voyage-sur-mesure', 
    color: '#c9a040'
  },
  { 
    name: 'Coloré', 
    url: 'https://www.joinflowparty.com', 
    color: '#ff6b9d'
  },
  { 
    name: 'Gradient', 
    url: 'https://stripe.com/fr', 
    color: '#635bff'
  },
  { 
    name: 'Clair', 
    url: 'https://www.who.int', 
    color: '#009edb'
  },
];

export default function InspirationsStep() {
  const { data, setInspirations, goPrevious, goNext } = useQualifier();
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
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Quels univers vous inspirent ?
        </h2>
        <p className="text-primary/50 font-light">
          Cliquez sur une carte pour l&apos;agrandir • Cochez pour sélectionner
        </p>
      </div>


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
                <div className="relative h-28 overflow-hidden bg-gradient-to-br from-primary-800 to-primary-900">
                  <img
                    src={getPreviewUrl(site.url)}
                    alt={`Aperçu ${site.name}`}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                  {/* Overlay au hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs bg-black/50 px-2 py-1 rounded">
                      Cliquez pour agrandir
                    </span>
                  </div>
                </div>
                
                {/* Info bar */}
                <div className="p-3 bg-primary/5 border-t-2 border-primary/10">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: site.color }}
                    />
                    <span className="font-semibold text-primary text-sm truncate">{site.name}</span>
                  </div>
                </div>

                {/* Checkbox - fond beige par défaut, rose quand sélectionné */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSite(site.name);
                  }}
                  className="absolute top-2 right-2 z-10 transition-transform duration-200 hover:scale-110"
                >
                  <div 
                    className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isSelected 
                        ? '#ff0f7c'
                        : '#e8e2d6',
                      boxShadow: isSelected 
                        ? '0 2px 10px rgba(255, 15, 124, 0.4)'
                        : '0 2px 6px rgba(0,0,0,0.1)',
                      border: isSelected 
                        ? '2px solid #ff0f7c'
                        : '2px solid rgba(43,91,138,0.2)'
                    }}
                  >
                    {/* Icône check quand sélectionné */}
                    {isSelected && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
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
                    <div className="relative h-96 overflow-hidden bg-gradient-to-br from-primary-800 to-primary-900">
                      <img
                        src={getPreviewUrl(expandedSiteData.url)}
                        alt={`Aperçu ${expandedSiteData.name}`}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
              
              {/* Footer avec actions */}
              <div className="px-4 py-4 bg-paper flex items-center justify-between border-t border-primary/10">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: expandedSiteData.color }}
                  />
                  <span className="text-primary font-semibold">{expandedSiteData.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {/* Bouton Sélectionner - btn-cta */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSite(expandedSiteData.name);
                      setExpandedSite(null);
                    }}
                    className={`px-5 py-2.5 rounded-sketch text-sm font-semibold transition-all duration-300 ${
                      selectedSites.includes(expandedSiteData.name)
                        ? 'bg-accent text-white'
                        : 'bg-accent text-white hover:bg-accent/90'
                    }`}
                    style={{ boxShadow: '0 2px 8px rgba(255, 15, 124, 0.3)' }}
                  >
                    {selectedSites.includes(expandedSiteData.name) ? '✓ Sélectionné' : 'Sélectionner'}
                  </button>

                  {/* Bouton Visiter - btn-sketch style */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openSite(expandedSiteData.url, e);
                    }}
                    className="group px-5 py-2.5 rounded-sketch text-sm font-semibold bg-paper-light text-primary border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Visiter</span>
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="bg-primary/5 border-2 border-primary/10 rounded-sketch-lg p-4">
          <label className="block text-sm text-primary/50 mb-2">
            💡 Autre inspiration ? Ajoutez un site ou une marque :
          </label>
          <input
            type="text"
            placeholder="Ex: Le site de mon concurrent, une boutique que j'aime..."
            className="input-sketch w-full text-sm"
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

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
        {/* CTA Principal */}
        <button
          onClick={goNext}
          className="btn-cta btn-cta-pulse group inline-flex items-center gap-3"
        >
          <span>Dernière étape : obtenir mon devis</span>
          <svg 
            className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Bouton retour */}
      <div className="text-center mt-6">
        <button
          onClick={goPrevious}
          className="text-primary/40 hover:text-primary/70 text-sm transition-colors flex items-center gap-2 mx-auto"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Retour
        </button>
      </div>

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
        @keyframes bubble-float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-4px) scale(1.2);
            opacity: 0.5;
          }
        }
        @keyframes liquidFill {
          0% {
            transform: scaleY(0);
            transform-origin: bottom;
            opacity: 0;
          }
          100% {
            transform: scaleY(1);
            transform-origin: bottom;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}


