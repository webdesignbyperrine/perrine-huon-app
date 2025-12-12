'use client';

import { ReactNode } from 'react';
import { CheckIcon } from '../icons';

interface SelectionCardProps {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
  className?: string;
  showCheck?: boolean;
}

export default function SelectionCard({
  children,
  selected,
  onClick,
  className = '',
  showCheck = true,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative text-left w-full p-6 
        glass-dark rounded-2xl
        border-2 transition-all duration-300
        hover:bg-white/5 hover:scale-[1.02]
        focus:outline-none focus:ring-2 focus:ring-secondary/50
        ${selected 
          ? 'border-secondary bg-secondary/10' 
          : 'border-transparent hover:border-white/10'
        }
        ${className}
      `}
    >
      {/* Indicateur de sélection */}
      {showCheck && (
        <div className={`
          absolute top-4 right-4 w-6 h-6 rounded-full
          flex items-center justify-center
          transition-all duration-300
          ${selected 
            ? 'bg-secondary text-white scale-100' 
            : 'bg-white/10 text-white/30 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100'
          }
        `}>
          <CheckIcon className="w-4 h-4" />
        </div>
      )}

      {/* Hover line */}
      <div className={`
        absolute bottom-0 left-0 h-[2px] 
        bg-gradient-to-r from-secondary to-accent-orange 
        transition-all duration-500
        ${selected ? 'w-full' : 'w-0 group-hover:w-full'}
      `} />

      {children}
    </button>
  );
}

// Variante pour sélection multiple
interface MultiSelectCardProps {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export function MultiSelectCard({
  children,
  selected,
  onClick,
  className = '',
}: MultiSelectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative text-left w-full p-4 
        glass-dark rounded-xl
        border-2 transition-all duration-300
        hover:bg-white/5 hover:scale-[1.01]
        focus:outline-none focus:ring-2 focus:ring-secondary/50
        ${selected 
          ? 'border-secondary bg-secondary/10' 
          : 'border-transparent hover:border-white/10'
        }
        ${className}
      `}
    >
      {/* Checkbox */}
      <div className={`
        absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 rounded
        flex items-center justify-center
        transition-all duration-300
        ${selected 
          ? 'bg-secondary text-white' 
          : 'border border-white/30 bg-transparent'
        }
      `}>
        {selected && <CheckIcon className="w-3 h-3" />}
      </div>

      {children}
    </button>
  );
}

// Variante pour les moodboards de design
interface MoodboardCardProps {
  selected: boolean;
  onClick: () => void;
  label: string;
  description: string;
  colors: string[];
  showCheck?: boolean;
}

export function MoodboardCard({
  selected,
  onClick,
  label,
  description,
  colors,
  showCheck = true,
}: MoodboardCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative text-left w-full p-6 
        glass-dark rounded-2xl
        border-2 transition-all duration-300
        hover:bg-white/5 hover:scale-[1.02]
        focus:outline-none focus:ring-2 focus:ring-secondary/50
        ${selected 
          ? 'border-secondary bg-secondary/10' 
          : 'border-transparent hover:border-white/10'
        }
      `}
    >
      {/* Indicateur de sélection */}
      {showCheck && (
        <div className={`
          absolute top-4 right-4 w-6 h-6 rounded-full
          flex items-center justify-center
          transition-all duration-300
          ${selected 
            ? 'bg-secondary text-white scale-100' 
            : 'bg-white/10 text-white/30 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100'
          }
        `}>
          <CheckIcon className="w-4 h-4" />
        </div>
      )}

      {/* Palette de couleurs */}
      <div className="flex gap-2 mb-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-10 h-10 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-110"
            style={{ 
              backgroundColor: color,
              transitionDelay: `${index * 50}ms`
            }}
          />
        ))}
      </div>

      {/* Texte */}
      <h3 className="text-lg font-semibold text-white mb-1">{label}</h3>
      <p className="text-sm text-white/50">{description}</p>

      {/* Hover line */}
      <div className={`
        absolute bottom-0 left-0 h-[2px] 
        bg-gradient-to-r from-secondary to-accent-orange 
        transition-all duration-500
        ${selected ? 'w-full' : 'w-0 group-hover:w-full'}
      `} />
    </button>
  );
}

