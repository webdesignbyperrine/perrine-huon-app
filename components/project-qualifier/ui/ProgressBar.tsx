'use client';

import { useQualifier } from '../context';

export default function ProgressBar() {
  const { getProgress, getStepNumber, getTotalSteps, currentStep } = useQualifier();
  
  // Ne pas afficher sur l'intro et le summary
  if (currentStep === 'intro' || currentStep === 'summary') {
    return null;
  }

  const progress = getProgress();
  const stepNumber = getStepNumber();
  const totalSteps = getTotalSteps();

  return (
    <div className="w-full mb-8">
      {/* Indicateur d'étape */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-white/50 font-light">
          Étape {stepNumber}/{totalSteps} <span className="text-white/30">(facultative)</span>
        </span>
        <span className="text-sm text-secondary font-medium">
          {Math.round(progress)}%
        </span>
      </div>
      
      {/* Barre de progression */}
      <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-secondary via-accent-red to-accent-orange rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
        
        {/* Effet de brillance */}
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full transition-all duration-500 ease-out animate-pulse"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Points d'étape */}
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index < stepNumber
                ? 'bg-secondary'
                : index === stepNumber
                ? 'bg-secondary animate-pulse'
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

