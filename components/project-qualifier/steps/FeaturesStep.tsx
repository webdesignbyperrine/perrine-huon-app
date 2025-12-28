'use client';

import { useQualifier } from '../context';
import { FEATURES_OPTIONS } from '../types';
import { MultiSelectCard } from '../ui/SelectionCard';
import NavigationButtons from '../ui/NavigationButtons';
import ProgressBar from '../ui/ProgressBar';
import { ICON_MAP } from '../icons';

export default function FeaturesStep() {
  const { data, toggleFeature, setFeatureOther } = useQualifier();

  return (
    <div className="py-4">
      <ProgressBar />
      
      {/* Titre */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Quelles fonctionnalités vous intéressent ?
        </h2>
        <p className="text-primary/50 font-light">
          Sélectionnez autant d&apos;options que vous le souhaitez
        </p>
      </div>

      {/* Grille de sélection */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {FEATURES_OPTIONS.map((feature) => {
          const IconComponent = ICON_MAP[feature.icon];
          const isSelected = data.features.includes(feature.value);
          
          return (
            <MultiSelectCard
              key={feature.value}
              selected={isSelected}
              onClick={() => toggleFeature(feature.value)}
            >
              <div className="flex items-center gap-3 pr-8">
                {/* Icône */}
                <div className={`
                  flex-shrink-0 transition-colors duration-300
                  ${isSelected ? 'text-accent' : 'text-primary/40 group-hover:text-accent/60'}
                `}>
                  {IconComponent && <IconComponent className="w-6 h-6" />}
                </div>
                
                {/* Texte */}
                <span className="text-sm font-medium text-primary">
                  {feature.label}
                </span>
              </div>
            </MultiSelectCard>
          );
        })}
      </div>

      {/* Champ "Autre" si sélectionné */}
      {data.features.includes('autre') && (
        <div className="mt-6">
          <label className="block text-sm text-primary/60 mb-2">
            Précisez vos autres besoins :
          </label>
          <textarea
            value={data.featureOther}
            onChange={(e) => setFeatureOther(e.target.value)}
            placeholder="Décrivez les fonctionnalités spécifiques dont vous avez besoin..."
            className="input-sketch w-full resize-none"
            rows={3}
          />
        </div>
      )}

      <NavigationButtons />
    </div>
  );
}



