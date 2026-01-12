import Link from 'next/link';

interface SectionLinkProps {
  href: string;
  children: string;
  theme?: 'light' | 'dark';
}

export default function SectionLink({ href, children, theme = 'light' }: SectionLinkProps) {
  const themeClasses = theme === 'dark' 
    ? '!border-paper/30 !text-paper hover:!bg-paper hover:!text-primary' 
    : '';

  return (
    <Link 
      href={href} 
      className={`btn-sketch group inline-flex items-center gap-2 ${themeClasses}`}
    >
      <span>{children}</span>
      <svg 
        className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
