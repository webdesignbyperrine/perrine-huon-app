'use client';

import { useState } from 'react';
import { useQualifier } from '../context';
import ProgressBar from '../ui/ProgressBar';
import { ArrowLeftIcon } from '../icons';
import { 
  PROJECT_TYPES, 
  FEATURES_OPTIONS, 
  DESIGN_STYLES, 
  ANIMATION_LEVELS, 
  BUDGET_OPTIONS, 
  DEADLINE_OPTIONS, 
  ACCOMPAGNEMENT_OPTIONS 
} from '../types';

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
  const { data, setInspirations, goPrevious } = useQualifier();
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

  // Récupérer les labels pour le message
  const projectTypeLabel = PROJECT_TYPES.find(p => p.value === data.projectType)?.label;
  const designStyleLabel = DESIGN_STYLES.find(d => d.value === data.designStyle)?.label;
  const animationLabel = ANIMATION_LEVELS.find(a => a.value === data.animationLevel)?.label;
  const budgetInfo = BUDGET_OPTIONS.find(b => b.value === data.budget);
  const deadlineInfo = DEADLINE_OPTIONS.find(d => d.value === data.deadline);
  const accompagnementLabel = ACCOMPAGNEMENT_OPTIONS.find(a => a.value === data.accompagnement)?.label;
  
  const featuresLabels = data.features
    .filter(f => f !== 'autre')
    .map(f => FEATURES_OPTIONS.find(fo => fo.value === f)?.label)
    .filter(Boolean);

  // Préparer le message pour le formulaire de contact
  const prepareContactMessage = () => {
    let message = "Bonjour,\n\nVoici le résumé de mon projet :\n\n";
    
    if (projectTypeLabel) {
      message += `📌 Type de projet : ${projectTypeLabel}\n`;
    }
    
    if (featuresLabels.length > 0) {
      message += `⚙️ Fonctionnalités : ${featuresLabels.join(', ')}\n`;
    }
    
    if (data.featureOther) {
      message += `   Autres besoins : ${data.featureOther}\n`;
    }
    
    if (designStyleLabel) {
      message += `🎨 Style de design : ${designStyleLabel}\n`;
    }
    
    if (animationLabel) {
      message += `✨ Animations : ${animationLabel}\n`;
    }
    
    if (budgetInfo) {
      message += `💰 Budget : ${budgetInfo.label} (${budgetInfo.range})\n`;
    }
    
    if (deadlineInfo) {
      message += `⏱️ Délais : ${deadlineInfo.label} (${deadlineInfo.description})\n`;
    }
    
    if (accompagnementLabel) {
      message += `🤝 Accompagnement : ${accompagnementLabel}\n`;
    }
    
    if (selectedSites.length > 0) {
      message += `💡 Inspirations : ${selectedSites.join(', ')}\n`;
    }
    
    message += "\nJ'aimerais discuter de ce projet avec vous.\n\nMerci !";
    
    return encodeURIComponent(message);
  };

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
                    className="relative w-8 h-8 rounded-lg overflow-hidden"
                    style={{
                      background: isSelected 
                        ? 'linear-gradient(180deg, rgba(34,160,107,0.2) 0%, rgba(27,138,90,0.1) 100%)'
                        : 'linear-gradient(180deg, rgba(30,40,50,0.95) 0%, rgba(20,30,40,0.9) 50%, rgba(10,20,30,0.95) 100%)',
                      boxShadow: isSelected 
                        ? '0 0 15px rgba(27, 138, 90, 0.5), inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1)'
                        : '0 0 8px rgba(0,0,0,0.5), inset 0 2px 4px rgba(0,0,0,0.5), inset 0 -1px 2px rgba(255,255,255,0.1)',
                      border: isSelected 
                        ? '2px solid rgba(34,160,107,0.8)'
                        : '2px solid rgba(255,255,255,0.6)'
                    }}
                  >
                    {/* Reflet du verre */}
                    <span 
                      className="absolute top-0 left-1 right-1 h-1.5 rounded-t-sm pointer-events-none"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)'
                      }}
                    />
                    
                    {/* Liquide vert vif quand sélectionné */}
                    {isSelected && (
                      <span 
                        className="absolute inset-0.5 rounded-md pointer-events-none overflow-hidden"
                        style={{
                          background: 'linear-gradient(180deg, #2ED47A 0%, #22A06B 50%, #1B8A5A 100%)',
                          boxShadow: '0 0 20px rgba(46, 212, 122, 0.6), inset 0 2px 3px rgba(255,255,255,0.4), inset 0 -2px 3px rgba(0,0,0,0.15)',
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

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
        {/* CTA Principal - Bouton vert */}
        <a
          href={`#contact?message=${prepareContactMessage()}`}
          onClick={(e) => {
            e.preventDefault();
            // Scroll vers le formulaire de contact
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
              // Pré-remplir le message après un court délai
              setTimeout(() => {
                const messageField = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
                if (messageField) {
                  messageField.value = decodeURIComponent(prepareContactMessage());
                  // Déclencher un événement pour React
                  const event = new Event('input', { bubbles: true });
                  messageField.dispatchEvent(event);
                }
              }, 500);
            }
          }}
          className="group/cta relative transition-transform duration-300 hover:scale-[1.02]"
        >
          {/* Tube en verre (conteneur) */}
          <div 
            className="relative flex items-center gap-3 px-10 py-5 rounded-full transition-transform duration-300"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            {/* Reflet du verre en haut */}
            <span 
              className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)'
              }}
            />
            
            {/* Liquide VERT */}
            <span 
              className="absolute inset-1 rounded-full pointer-events-none overflow-hidden liquid-container"
              style={{
                background: 'linear-gradient(180deg, #22A06B 0%, #1B8A5A 50%, #14694A 100%)',
                boxShadow: '0 0 25px rgba(27, 138, 90, 0.4), inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.2)'
              }}
            >
              {/* Vague animée au hover */}
              <span className="liquid-wave-green absolute inset-0 rounded-full opacity-0 group-hover/cta:opacity-100" />
              
              {/* Reflet sur le liquide */}
              <span 
                className="absolute top-1 left-6 right-6 h-2 rounded-full transition-transform duration-500 group-hover/cta:translate-x-2"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)'
                }}
              />
              
              {/* Bulles animées */}
              <span 
                className="absolute w-2 h-2 rounded-full bg-white/30 bubble-green-1"
                style={{ right: '12%', bottom: '25%' }}
              />
              <span 
                className="absolute w-1.5 h-1.5 rounded-full bg-white/20 bubble-green-2"
                style={{ right: '30%', bottom: '30%' }}
              />
              <span 
                className="absolute w-1 h-1 rounded-full bg-white/25 bubble-green-3"
                style={{ left: '15%', bottom: '20%' }}
              />
              <span 
                className="absolute w-1.5 h-1.5 rounded-full bg-white/20 bubble-green-4"
                style={{ left: '35%', bottom: '35%' }}
              />
              
              {/* Shimmer effect au hover */}
              <span className="liquid-shimmer-green absolute inset-0 rounded-full opacity-0 group-hover/cta:opacity-100" />
            </span>
            
            {/* Texte par-dessus */}
            <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm drop-shadow-lg">
              Obtenir un devis gratuit adapté à vos choix
            </span>
          </div>
          
          {/* Glow effect */}
          <div 
            className="absolute inset-0 rounded-full opacity-40 group-hover/cta:opacity-60 transition-opacity duration-300 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(27, 138, 90, 0.5) 0%, transparent 70%)',
              filter: 'blur(20px)'
            }}
          />
        </a>
      </div>

      {/* Bouton retour */}
      <div className="text-center mt-6">
        <button
          onClick={goPrevious}
          className="text-white/40 hover:text-white/70 text-sm transition-colors flex items-center gap-2 mx-auto"
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
        /* Bulles vertes avec animation de base */
        .bubble-green-1 {
          animation: bubble-float-green 2s ease-in-out infinite;
        }
        .bubble-green-2 {
          animation: bubble-float-green 2.5s ease-in-out infinite 0.3s;
        }
        .bubble-green-3 {
          animation: bubble-float-green 3s ease-in-out infinite 0.6s;
        }
        .bubble-green-4 {
          animation: bubble-float-green 2.2s ease-in-out infinite 0.9s;
        }
        
        /* Animation des bulles accélérée au hover */
        .group\\/cta:hover .bubble-green-1 {
          animation: bubble-active-green 0.6s ease-in-out infinite;
        }
        .group\\/cta:hover .bubble-green-2 {
          animation: bubble-active-green 0.8s ease-in-out infinite 0.1s;
        }
        .group\\/cta:hover .bubble-green-3 {
          animation: bubble-active-green 0.7s ease-in-out infinite 0.2s;
        }
        .group\\/cta:hover .bubble-green-4 {
          animation: bubble-active-green 0.5s ease-in-out infinite 0.15s;
        }
        
        @keyframes bubble-float-green {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-4px) scale(1.2);
            opacity: 0.5;
          }
        }
        
        @keyframes bubble-active-green {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-8px) translateX(3px) scale(1.3);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-12px) translateX(-2px) scale(1.1);
            opacity: 0.5;
          }
          75% {
            transform: translateY(-6px) translateX(4px) scale(1.4);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.4;
          }
        }
        
        /* Vague liquide verte */
        .liquid-wave-green {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.1) 25%,
            rgba(255,255,255,0.2) 50%,
            rgba(255,255,255,0.1) 75%,
            transparent 100%
          );
          animation: wave-move-green 1.5s ease-in-out infinite;
          transition: opacity 0.3s ease;
        }
        
        @keyframes wave-move-green {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(100%) skewX(-15deg);
          }
        }
        
        /* Shimmer effect vert */
        .liquid-shimmer-green {
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255,255,255,0.15) 40%,
            rgba(255,255,255,0.25) 50%,
            rgba(255,255,255,0.15) 60%,
            transparent 80%
          );
          animation: shimmer-move-green 2s ease-in-out infinite;
          transition: opacity 0.3s ease;
        }
        
        @keyframes shimmer-move-green {
          0% {
            transform: translateX(-150%);
          }
          100% {
            transform: translateX(150%);
          }
        }
      `}</style>
    </div>
  );
}

