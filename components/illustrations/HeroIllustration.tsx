'use client';

import { useEffect, useRef } from 'react';
import {
  DotLottieReact,
  setWasmUrl,
  type DotLottie,
} from '@lottiefiles/dotlottie-react';

setWasmUrl('/animations/dotlottie-player.wasm');

interface HeroIllustrationProps {
  className?: string;
}

export default function HeroIllustration({ className = '' }: HeroIllustrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<DotLottie | null>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          animationRef.current?.play();
        } else {
          animationRef.current?.pause();
        }
      },
      { threshold: 0.01 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ minHeight: '400px', minWidth: '400px' }}
    >
      <DotLottieReact
        src="/animations/hero.lottie"
        loop
        autoplay
        dotLottieRefCallback={(animation) => {
          animationRef.current = animation;
          if (animation && !isVisibleRef.current) {
            animation.pause();
          }
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
