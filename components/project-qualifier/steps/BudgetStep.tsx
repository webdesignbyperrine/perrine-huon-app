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
            <div className="pr-8">
              {/* Indicateur visuel */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: euroCount[budget.value] }).map((_, i) => (
                  <EuroIcon 
                    key={i} 
                    className={`w-5 h-5 ${
                      data.budget === budget.value 
                        ? 'text-accent' 
                        : 'text-primary/30 group-hover:text-accent/60'
                    } transition-colors duration-300`}
                  />
                ))}
                {Array.from({ length: 4 - euroCount[budget.value] }).map((_, i) => (
                  <EuroIcon 
                    key={i + euroCount[budget.value]} 
                    className="w-5 h-5 text-primary/10" 
                  />
                ))}
              </div>
              
              {/* Texte */}
              <h3 className="text-lg font-semibold text-primary mb-1">
                {budget.label}
              </h3>
              <p className="text-accent text-sm font-medium mb-2">
                {budget.range}
              </p>
              <p className="text-sm text-primary/40 font-light">
                {budget.description}
              </p>
            </div>
          </SelectionCard>
        ))}
      </div>

      {/* Note de confidentialité */}
      <div className="text-center mt-6">
        <p className="text-xs text-primary/30">
          🔒 Ces informations restent confidentielles et servent uniquement à personnaliser ma proposition
        </p>
      </div>

      <NavigationButtons />
    </div>
  );
}



