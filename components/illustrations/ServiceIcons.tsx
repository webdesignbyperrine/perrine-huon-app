'use client';

interface IconProps {
  className?: string;
  animate?: boolean;
}

// Icône Site Web
export function WebsiteIcon({ className = 'w-16 h-16', animate = false }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <rect 
        x="8" y="12" width="48" height="36" rx="4" 
        stroke="currentColor" 
        strokeWidth="2"
        className={animate ? 'animate-stroke-draw' : ''}
      />
      <line x1="8" y1="22" x2="56" y2="22" stroke="currentColor" strokeWidth="2"/>
      <circle cx="14" cy="17" r="2" fill="currentColor" fillOpacity="0.3"/>
      <circle cx="20" cy="17" r="2" fill="currentColor" fillOpacity="0.3"/>
      <circle cx="26" cy="17" r="2" fill="currentColor" fillOpacity="0.3"/>
      <rect x="14" y="28" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
      <line x1="40" y1="28" x2="50" y2="28" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
      <line x1="40" y1="34" x2="48" y2="34" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
      <line x1="40" y1="40" x2="50" y2="40" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
      <rect x="20" y="48" width="24" height="4" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// Icône Application
export function AppIcon({ className = 'w-16 h-16', animate = false }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <rect 
        x="18" y="6" width="28" height="52" rx="4" 
        stroke="currentColor" 
        strokeWidth="2"
        className={animate ? 'animate-stroke-draw' : ''}
      />
      <line x1="18" y1="14" x2="46" y2="14" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="18" y1="50" x2="46" y2="50" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="32" cy="54" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="24" y="20" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6"/>
      <rect x="24" y="34" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6"/>
      <rect x="33" y="34" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6"/>
      <circle cx="27" cy="38" r="1" fill="currentColor" fillOpacity="0.4"/>
      <circle cx="37" cy="38" r="1" fill="currentColor" fillOpacity="0.4"/>
    </svg>
  );
}

// Icône SEO
export function SeoIcon({ className = 'w-16 h-16', animate = false }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <circle 
        cx="32" cy="32" r="24" 
        stroke="currentColor" 
        strokeWidth="2"
        className={animate ? 'animate-stroke-draw' : ''}
      />
      <ellipse cx="32" cy="32" rx="10" ry="24" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6"/>
      <line x1="8" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6"/>
      <path d="M12 22 Q32 18 52 22" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" fill="none"/>
      <path d="M12 42 Q32 46 52 42" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" fill="none"/>
      <circle cx="48" cy="18" r="8" fill="white" stroke="#ff0f7c" strokeWidth="2"/>
      <path d="M45 18 L47 20 L51 16" stroke="#ff0f7c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Icône Performance
export function PerformanceIcon({ className = 'w-16 h-16', animate = false }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path 
        d="M8 48 L8 24 L24 32 L40 16 L56 28 L56 48 Z" 
        stroke="currentColor" 
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.05"
        strokeLinejoin="round"
        className={animate ? 'animate-stroke-draw' : ''}
      />
      <polyline 
        points="8,40 20,34 32,26 44,18 56,24" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="8" cy="40" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="20" cy="34" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="32" cy="26" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="44" cy="18" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="56" cy="24" r="4" fill="#ff0f7c" fillOpacity="0.2" stroke="#ff0f7c" strokeWidth="2"/>
      <path d="M52 12 L56 8 L60 12" stroke="#ff0f7c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="56" y1="8" x2="56" y2="18" stroke="#ff0f7c" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// Icône Maintenance
export function MaintenanceIcon({ className = 'w-16 h-16', animate = false }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path 
        d="M32 8 L32 16 M32 48 L32 56 M8 32 L16 32 M48 32 L56 32"
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path 
        d="M15 15 L21 21 M43 43 L49 49 M15 49 L21 43 M43 21 L49 15"
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
      <circle 
        cx="32" cy="32" r="16" 
        stroke="currentColor" 
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.05"
        className={animate ? 'animate-stroke-draw' : ''}
      />
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <path d="M32 24 L32 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M38 27 L41 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// Icône Stratégie
export function StrategyIcon({ className = 'w-16 h-16', animate = false }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <rect 
        x="8" y="8" width="48" height="48" rx="4" 
        stroke="currentColor" 
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.03"
        className={animate ? 'animate-stroke-draw' : ''}
      />
      <line x1="8" y1="20" x2="56" y2="20" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="8" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
      <line x1="8" y1="44" x2="56" y2="44" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
      <line x1="20" y1="8" x2="20" y2="56" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
      <line x1="32" y1="8" x2="32" y2="56" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
      <line x1="44" y1="8" x2="44" y2="56" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
      <circle cx="14" cy="26" r="3" fill="#ff0f7c" fillOpacity="0.3" stroke="#ff0f7c" strokeWidth="1.5"/>
      <circle cx="26" cy="38" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="38" cy="26" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="50" cy="50" r="3" fill="#ff0f7c" fillOpacity="0.3" stroke="#ff0f7c" strokeWidth="1.5"/>
      <path d="M14 26 L26 38 L38 26 L50 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 2"/>
    </svg>
  );
}

// Export tous les icônes
export const ServiceIcons = {
  website: WebsiteIcon,
  app: AppIcon,
  seo: SeoIcon,
  performance: PerformanceIcon,
  maintenance: MaintenanceIcon,
  strategy: StrategyIcon,
};


