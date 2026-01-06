'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface HeroIllustrationProps {
  className?: string;
}

export default function HeroIllustration({ className = '' }: HeroIllustrationProps) {
  return (
    <div className={`relative ${className}`} style={{ minHeight: '400px', minWidth: '400px' }}>
      <DotLottieReact
        src="https://lottie.host/0a7d6c66-8f2b-42a3-bbca-f2136a1796c0/G94MqfrkuQ.lottie"
        loop
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
