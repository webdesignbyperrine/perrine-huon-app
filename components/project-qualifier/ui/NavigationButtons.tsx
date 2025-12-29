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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
      {/* Bouton précédent */}
      <button
        onClick={goPrevious}
        disabled={!canGoPrevious()}
        className="btn-sketch group order-2 sm:order-1 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Retour</span>
      </button>

      {/* Boutons de droite */}
      <div className="flex items-center gap-4 order-1 sm:order-2">
        {/* Bouton passer */}
        {showSkip && canGoNext() && (
          <button
            onClick={skipStep}
            className="px-4 py-3 text-primary/40 hover:text-primary/70 text-sm transition-colors"
          >
            Je ne sais pas encore
          </button>
        )}

        {/* Bouton suivant */}
        {canGoNext() && (
          <button
            onClick={handleNext}
            className="btn-cta btn-cta-pulse group inline-flex items-center gap-2"
          >
            <span>{buttonLabel}</span>
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        )}
      </div>
    </div>
  );
}
