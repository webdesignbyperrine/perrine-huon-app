'use client';

import { useQualifier } from '../context';

export default function ProgressBar() {
  const { getStepNumber, getTotalSteps, currentStep } = useQualifier();
  
  // Ne pas afficher sur l'intro
  if (currentStep === 'intro') {
    return null;
  }

  const stepNumber = getStepNumber();
  const totalSteps = getTotalSteps();
  
  // Calcul du remplissage par étape
  const fillPercentage = (stepNumber / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Indicateur d'étape */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-primary/50 font-light">
          Étape {stepNumber}/{totalSteps} <span className="text-primary/30">(facultative)</span>
        </span>
      </div>
      
      {/* Barre de progression */}
      <div className="relative h-3 bg-primary/10 rounded-full overflow-hidden">
        {/* Remplissage rose */}
        <div 
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{ 
            width: `${fillPercentage}%`,
            minWidth: fillPercentage > 0 ? '12px' : '0',
            background: '#ff0f7c',
          }}
        >
          {/* Effet de brillance */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)'
            }}
          />
        </div>
        
        {/* Marqueurs d'étapes */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: totalSteps - 1 }).map((_, index) => (
            <div
              key={index}
              className="flex-1 border-r border-primary/20"
            />
          ))}
          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
}
