'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface HeroIllustrationProps {
  className?: string;
}

export default function HeroIllustration({ className = '' }: HeroIllustrationProps) {
  return (
    <div className={`relative ${className}`} suppressHydrationWarning>
      <DotLottieReact
        src="https://lottie.host/0a7d6c66-8f2b-42a3-bbca-f2136a1796c0/G94MqfrkuQ.lottie"
        loop
        autoplay
        className="w-full h-auto"
      />
    </div>
  );
}
