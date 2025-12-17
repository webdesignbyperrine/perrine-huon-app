'use client';

import { useQualifier } from '../context';
import { 
  PROJECT_TYPES, 
  FEATURES_OPTIONS, 
  DESIGN_STYLES, 
  ANIMATION_LEVELS, 
  BUDGET_OPTIONS, 
  DEADLINE_OPTIONS, 
  ACCOMPAGNEMENT_OPTIONS 
} from '../types';
import { SparklesIcon, CheckIcon, ArrowLeftIcon } from '../icons';

export default function SummaryStep() {
  const { data, resetQualifier, goPrevious, getCompletedSteps } = useQualifier();
  const completedSteps = getCompletedSteps();

  // Récupérer les labels
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

  // Générer un titre dynamique
  const generateTitle = () => {
    if (!data.projectType && !data.budget) {
      return "Votre projet sur mesure";
    }
    
    const projectName = projectTypeLabel || "projet web";
    return `Votre ${projectName.toLowerCase()}`;
  };

  // Générer un message personnalisé
  const generateMessage = () => {
    const messages = [];
    
    if (budgetInfo) {
      messages.push(`Avec un budget ${budgetInfo.label.toLowerCase()}`);
    }
    
    if (deadlineInfo && data.deadline !== 'pas-contrainte') {
      messages.push(`livrable en ${deadlineInfo.description.toLowerCase()}`);
    }
    
    if (messages.length === 0) {
      return "J'ai hâte de découvrir votre projet et de vous accompagner dans sa réalisation.";
    }
    
    return `${messages.join(', ')}, je suis prête à donner vie à votre vision.`;
  };

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
    
    if (data.inspirations) {
      message += `💡 Inspirations : ${data.inspirations}\n`;
    }
    
    message += "\nJ'aimerais discuter de ce projet avec vous.\n\nMerci !";
    
    return encodeURIComponent(message);
  };

  return (
    <div className="py-4">
      {/* Animation de célébration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-secondary rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-accent-orange rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-accent-red rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
      </div>

      {/* Titre */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-accent-red to-accent-orange rounded-full blur-2xl opacity-30" />
          <div className="relative w-20 h-20 glass-dark rounded-full flex items-center justify-center">
            <SparklesIcon className="w-10 h-10 text-secondary" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-secondary via-accent-orange to-accent-red bg-clip-text text-transparent text-glow">
            {generateTitle()}
          </span>
        </h2>
        <p className="text-white/60 font-light max-w-lg mx-auto">
          {generateMessage()}
        </p>
      </div>

      {/* Récapitulatif */}
      <div className="glass-dark rounded-2xl p-6 max-w-2xl mx-auto mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <CheckIcon className="w-5 h-5 text-secondary" />
          Récapitulatif de vos choix
        </h3>
        
        <div className="space-y-4">
          {/* Type de projet */}
          {projectTypeLabel && (
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <span className="text-white/50 text-sm">Type de projet</span>
              <span className="text-white font-medium text-right">{projectTypeLabel}</span>
            </div>
          )}

          {/* Fonctionnalités */}
          {featuresLabels.length > 0 && (
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <span className="text-white/50 text-sm">Fonctionnalités</span>
              <span className="text-white font-medium text-right max-w-xs">
                {featuresLabels.join(', ')}
                {data.featureOther && `, ${data.featureOther}`}
              </span>
            </div>
          )}

          {/* Style de design */}
          {designStyleLabel && (
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <span className="text-white/50 text-sm">Style de design</span>
              <span className="text-white font-medium">{designStyleLabel}</span>
            </div>
          )}

          {/* Animations */}
          {animationLabel && (
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <span className="text-white/50 text-sm">Animations</span>
              <span className="text-white font-medium">{animationLabel}</span>
            </div>
          )}

          {/* Budget */}
          {budgetInfo && (
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <span className="text-white/50 text-sm">Budget</span>
              <span className="text-secondary font-semibold">{budgetInfo.range}</span>
            </div>
          )}

          {/* Délais */}
          {deadlineInfo && (
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <span className="text-white/50 text-sm">Délais</span>
              <span className="text-white font-medium">
                {deadlineInfo.label} ({deadlineInfo.description})
              </span>
            </div>
          )}

          {/* Accompagnement */}
          {accompagnementLabel && (
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <span className="text-white/50 text-sm">Accompagnement</span>
              <span className="text-white font-medium">{accompagnementLabel}</span>
            </div>
          )}

          {/* Inspirations */}
          {data.inspirations && (
            <div className="flex justify-between items-start">
              <span className="text-white/50 text-sm">Inspirations</span>
              <span className="text-white/80 font-light text-right max-w-xs text-sm">
                {data.inspirations}
              </span>
            </div>
          )}

          {/* Message si rien n'a été rempli */}
          {completedSteps === 0 && (
            <div className="text-center py-4">
              <p className="text-white/50 text-sm">
                Vous n&apos;avez pas encore complété d&apos;étapes, mais ce n&apos;est pas grave !
                <br />
                Je serais ravie de découvrir votre projet lors de notre échange.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* CTA Principal */}
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

        {/* CTA Secondaire - Modifier */}
        <button
          onClick={resetQualifier}
          className="group px-6 py-4 glass-dark hover:bg-white/5 transition-all duration-300 rounded-full"
        >
          <span className="text-white/60 group-hover:text-white text-sm font-medium transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Modifier mes choix
          </span>
        </button>
      </div>

      {/* Bouton retour */}
      <div className="text-center mt-6">
        <button
          onClick={goPrevious}
          className="text-white/40 hover:text-white/70 text-sm transition-colors flex items-center gap-2 mx-auto"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Modifier mes choix
        </button>
      </div>

      {/* Styles pour les animations du bouton vert */}
      <style jsx>{`
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

