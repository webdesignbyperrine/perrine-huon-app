'use client';

import { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  startDelay?: number;
  className?: string;
  showCursor?: boolean;
  cursorClassName?: string;
}

export default function TypewriterText({
  text,
  delay = 50,
  startDelay = 600,
  className = '',
  showCursor = true,
  cursorClassName = '',
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLSpanElement>(null);

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
    if (!isVisible || isTyping) return;

    // Délai avant de commencer
    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [startDelay, isVisible, isTyping]);

  useEffect(() => {
    if (!isTyping || !isVisible) return;

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, delay);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIsComplete(true), 0);
      return () => clearTimeout(timer);
    }
  }, [displayedText, text, delay, isTyping, isVisible]);

  return (
    <span ref={containerRef} className={className}>
      {displayedText}
      {showCursor && (
        <span 
          className={`inline-block w-[3px] h-[1em] ml-1 relative ${
            isComplete ? 'animate-cursor-blink' : ''
          } ${cursorClassName}`}
          style={{ 
            backgroundColor: 'var(--accent-pink)',
            opacity: isTyping ? 1 : 0,
            top: '0.15em',
          }}
        />
      )}
    </span>
  );
}
