'use client';

import { useQualifier } from '../context';
import { BUDGET_OPTIONS, Budget } from '../types';
import SelectionCard from '../ui/SelectionCard';
import NavigationButtons from '../ui/NavigationButtons';
import ProgressBar from '../ui/ProgressBar';
import { EuroIcon } from '../icons';

export default function BudgetStep() {
  const { data, setBudget, goNext } = useQualifier();

  const handleSelect = (budget: Budget) => {
    setBudget(budget);
    // Auto-advance après sélection avec animation
    setTimeout(() => goNext(), 150);
  };

  // Nombre d'icônes € selon le budget
  const euroCount: Record<Budget, number> = {
    petit: 1,
    moyen: 2,
    confortable: 3,
    large: 4,
  };

  return (
    <div className="py-4">
      <ProgressBar />
      
      {/* Titre */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Quel est votre budget estimé ?
        </h2>
        <p className="text-primary/50 font-light">
          Cette information m&apos;aide à adapter ma proposition à vos moyens
        </p>
      </div>

      {/* Options */}
      <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {BUDGET_OPTIONS.map((budget) => (
          <SelectionCard
            key={budget.value}
            selected={data.budget === budget.value}
            onClick={() => handleSelect(budget.value)}
            showCheck={false}
          >
            <div className="flex flex-col items-start gap-4">
              {/* Indicateur visuel - Pictos euros */}
              <div className="flex gap-2">
                {Array.from({ length: euroCount[budget.value] }).map((_, i) => (
                  <EuroIcon 
                    key={i} 
                    className={`w-8 h-8 ${
                      data.budget === budget.value 
                        ? 'text-accent' 
                        : 'text-[#ff4d9a] group-hover:text-accent'
                    } transition-colors duration-300`}
                  />
                ))}
              </div>
              
              {/* Texte */}
              <div>
                <p className="text-accent text-lg font-bold mb-1">
                  {budget.range}
                </p>
                <p className="text-sm text-primary/70 font-medium">
                  {budget.description}
                </p>
              </div>
            </div>
          </SelectionCard>
        ))}
      </div>

      {/* Note de confidentialité */}
      <div className="text-center mt-6">
        <p className="text-xs text-primary/60 font-medium">
          🔒 Ces informations restent confidentielles et servent uniquement à personnaliser ma proposition
        </p>
      </div>

      <NavigationButtons />
    </div>
  );
}



