'use client';

interface SectionTitleProps {
  subtitle: string;
  title: string;
  description?: string;
  showLine?: boolean;
  theme?: 'light' | 'dark';
  isVisible?: boolean;
}

export default function SectionTitle({ 
  subtitle, 
  title, 
  description, 
  showLine = true,
  theme = 'light',
  isVisible = true 
}: SectionTitleProps) {
  const textColor = theme === 'dark' ? 'text-paper' : 'text-primary';
  const subtitleColor = theme === 'dark' ? 'text-paper/40' : 'text-primary/40';
  const descColor = theme === 'dark' ? 'text-paper/60' : 'text-primary/60';
  const lineColor = theme === 'dark' ? 'bg-paper/20' : 'bg-primary/20';

  return (
    <div className="text-center">
      <span 
        className={`inline-block text-sm font-medium ${subtitleColor} uppercase tracking-widest mb-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {subtitle}
      </span>
      <h2 
        className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${textColor} mb-6 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p 
          className={`text-lg ${descColor} max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {description}
        </p>
      )}
      {showLine && (
        <div 
          className={`w-24 h-0.5 ${lineColor} mx-auto mt-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`}
        />
      )}
    </div>
  );
}
