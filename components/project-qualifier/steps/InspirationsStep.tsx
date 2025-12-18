'use client';

import { useState } from 'react';
import { useQualifier } from '../context';
import NavigationButtons from '../ui/NavigationButtons';
import ProgressBar from '../ui/ProgressBar';

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
                <div className="p-3 glass-dark">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: site.color }}
                    />
                    <span className="font-semibold text-white text-sm truncate">{site.name}</span>
                  </div>
                </div>

                {/* Checkbox tube en verre */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSite(site.name);
                  }}
                  className="absolute top-2 right-2 z-10 transition-transform duration-200 hover:scale-110"
                >
                  <div 
                    className="relative w-7 h-7 rounded-lg overflow-hidden"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    {/* Reflet du verre */}
                    <span 
                      className="absolute top-0 left-1 right-1 h-1 rounded-t-sm pointer-events-none"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)'
                      }}
                    />
                    
                    {/* Liquide quand sélectionné */}
                    {isSelected && (
                      <span 
                        className="absolute inset-0.5 rounded-md pointer-events-none overflow-hidden"
                        style={{
                          background: 'linear-gradient(180deg, #476787 0%, var(--secondary) 50%, #1C2A35 100%)',
                          boxShadow: '0 0 10px rgba(47, 69, 88, 0.5), inset 0 2px 3px rgba(255,255,255,0.3), inset 0 -2px 3px rgba(0,0,0,0.2)',
                          animation: 'liquidFill 0.3s ease-out'
                        }}
                      >
                        {/* Reflet sur le liquide */}
                        <span 
                          className="absolute top-0.5 left-1 right-1 h-1 rounded-sm"
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)'
                          }}
                        />
                        {/* Bulle */}
                        <span 
                          className="absolute w-1 h-1 rounded-full bg-white/30"
                          style={{ right: '20%', bottom: '25%', animation: 'bubble-float 2s ease-in-out infinite' }}
                        />
                      </span>
                    )}
                    
                    {/* Icône check quand sélectionné */}
                    {isSelected && (
                      <svg className="absolute inset-0 m-auto w-4 h-4 text-white z-10 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="px-4 py-4 bg-black/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: expandedSiteData.color }}
                  />
                  <span className="text-white font-semibold">{expandedSiteData.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {/* Bouton Sélectionner - Style tube en verre avec liquide */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSite(expandedSiteData.name);
                      setExpandedSite(null); // Fermer la modal après sélection
                    }}
                    className="group/select relative transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <div 
                      className="relative flex items-center gap-2 px-6 py-3 rounded-full"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.15)'
                      }}
                    >
                      {/* Reflet du verre */}
                      <span 
                        className="absolute top-0 left-4 right-4 h-1.5 rounded-t-full pointer-events-none"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)'
                        }}
                      />
                      
                      {/* Liquide toujours présent */}
                      <span 
                        className="absolute inset-1 rounded-full pointer-events-none overflow-hidden"
                        style={{
                          background: 'linear-gradient(180deg, #476787 0%, var(--secondary) 50%, #1C2A35 100%)',
                          boxShadow: '0 0 15px rgba(47, 69, 88, 0.5), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        {/* Reflet sur le liquide */}
                        <span 
                          className="absolute top-0.5 left-4 right-4 h-1.5 rounded-full transition-transform duration-500 group-hover/select:translate-x-2"
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)'
                          }}
                        />
                        {/* Bulles animées */}
                        <span 
                          className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
                          style={{ right: '15%', bottom: '25%', animation: 'bubble-float 2s ease-in-out infinite' }}
                        />
                        <span 
                          className="absolute w-1 h-1 rounded-full bg-white/20"
                          style={{ right: '35%', bottom: '30%', animation: 'bubble-float 2.5s ease-in-out infinite 0.3s' }}
                        />
                      </span>
                      
                      <span className="relative z-10 text-white font-semibold text-sm tracking-wide drop-shadow-lg">
                        {selectedSites.includes(expandedSiteData.name) ? '✓ Sélectionné' : 'Sélectionner'}
                      </span>
                    </div>
                  </button>

                  {/* Bouton Visiter - Style tube en verre */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openSite(expandedSiteData.url, e);
                    }}
                    className="group/visit relative transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <div 
                      className="relative flex items-center gap-2 px-6 py-3 rounded-full"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.15)'
                      }}
                    >
                      {/* Reflet du verre */}
                      <span 
                        className="absolute top-0 left-4 right-4 h-1.5 rounded-t-full pointer-events-none"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)'
                        }}
                      />
                      
                      <span className="relative z-10 text-white/80 group-hover/visit:text-white font-semibold text-sm tracking-wide transition-colors">
                        Visiter
                      </span>
                      <svg className="relative z-10 w-4 h-4 text-white/80 group-hover/visit:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
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

