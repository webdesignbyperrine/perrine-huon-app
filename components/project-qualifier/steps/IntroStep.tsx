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
    <div className="text-center py-8">
      {/* Icône décorative */}
      <div className="relative inline-block mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-accent-red to-accent-orange rounded-full blur-2xl opacity-30" />
        <div className="relative w-24 h-24 glass-dark rounded-full flex items-center justify-center">
          <SparklesIcon className="w-12 h-12 text-secondary" />
        </div>
      </div>

      {/* Titre */}
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
          Parlons de votre projet
        </span>
        <br />
        <span className="bg-gradient-to-r from-secondary via-accent-orange to-accent-red bg-clip-text text-transparent text-glow">
          en 2 minutes
        </span>
      </h2>

      {/* Sous-titre */}
      <p className="text-lg md:text-xl text-white/60 max-w-lg mx-auto mb-8 font-light leading-relaxed">
        Répondez à quelques questions pour m&apos;aider à comprendre vos besoins et recevoir une estimation personnalisée.
      </p>

      {/* Info sur les étapes facultatives */}
      <div className="glass-dark rounded-xl p-4 max-w-md mx-auto mb-10">
        <p className="text-sm text-white/50">
          <span className="text-secondary">✨ Toutes les étapes sont facultatives</span>
          <br />
          Passez celles qui ne vous concernent pas
        </p>
      </div>

      {/* Si progression existante */}
      {hasProgress && (
        <div className="glass-dark rounded-xl p-4 max-w-md mx-auto mb-6 border border-secondary/30">
          <p className="text-sm text-white/70 mb-2">
            Vous avez déjà complété{' '}
            <span className="text-secondary font-semibold">{completedSteps} étape{completedSteps > 1 ? 's' : ''}</span>
          </p>
          <p className="text-xs text-white/40">
            Votre progression a été sauvegardée
          </p>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button
          onClick={goNext}
          className="group/cta relative transition-transform duration-300 hover:scale-[1.02]"
        >
          <div 
            className="relative flex items-center gap-3 px-12 py-5 rounded-full"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            <span 
              className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }}
            />
            <span 
              className="absolute inset-1 rounded-full pointer-events-none overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #476787 0%, var(--secondary) 50%, #1C2A35 100%)',
                boxShadow: '0 0 20px rgba(47, 69, 88, 0.6), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
              }}
            >
              <span 
                className="absolute top-1 left-6 right-6 h-2 rounded-full transition-transform duration-500 group-hover/cta:translate-x-2"
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)' }}
              />
            </span>
            <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm drop-shadow-lg">
              {hasProgress ? 'Reprendre' : 'Commencer'}
            </span>
            <ArrowRightIcon className="relative z-10 w-5 h-5 text-white group-hover/cta:translate-x-1 transition-transform drop-shadow-lg" />
          </div>
        </button>

        {/* Bouton recommencer si progression existante */}
        {hasProgress && (
          <button
            onClick={handleRestart}
            className="group px-8 py-5 glass-dark hover:bg-white/5 transition-all duration-300"
          >
            <span className="text-white/60 group-hover:text-white text-sm font-medium transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Recommencer à zéro
            </span>
          </button>
        )}
      </div>

      {/* Temps estimé */}
      <p className="text-sm text-white/30 mt-6">
        ⏱ Environ 2 minutes
      </p>
    </div>
  );
}

