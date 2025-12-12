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
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Quelles fonctionnalités vous intéressent ?
          </span>
        </h2>
        <p className="text-white/50 font-light">
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
                  ${isSelected ? 'text-secondary' : 'text-white/40 group-hover:text-secondary/60'}
                `}>
                  {IconComponent && <IconComponent className="w-6 h-6" />}
                </div>
                
                {/* Texte */}
                <span className="text-sm font-medium text-white">
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
          <label className="block text-sm text-white/60 mb-2">
            Précisez vos autres besoins :
          </label>
          <textarea
            value={data.featureOther}
            onChange={(e) => setFeatureOther(e.target.value)}
            placeholder="Décrivez les fonctionnalités spécifiques dont vous avez besoin..."
            className="w-full px-4 py-3 bg-primary-800/50 border border-primary-400/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-secondary transition-colors resize-none"
            rows={3}
          />
        </div>
      )}

      {/* Compteur de sélections */}
      {data.features.length > 0 && (
        <div className="text-center mt-6">
          <span className="inline-block px-4 py-2 glass-dark rounded-full text-sm">
            <span className="text-secondary font-semibold">{data.features.length}</span>
            <span className="text-white/50"> fonctionnalité{data.features.length > 1 ? 's' : ''} sélectionnée{data.features.length > 1 ? 's' : ''}</span>
          </span>
        </div>
      )}

      <NavigationButtons />
    </div>
  );
}

