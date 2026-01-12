'use client';

import { useQualifier } from '../context';
import { STEPS_ORDER } from '../types';

export default function ProgressBar() {
  const { getStepNumber, getTotalSteps, currentStep, goToStep } = useQualifier();
  
  // Ne pas afficher sur l'intro
  if (currentStep === 'intro') {
    return null;
  }

  const stepNumber = getStepNumber();
  const totalSteps = getTotalSteps();
  
  // Calcul du remplissage par étape
  const fillPercentage = (stepNumber / totalSteps) * 100;

  // Gérer le clic sur une étape (index 0 = première étape visible, qui est STEPS_ORDER[1])
  const handleStepClick = (stepIndex: number) => {
    // stepIndex est de 0 à totalSteps-1, mais STEPS_ORDER commence à 1 (on skip intro)
    const targetStep = STEPS_ORDER[stepIndex + 1]; // +1 car on skip l'intro
    if (targetStep && targetStep !== 'quote-request') {
      goToStep(targetStep);
    }
  };

  return (
    <div className="w-full mb-8">
      {/* Indicateur d'étape */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-primary/50 font-light">
          Étape {stepNumber}/{totalSteps} <span className="text-primary/30">(facultative)</span>
        </span>
      </div>
      
      {/* Barre de progression - cliquable */}
      <div className="relative h-3 bg-primary/10 rounded-full overflow-hidden">
        {/* Remplissage rose */}
        <div 
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out pointer-events-none"
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
        
        {/* Zones cliquables pour chaque étape */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isCurrentOrPast = index + 1 <= stepNumber;
            const isLast = index === totalSteps - 1;
            
            return (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`
                  flex-1 h-full transition-all duration-200 
                  ${!isLast ? 'border-r border-primary/20' : ''}
                  ${isCurrentOrPast 
                    ? 'hover:bg-white/20 cursor-pointer' 
                    : 'hover:bg-primary/10 cursor-pointer'
                  }
                `}
                title={`Aller à l'étape ${index + 1}`}
                aria-label={`Aller à l'étape ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
