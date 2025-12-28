'use client';

import { useQualifier } from '../context';
import { ACCOMPAGNEMENT_OPTIONS, AccompagnementLevel } from '../types';
import SelectionCard from '../ui/SelectionCard';
import NavigationButtons from '../ui/NavigationButtons';
import ProgressBar from '../ui/ProgressBar';
import { HandshakeIcon } from '../icons';

export default function AccompagnementStep() {
  const { data, setAccompagnement, goNext } = useQualifier();

  const handleSelect = (level: AccompagnementLevel) => {
    setAccompagnement(level);
    // Auto-advance après sélection avec animation
    setTimeout(() => goNext(), 150);
  };

  // Icônes personnalisées pour chaque niveau
  const accompagnementIcons: Record<AccompagnementLevel, React.ReactNode> = {
    autonomie: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    formation: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    maintenance: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    partenariat: <HandshakeIcon className="w-8 h-8" />,
  };

  return (
    <div className="py-4">
      <ProgressBar />
      
      {/* Titre */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Quel niveau d&apos;accompagnement souhaitez-vous ?
        </h2>
        <p className="text-primary/50 font-light">
          Je m&apos;adapte à vos besoins après la livraison
        </p>
      </div>

      {/* Options */}
      <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {ACCOMPAGNEMENT_OPTIONS.map((option) => (
          <SelectionCard
            key={option.value}
            selected={data.accompagnement === option.value}
            onClick={() => handleSelect(option.value)}
            showCheck={false}
          >
            <div className="flex items-start gap-4 pr-8">
              {/* Icône */}
              <div className={`
                flex-shrink-0 mt-1 transition-colors duration-300
                ${data.accompagnement === option.value 
                  ? 'text-accent' 
                  : 'text-primary/30 group-hover:text-accent/60'
                }
              `}>
                {accompagnementIcons[option.value]}
              </div>
              
              {/* Texte */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-1">
                  {option.label}
                </h3>
                <p className="text-sm text-primary/50 font-light">
                  {option.description}
                </p>
              </div>
            </div>
          </SelectionCard>
        ))}
      </div>

      <NavigationButtons />
    </div>
  );
}



