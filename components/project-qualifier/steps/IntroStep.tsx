'use client';

import { useTranslations } from 'next-intl';
import { useQualifier } from '../context';
import { ArrowRightIcon } from '../icons';
import Image from 'next/image';

export default function IntroStep() {
  const t = useTranslations('qualifier.intro');
  const { goNext, getCompletedSteps, resetQualifier } = useQualifier();
  const completedSteps = getCompletedSteps();
  const hasProgress = completedSteps > 0;

  const handleRestart = () => {
    resetQualifier();
  };

  return (
    <div className="py-8">
      {/* Carte principale */}
      <div className="relative bg-paper border-2 border-primary/10 rounded-sketch-xl overflow-hidden max-w-3xl mx-auto hover:border-primary/20 transition-colors duration-300">
        {/* Contenu */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
          {/* Icône décorative */}
          <div className="w-20 h-20 mx-auto mb-8 bg-primary/5 border-2 border-primary/20 rounded-full flex items-center justify-center">
            <Image 
              src="/images/aiguille.png" 
              alt={t('imageAlt')} 
              width={40} 
              height={40}
              className="w-10 h-10"
              style={{ 
                filter: 'brightness(0) saturate(100%) invert(30%) sepia(50%) saturate(600%) hue-rotate(175deg) brightness(90%) contrast(90%)'
              }}
            />
          </div>

          {/* Titre */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            {t('titleLine1')}
            <br />
            <span className="text-primary/60">{t('titleLine2')}</span>
          </h2>
          
          <p className="text-lg md:text-xl text-primary/50 max-w-xl mx-auto mb-10">
            {t('subtitle')}
          </p>

          {/* Si progression existante - badge discret */}
          {hasProgress && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border-2 border-primary/10 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span className="text-sm text-primary/60">
                {t('stepsCompleted', { count: completedSteps })}
              </span>
            </div>
          )}

          {/* Bouton CTA */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={goNext}
              className="btn-cta btn-cta-pulse group inline-flex items-center gap-3"
            >
              <span>{hasProgress ? t('resume') : t('defineNeeds')}</span>
              <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Bouton recommencer si progression existante */}
            {hasProgress && (
              <button
                onClick={handleRestart}
                className="group flex items-center gap-2 text-primary/40 hover:text-primary/70 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t('restartFromZero')}
              </button>
            )}
          </div>

          {/* Badge gratuit */}
          <p className="mt-8 text-primary/40 text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {t('badge')}
          </p>
        </div>
      </div>
    </div>
  );
}
