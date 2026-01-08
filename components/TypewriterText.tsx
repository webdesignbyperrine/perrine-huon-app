'use client';

import { useState, useEffect } from 'react';

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

  useEffect(() => {
    // Délai avant de commencer
    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, text, delay, isTyping]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span 
          className={`inline-block w-[3px] h-[1em] ml-1 align-text-bottom ${
            isComplete ? 'animate-cursor-blink' : ''
          } ${cursorClassName}`}
          style={{ 
            backgroundColor: 'var(--accent-pink)',
            opacity: isTyping ? 1 : 0,
          }}
        />
      )}
    </span>
  );
}
