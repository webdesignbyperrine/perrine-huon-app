'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface TypewriterCarouselProps {
  texts: string[];
  typeDelay?: number;
  deleteDelay?: number;
  pauseDelay?: number;
  startDelay?: number;
  className?: string;
  showCursor?: boolean;
  cursorClassName?: string;
}

export default function TypewriterCarousel({
  texts,
  typeDelay = 50,
  deleteDelay = 30,
  pauseDelay = 3000,
  startDelay = 800,
  className = '',
  showCursor = true,
  cursorClassName = '',
}: TypewriterCarouselProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [phase, setPhase] = useState<'waiting' | 'typing' | 'pausing' | 'deleting'>('waiting');
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLSpanElement>(null);

  const currentText = texts[textIndex];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || phase !== 'waiting') return;

    const timer = setTimeout(() => setPhase('typing'), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay, isVisible, phase]);

  const advanceToNextText = useCallback(() => {
    setTextIndex((prev) => (prev + 1) % texts.length);
    setPhase('typing');
  }, [texts.length]);

  useEffect(() => {
    if (!isVisible) return;

    if (phase === 'typing') {
      if (displayedText.length < currentText.length) {
        const timer = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, typeDelay);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setPhase('pausing'), 0);
        return () => clearTimeout(timer);
      }
    }

    if (phase === 'pausing') {
      const timer = setTimeout(() => setPhase('deleting'), pauseDelay);
      return () => clearTimeout(timer);
    }

    if (phase === 'deleting') {
      if (displayedText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deleteDelay);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(advanceToNextText, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, displayedText, currentText, typeDelay, deleteDelay, pauseDelay, advanceToNextText, isVisible]);

  const isActive = phase !== 'waiting';
  const isBlinking = phase === 'pausing';

  return (
    <span ref={containerRef} className={className}>
      {displayedText}
      {showCursor && (
        <span
          className={`inline-block w-[3px] h-[1em] ml-1 relative ${
            isBlinking ? 'animate-cursor-blink' : ''
          } ${cursorClassName}`}
          style={{
            backgroundColor: 'var(--accent-pink)',
            opacity: isActive ? 1 : 0,
            top: '0.15em',
          }}
        />
      )}
    </span>
  );
}
