'use client';

import { useQualifier } from '../context';
import { DEADLINE_OPTIONS, Deadline } from '../types';
import SelectionCard from '../ui/SelectionCard';
import NavigationButtons from '../ui/NavigationButtons';
import ProgressBar from '../ui/ProgressBar';
import { ClockIcon } from '../icons';

export default function DeadlineStep() {
  const { data, setDeadline, goNext } = useQualifier();

  const handleSelect = (deadline: Deadline) => {
    setDeadline(deadline);
    // Auto-advance après sélection avec animation
    setTimeout(() => goNext(), 150);
  };

  // Couleurs selon l'urgence
  const urgencyColors: Record<Deadline, string> = {
    urgent: 'text-accent-red',
    standard: 'text-accent-orange',
    flexible: 'text-secondary',
    'pas-contrainte': 'text-accent-blue',
  };

  return (
    <div className="py-4">
      <ProgressBar />
      
      {/* Titre */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Quels sont vos délais ?
          </span>
        </h2>
        <p className="text-white/50 font-light">
          Une deadline réaliste permet un travail de qualité
        </p>
      </div>

      {/* Options */}
      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {DEADLINE_OPTIONS.map((deadline) => (
          <SelectionCard
            key={deadline.value}
            selected={data.deadline === deadline.value}
            onClick={() => handleSelect(deadline.value)}
            showCheck={false}
          >
            <div className="flex items-center gap-4 pr-8">
              {/* Icône */}
              <div className={`
                flex-shrink-0 transition-colors duration-300
                ${data.deadline === deadline.value 
                  ? urgencyColors[deadline.value] 
                  : 'text-white/30 group-hover:text-white/50'
                }
              `}>
                <ClockIcon className="w-8 h-8" />
              </div>
              
              {/* Texte */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {deadline.label}
                </h3>
                <p className="text-sm text-white/50 font-light">
                  {deadline.description}
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


