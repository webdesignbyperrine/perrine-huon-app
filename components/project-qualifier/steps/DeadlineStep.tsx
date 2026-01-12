'use client';

import { useQualifier } from '../context';
import { DEADLINE_OPTIONS, Deadline } from '../types';
import SelectionCard from '../ui/SelectionCard';
import NavigationButtons from '../ui/NavigationButtons';
import ProgressBar from '../ui/ProgressBar';
import { LightningIcon, ClockIcon, LeafIcon, InfinityIcon } from '../icons';

export default function DeadlineStep() {
  const { data, setDeadline, goNext } = useQualifier();

  const handleSelect = (deadline: Deadline) => {
    setDeadline(deadline);
    // Auto-advance après sélection avec animation
    setTimeout(() => goNext(), 150);
  };

  // Icônes différentes pour chaque délai
  const deadlineIcons: Record<Deadline, React.ReactNode> = {
    urgent: <LightningIcon className="w-8 h-8" />,
    standard: <ClockIcon className="w-8 h-8" />,
    flexible: <LeafIcon className="w-8 h-8" />,
    'pas-contrainte': <InfinityIcon className="w-8 h-8" />,
  };

  return (
    <div className="py-4">
      <ProgressBar />
      
      {/* Titre */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Quels sont vos délais ?
        </h2>
        <p className="text-primary/50 font-light">
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
                  ? 'text-accent' 
                  : 'text-[#ff4d9a] group-hover:text-accent'
                }
              `}>
                {deadlineIcons[deadline.value]}
              </div>
              
              {/* Texte */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-1">
                  {deadline.label}
                </h3>
                <p className="text-sm text-primary/70 font-medium">
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



