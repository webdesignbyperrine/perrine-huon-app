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
        <span className="text-sm text-white/50 font-light">
          Étape {stepNumber}/{totalSteps} <span className="text-white/30">(facultative)</span>
        </span>
      </div>
      
      {/* Tube de verre avec liquide */}
      <div className="relative h-6 rounded-full overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.15)'
        }}
      >
        {/* Reflet du verre en haut */}
        <div 
          className="absolute top-0 left-0 right-0 h-2 rounded-t-full"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)'
          }}
        />
        
        {/* Liquide vert qui remplit - Même vert que le bouton CTA */}
        <div 
          className="absolute inset-y-1 left-1 rounded-full transition-all duration-700 ease-out"
          style={{ 
            width: `calc(${fillPercentage}% - 8px)`,
            minWidth: fillPercentage > 0 ? '20px' : '0',
            background: 'linear-gradient(180deg, #22A06B 0%, #1B8A5A 50%, #14694A 100%)',
            boxShadow: '0 0 15px rgba(27, 138, 90, 0.4), inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.2)'
          }}
        >
          {/* Reflet sur le liquide */}
          <div 
            className="absolute top-0.5 left-2 right-2 h-1.5 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)'
            }}
          />
          
          {/* Bulles animées dans le liquide */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div 
              className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
              style={{
                right: '10%',
                bottom: '20%',
                animation: 'bubble 2s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{
                right: '25%',
                bottom: '30%',
                animation: 'bubble 2.5s ease-in-out infinite 0.5s'
              }}
            />
            <div 
              className="absolute w-1 h-1 rounded-full bg-white/25"
              style={{
                right: '40%',
                bottom: '25%',
                animation: 'bubble 3s ease-in-out infinite 1s'
              }}
            />
          </div>
          
          {/* Effet de vague au bout du liquide */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-3 rounded-r-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.2) 100%)',
              animation: 'wave 1.5s ease-in-out infinite'
            }}
          />
        </div>
        
        {/* Marqueurs d'étapes sur le tube */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: totalSteps - 1 }).map((_, index) => (
            <div
              key={index}
              className="flex-1 border-r border-white/10"
            />
          ))}
          <div className="flex-1" />
        </div>
      </div>

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes bubble {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-3px) scale(1.1);
            opacity: 0.5;
          }
        }
        @keyframes wave {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}


