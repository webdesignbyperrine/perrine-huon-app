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
    resetQualifier,
    getCompletedSteps
  } = useQualifier();

  const hasProgress = getCompletedSteps() > 0;
  
  // Ne pas afficher sur l'intro
  if (currentStep === 'intro') return null;

  const handleNext = onNext ?? goNext;
  const buttonLabel = nextLabel ?? 'Continuer';

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
      {/* Boutons de gauche */}
      <div className="flex items-center gap-3 order-2 sm:order-1">
        {/* Bouton précédent */}
        <button
          onClick={goPrevious}
          disabled={!canGoPrevious()}
          className="btn-sketch group disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Retour</span>
        </button>

        {/* Bouton recommencer (icône seule) */}
        {hasProgress && (
          <button
            onClick={resetQualifier}
            className="p-3 rounded-full border-2 border-primary/20 text-primary/40 hover:text-accent hover:border-accent/30 transition-all duration-300 group"
            title="Recommencer à zéro"
            aria-label="Recommencer à zéro"
          >
            <svg 
              className="w-5 h-5 group-hover:rotate-[-360deg] transition-transform duration-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        )}
      </div>

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
