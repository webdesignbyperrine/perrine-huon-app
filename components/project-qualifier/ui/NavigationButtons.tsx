'use client';

import { useQualifier } from '../context';
import { ArrowLeftIcon, ArrowRightIcon } from '../icons';

interface NavigationButtonsProps {
  showSkip?: boolean;
  nextLabel?: string;
  onNext?: () => void;
}

export default function NavigationButtons({ 
  showSkip = true, 
  nextLabel,
  onNext 
}: NavigationButtonsProps) {
  const { 
    currentStep, 
    canGoNext, 
    canGoPrevious, 
    goNext, 
    goPrevious, 
    skipStep,
    getStepNumber,
    getTotalSteps
  } = useQualifier();

  const stepNumber = getStepNumber();
  const totalSteps = getTotalSteps();
  const isLastStep = stepNumber === totalSteps;
  
  // Ne pas afficher sur l'intro
  if (currentStep === 'intro') {
    return null;
  }

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      goNext();
    }
  };

  const buttonLabel = nextLabel || 'Continuer';

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10">
      {/* Bouton précédent - Style tube en verre */}
      <button
        onClick={goPrevious}
        disabled={!canGoPrevious()}
        className="group relative order-2 sm:order-1 disabled:opacity-30 disabled:cursor-not-allowed transition-transform duration-300 hover:scale-[1.02]"
      >
        <div 
          className="relative flex items-center gap-3 px-8 py-4 rounded-full transition-transform duration-300"
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
          
          <ArrowLeftIcon className="relative z-10 w-5 h-5 text-white/70 group-hover:text-white transition-colors group-hover:-translate-x-1 duration-300" />
          <span className="relative z-10 text-white/70 group-hover:text-white text-sm font-semibold tracking-wide transition-colors">
            Retour
          </span>
        </div>
      </button>

      {/* Boutons de droite */}
      <div className="flex items-center gap-4 order-1 sm:order-2">
        {/* Bouton passer */}
        {showSkip && canGoNext() && (
          <button
            onClick={skipStep}
            className="px-4 py-3 text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            Je ne sais pas encore
          </button>
        )}

        {/* Bouton suivant - Style tube en verre avec liquide */}
        {canGoNext() && (
          <button
            onClick={handleNext}
            className="group/btn relative transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Tube en verre (conteneur) */}
            <div 
              className="relative flex items-center gap-3 px-10 py-4 rounded-full transition-transform duration-300"
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
              
              {/* Liquide (fond) avec animation */}
              <span 
                className="absolute inset-1 rounded-full pointer-events-none overflow-hidden liquid-container"
                style={{
                  background: 'linear-gradient(180deg, #476787 0%, var(--secondary) 50%, #1C2A35 100%)',
                  boxShadow: '0 0 20px rgba(47, 69, 88, 0.6), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
                }}
              >
                {/* Vague animée au hover */}
                <span className="liquid-wave absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100" />
                
                {/* Reflet sur le liquide */}
                <span 
                  className="absolute top-1 left-6 right-6 h-2 rounded-full transition-transform duration-500 group-hover/btn:translate-x-2"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)'
                  }}
                />
                
                {/* Bulles animées */}
                <span 
                  className="absolute w-2 h-2 rounded-full bg-white/30 bubble-1"
                  style={{ right: '12%', bottom: '25%' }}
                />
                <span 
                  className="absolute w-1.5 h-1.5 rounded-full bg-white/20 bubble-2"
                  style={{ right: '30%', bottom: '30%' }}
                />
                <span 
                  className="absolute w-1 h-1 rounded-full bg-white/25 bubble-3"
                  style={{ left: '15%', bottom: '20%' }}
                />
                
                {/* Shimmer effect au hover */}
                <span className="liquid-shimmer absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100" />
              </span>
              
              {/* Texte par-dessus */}
              <span className="relative z-10 text-white font-semibold tracking-wider uppercase drop-shadow-lg">
                {buttonLabel}
              </span>
              <ArrowRightIcon className="relative z-10 w-5 h-5 text-white group-hover/btn:translate-x-1 transition-transform duration-300 drop-shadow-lg" />
            </div>
          </button>
        )}
      </div>

      {/* Styles pour les animations */}
      <style jsx>{`
        /* Bulles avec animation de base */
        .bubble-1 {
          animation: bubble-float 2s ease-in-out infinite;
        }
        .bubble-2 {
          animation: bubble-float 2.5s ease-in-out infinite 0.3s;
        }
        .bubble-3 {
          animation: bubble-float 3s ease-in-out infinite 0.6s;
        }
        
        /* Animation des bulles accélérée au hover */
        .group\\/btn:hover .bubble-1 {
          animation: bubble-active 0.6s ease-in-out infinite;
        }
        .group\\/btn:hover .bubble-2 {
          animation: bubble-active 0.8s ease-in-out infinite 0.1s;
        }
        .group\\/btn:hover .bubble-3 {
          animation: bubble-active 0.7s ease-in-out infinite 0.2s;
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
        
        @keyframes bubble-active {
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
        
        /* Vague liquide */
        .liquid-wave {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.1) 25%,
            rgba(255,255,255,0.2) 50%,
            rgba(255,255,255,0.1) 75%,
            transparent 100%
          );
          animation: wave-move 1.5s ease-in-out infinite;
          transition: opacity 0.3s ease;
        }
        
        @keyframes wave-move {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(100%) skewX(-15deg);
          }
        }
        
        /* Shimmer effect */
        .liquid-shimmer {
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255,255,255,0.15) 40%,
            rgba(255,255,255,0.25) 50%,
            rgba(255,255,255,0.15) 60%,
            transparent 80%
          );
          animation: shimmer-move 2s ease-in-out infinite;
          transition: opacity 0.3s ease;
        }
        
        @keyframes shimmer-move {
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


