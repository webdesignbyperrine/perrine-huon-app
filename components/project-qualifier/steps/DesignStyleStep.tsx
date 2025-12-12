'use client';

import { useQualifier } from '../context';
import { DESIGN_STYLES } from '../types';
import { MoodboardCard } from '../ui/SelectionCard';
import NavigationButtons from '../ui/NavigationButtons';
import ProgressBar from '../ui/ProgressBar';

export default function DesignStyleStep() {
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
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Quel style de design vous attire ?
          </span>
        </h2>
        <p className="text-white/50 font-light">
          Choisissez l&apos;ambiance visuelle qui vous correspond
        </p>
      </div>

      {/* Grille de moodboards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {DESIGN_STYLES.map((style) => (
          <MoodboardCard
            key={style.value}
            selected={data.designStyle === style.value}
            onClick={() => handleSelect(style.value)}
            label={style.label}
            description={style.description}
            colors={style.colors}
            showCheck={false}
          />
        ))}
      </div>

      <NavigationButtons />
    </div>
  );
}

