'use client';

import { useQualifier } from '../context';
import { SparklesIcon, ArrowRightIcon } from '../icons';

export default function IntroStep() {
  const { goNext, getCompletedSteps, resetQualifier } = useQualifier();
  const completedSteps = getCompletedSteps();
  const hasProgress = completedSteps > 0;

  const handleRestart = () => {
    resetQualifier();
  };

  return (
    <div className="py-8">
      {/* Carte principale avec effet verre */}
      <div 
        className="relative rounded-2xl overflow-hidden max-w-3xl mx-auto"
        style={{
          background: 'linear-gradient(135deg, rgba(13, 26, 45, 0.95) 0%, rgba(15, 27, 46, 0.98) 50%, rgba(10, 22, 40, 0.95) 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(107, 142, 200, 0.15)'
        }}
      >
        {/* Reflet supérieur subtil */}
        <div 
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%)',
            borderRadius: '1rem 1rem 0 0'
          }}
        />

        {/* Contenu */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
          {/* Icône décorative */}
          <div 
            className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 27, 46, 0.9) 0%, rgba(10, 22, 40, 0.95) 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 20px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(107, 142, 200, 0.2)'
            }}
          >
            <SparklesIcon className="w-10 h-10 text-white/80" />
          </div>

          {/* Titre */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Votre projet web
            </span>
            <br />
            <span className="bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent">
              conçu sur-mesure
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-10 font-light">
            On fait le point en 2 min ?
          </p>

          {/* Si progression existante - badge discret */}
          {hasProgress && (
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(47, 69, 88, 0.3)',
                border: '1px solid rgba(107, 142, 200, 0.2)'
              }}
            >
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="text-sm text-white/60">
                {completedSteps} étape{completedSteps > 1 ? 's' : ''} complétée{completedSteps > 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Bouton CTA - Style tube en verre */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={goNext}
              className="group/cta relative transition-transform duration-300 hover:scale-[1.03]"
            >
              <div 
                className="relative flex items-center gap-4 px-10 md:px-14 py-5 md:py-6 rounded-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, rgba(0,0,0,0.15) 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.18)'
                }}
              >
                {/* Reflet du verre */}
                <span 
                  className="absolute top-0 left-8 right-8 h-3 rounded-t-full pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)' }}
                />
                
                {/* Liquide - Dégradé vert/bleu */}
                <span 
                  className="absolute inset-1 rounded-full pointer-events-none overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, #1a5a54 0%, #2F4558 40%, #0d433e 70%, #1C2A35 100%)',
                    boxShadow: '0 0 30px rgba(13, 67, 62, 0.5), inset 0 3px 6px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Petites bulles décoratives */}
                  <span 
                    className="absolute bottom-3 left-1/4 w-1.5 h-1.5 rounded-full bg-white/20"
                  />
                  <span 
                    className="absolute bottom-4 left-1/2 w-1 h-1 rounded-full bg-white/15"
                  />
                  <span 
                    className="absolute bottom-2 right-1/3 w-1.5 h-1.5 rounded-full bg-white/20"
                  />
                  
                  {/* Reflet animé dans le liquide */}
                  <span 
                    className="absolute top-1 left-8 right-8 h-3 rounded-full transition-transform duration-500 group-hover/cta:translate-x-3"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 30%, rgba(255,255,255,0.35) 70%, transparent 100%)' }}
                  />
                </span>
                
                <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm md:text-base drop-shadow-lg">
                  {hasProgress ? 'Reprendre' : 'Définir mes besoins'}
                </span>

                {/* Flèche */}
                <ArrowRightIcon className="relative z-10 w-5 h-5 text-white/80 transition-transform duration-300 group-hover/cta:translate-x-1 drop-shadow-lg" />
              </div>
            </button>

            {/* Bouton recommencer si progression existante */}
            {hasProgress && (
              <button
                onClick={handleRestart}
                className="group flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Recommencer à zéro
              </button>
            )}
          </div>

          {/* Badge gratuit */}
          <p className="mt-8 text-white/40 text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Gratuit • Sans engagement
          </p>
        </div>
      </div>
    </div>
  );
}
