'use client';

type CalendlyButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function CalendlyButton({ children, className }: CalendlyButtonProps) {
  const handleClick = () => {
    window.location.href = '/#calendly';
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}
