'use client';

import { useState, useEffect, useRef } from 'react';
import { QualifierProvider, useQualifier } from './context';
import { CloseIcon } from './icons';

// Import des étapes
import IntroStep from './steps/IntroStep';
import ProjectTypeStep from './steps/ProjectTypeStep';
import FeaturesStep from './steps/FeaturesStep';
import DesignStyleStep from './steps/DesignStyleStep';
import AnimationLevelStep from './steps/AnimationLevelStep';
import BudgetStep from './steps/BudgetStep';
import DeadlineStep from './steps/DeadlineStep';
import AccompagnementStep from './steps/AccompagnementStep';
import InspirationsStep from './steps/InspirationsStep';
import QuoteRequestStep from './steps/QuoteRequestStep';

// Composant interne qui utilise le contexte
function QualifierContent({ onClose, onBack }: { onClose?: () => void; onBack?: () => void }) {
  const { currentStep } = useQualifier();
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevStep, setPrevStep] = useState(currentStep);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation de transition entre étapes + scroll vers le haut
  useEffect(() => {
    if (currentStep !== prevStep) {
      setIsAnimating(true);
      
      // Scroll vers le haut du questionnaire sur mobile
      if (containerRef.current) {
        const yOffset = -100; // Offset pour le header fixe
        const element = containerRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPrevStep(currentStep);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentStep, prevStep]);

  // Render de l'étape actuelle
  const renderStep = () => {
    switch (currentStep) {
      case 'intro':
        return <IntroStep />;
      case 'project-type':
        return <ProjectTypeStep />;
      case 'features':
        return <FeaturesStep />;
      case 'design-style':
        return <DesignStyleStep />;
      case 'animation-level':
        return <AnimationLevelStep />;
      case 'budget':
        return <BudgetStep />;
      case 'deadline':
        return <DeadlineStep />;
      case 'accompagnement':
        return <AccompagnementStep />;
      case 'inspirations':
        return <InspirationsStep />;
      case 'quote-request':
        return <QuoteRequestStep />;
      default:
        return <IntroStep />;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto">
      {/* Bouton retour aux options en haut (si onBack est fourni) */}
      {(onBack || (onClose && !onBack)) && (
        <div className="flex items-center justify-between mb-6">
          {onBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-primary/50 hover:text-primary transition-colors group text-sm"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux options
            </button>
          ) : (
            <div /> /* Spacer */
          )}

          {/* Bouton fermer (pour le mode modal) */}
          {onClose && !onBack && (
            <button
              onClick={onClose}
              className="p-2 text-primary/40 hover:text-primary transition-colors"
              aria-label="Fermer"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          )}
        </div>
      )}

      {/* Container avec animation */}
      <div 
        className={`
          transition-all duration-300 ease-out
          ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}
        `}
      >
        {renderStep()}
      </div>
    </div>
  );
}

// Props du composant principal
interface ProjectQualifierProps {
  /** Mode d'affichage : inline (dans la page) ou modal (en overlay) */
  mode?: 'inline' | 'modal';
  /** Callback quand on ferme le modal */
  onClose?: () => void;
  /** Callback pour revenir en arrière (vers les options de contact) */
  onBack?: () => void;
  /** Afficher le composant */
  isOpen?: boolean;
}

export default function ProjectQualifier({ 
  mode = 'inline', 
  onClose,
  onBack,
  isOpen = true 
}: ProjectQualifierProps) {
  // Mode inline : affichage direct
  if (mode === 'inline') {
    return (
      <QualifierProvider>
        <div className="w-full px-4">
          <QualifierContent onBack={onBack} />
        </div>
      </QualifierProvider>
    );
  }

  // Mode modal
  if (!isOpen) return null;

  return (
    <QualifierProvider>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-paper-light/95 backdrop-blur-xl"
          onClick={onClose}
        />
        
        {/* Container */}
        <div className="relative w-full max-h-[90vh] overflow-y-auto py-8 px-4">
          <QualifierContent onClose={onClose} onBack={onBack} />
        </div>
      </div>
    </QualifierProvider>
  );
}

// Export du hook et du provider pour une utilisation externe
export { useQualifier, QualifierProvider };



