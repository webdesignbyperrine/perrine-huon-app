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
  
  // Ne pas afficher sur l'intro et le summary
  if (currentStep === 'intro' || currentStep === 'summary') {
    return null;
  }

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      goNext();
    }
  };

  const buttonLabel = nextLabel || (isLastStep ? 'Voir mon récapitulatif' : 'Suivant');

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10">
      {/* Bouton précédent */}
      <button
        onClick={goPrevious}
        disabled={!canGoPrevious()}
        className={`
          group flex items-center gap-2 px-6 py-3 
          glass-dark hover:bg-white/5 
          transition-all duration-300
          disabled:opacity-30 disabled:cursor-not-allowed
          order-2 sm:order-1
        `}
      >
        <ArrowLeftIcon className="w-4 h-4 text-white/60 group-hover:text-white transition-colors group-hover:-translate-x-1 duration-300" />
        <span className="text-white/60 group-hover:text-white text-sm font-medium transition-colors">
          Précédent
        </span>
      </button>

      {/* Boutons de droite */}
      <div className="flex items-center gap-3 order-1 sm:order-2">
        {/* Bouton passer */}
        {showSkip && canGoNext() && (
          <button
            onClick={skipStep}
            className="px-4 py-3 text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            Passer cette étape
          </button>
        )}

        {/* Bouton suivant */}
        {canGoNext() && (
          <button
            onClick={handleNext}
            className={`
              group relative px-8 py-3 overflow-hidden
              ${isLastStep 
                ? 'bg-gradient-to-r from-secondary via-accent-red to-accent-orange' 
                : 'glass-dark hover:bg-white/5'
              }
              transition-all duration-300
            `}
          >
            {isLastStep && (
              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-accent-red to-accent-orange blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
            )}
            <span className={`
              relative z-10 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase
              ${isLastStep ? 'text-white' : 'text-white/80 group-hover:text-white'}
              transition-colors
            `}>
              {buttonLabel}
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

