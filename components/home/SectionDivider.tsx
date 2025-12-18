'use client';

interface SectionDividerProps {
  /** Couleur de la section du dessous (celle vers laquelle on transitionne) */
  bottomSectionColor: string;
  /** Position: 'top' pour en haut de section, 'bottom' pour en bas */
  position?: 'top' | 'bottom';
}

export default function SectionDivider({ 
  bottomSectionColor,
  position = 'top'
}: SectionDividerProps) {
  // Path SVG inspiré de shape divider avec courbes organiques
  const pathData = "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z";

  return (
    <div 
      className={`absolute ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 w-full overflow-hidden pointer-events-none`}
      style={{ 
        lineHeight: 0,
        zIndex: 1,
        // Ajouter un offset pour éviter le chevauchement avec le contenu
        [position === 'bottom' ? 'marginBottom' : 'marginTop']: '-1px'
      }}
    >
      <svg 
        data-name="Layer 1" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        style={{ 
          display: 'block',
          width: 'calc(100% + 1.3px)',
          height: '90px',
          transform: position === 'bottom' ? 'rotate(180deg)' : 'none'
        }}
      >
        <path 
          d={pathData} 
          fill={bottomSectionColor}
        />
      </svg>
    </div>
  );
}
