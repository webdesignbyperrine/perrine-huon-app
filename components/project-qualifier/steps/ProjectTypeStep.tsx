'use client';

import { useTranslations } from 'next-intl';
import { useQualifier } from '../context';
import { PROJECT_TYPES } from '../types';
import SelectionCard from '../ui/SelectionCard';
import NavigationButtons from '../ui/NavigationButtons';
import ProgressBar from '../ui/ProgressBar';
import { ICON_MAP } from '../icons';

export default function ProjectTypeStep() {
  const t = useTranslations('qualifier.projectType');
  const { data, setProjectType, goNext } = useQualifier();

  const handleSelect = (type: typeof data.projectType) => {
    setProjectType(type);
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

      {/* Grille de sélection */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROJECT_TYPES.map((projectType) => {
          const IconComponent = ICON_MAP[projectType.icon];
          return (
            <SelectionCard
              key={projectType.value}
              selected={data.projectType === projectType.value}
              onClick={() => handleSelect(projectType.value)}
              showCheck={false}
            >
              <div className="pr-8">
                {/* Icône */}
                <div className={`
                  transition-colors duration-300 mb-4
                  ${data.projectType === projectType.value 
                    ? 'text-accent' 
                    : 'text-accent-light group-hover:text-accent'
                  }
                `}>
                  {IconComponent && <IconComponent className="w-10 h-10" />}
                </div>
                
                {/* Texte */}
                <h3 className="text-base font-bold text-primary mb-1">
                  {t(`options.${projectType.value}.label`)}
                </h3>
                <p className="text-sm text-primary/70 font-medium">
                  {t(`options.${projectType.value}.description`)}
                </p>
              </div>
            </SelectionCard>
          );
        })}
      </div>

      <NavigationButtons />
    </div>
  );
}



