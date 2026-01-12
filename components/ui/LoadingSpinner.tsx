interface LoadingSpinnerProps {
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ theme = 'light', size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4',
  };

  const colorClasses = theme === 'dark' 
    ? 'border-paper/20 border-t-paper' 
    : 'border-primary/20 border-t-primary';

  return (
    <div className="text-center py-12">
      <div className={`inline-block ${sizeClasses[size]} ${colorClasses} rounded-full animate-spin`} />
    </div>
  );
}
