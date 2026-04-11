'use client';

import { useTranslations } from 'next-intl';
import { useQualifier } from '../context';
import { DESIGN_STYLES } from '../types';
import { MoodboardCard } from '../ui/SelectionCard';
import NavigationButtons from '../ui/NavigationButtons';
import ProgressBar from '../ui/ProgressBar';

export default function DesignStyleStep() {
  const t = useTranslations('qualifier.designStyle');
  const { data, setDesignStyle, goNext } = useQualifier();

  const handleSelect = (style: typeof data.designStyle) => {
    setDesignStyle(style);
    // Auto-advance après sélection avec animation
    setTimeout(() => goNext(), 150);
  };

  return (
    <div className="py-4">
      <ProgressBar />
      
      {/* Titre */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          {t('title')}
        </h2>
        <p className="text-primary/50 font-light">
          {t('subtitle')}
        </p>
      </div>

      {/* Grille de moodboards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {DESIGN_STYLES.map((style) => (
          <MoodboardCard
            key={style.value}
            selected={data.designStyle === style.value}
            onClick={() => handleSelect(style.value)}
            label={t(`options.${style.value}.label`)}
            description={t(`options.${style.value}.description`)}
            colors={style.colors}
            showCheck={false}
          />
        ))}
      </div>

      <NavigationButtons />
    </div>
  );
}



