'use client';

export default function CTAQuiz() {
  const handleClick = () => {
    window.dispatchEvent(new Event('openQualifier'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <button
      onClick={handleClick}
      className="btn-cta-hero-enhanced group"
    >
      <span className="btn-shimmer"></span>
      <span className="relative flex flex-col items-center justify-center gap-1">
        <span className="text-xs font-medium uppercase tracking-wider opacity-80">Quiz interactif</span>
        <span className="flex items-center justify-center gap-3">
          <span className="btn-icon-bounce">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </span>
          <span className="font-bold">Quel est votre projet ?</span>
          <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </span>
    </button>
  );
}
