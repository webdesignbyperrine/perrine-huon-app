'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface AnimatedLogoWrapperProps {
  logoUrl: string;
  size?: number;
  animate?: boolean;
}

export default function AnimatedLogoWrapper({ 
  logoUrl, 
  size = 112,
  animate = true 
}: AnimatedLogoWrapperProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 100);
      
      // Afficher la bille après que le cercle soit tracé
      const bubbleTimer = setTimeout(() => {
        setShowBubble(true);
      }, 2200); // 2s de tracé + 0.2s de délai
      
      return () => {
        clearTimeout(timer);
        clearTimeout(bubbleTimer);
      };
    }
  }, [animate]);

  const svgSize = size + 60;
  const logoSize = size * 0.75;
  const bubbleSize = svgSize * 0.85;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: svgSize, height: svgSize }}>
      
      {/* Bille 3D - exactement comme WhatsApp */}
      <div 
        className="absolute rounded-full transition-all duration-700 ease-out overflow-hidden backdrop-blur-md"
        style={{
          width: bubbleSize,
          height: bubbleSize,
          opacity: showBubble ? 1 : 0,
          transform: showBubble ? 'scale(1)' : 'scale(0.8)',
          background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(0,0,0,0.2) 0%, transparent 50%), linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
          boxShadow: 'inset 0 -8px 20px rgba(0,0,0,0.3), inset 0 8px 20px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.2)',
        }}
      >
        {/* Bulles animées */}
        <span className="bubble bubble-1" />
        <span className="bubble bubble-2" />
        <span className="bubble bubble-3" />
        <span className="bubble bubble-4" />
        <span className="bubble bubble-5" />
        
        {/* Reflet animé qui tourne */}
        <span className="shimmer-orb" />
        
        {/* Reflet principal en haut - effet bille */}
        <span 
          className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-8 rounded-full pointer-events-none"
          style={{ 
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)',
            filter: 'blur(2px)'
          }}
        />
        
        {/* Petit reflet secondaire */}
        <span 
          className="absolute top-4 left-6 w-3 h-2 rounded-full pointer-events-none shimmer-float"
          style={{ 
            background: 'rgba(255,255,255,0.4)',
            filter: 'blur(1px)'
          }}
        />
        
        {/* Ombre interne en bas pour effet 3D */}
        <span 
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
          style={{ 
            background: 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 100%)',
          }}
        />
      </div>
      
      {/* Styles identiques à WhatsApp */}
      <style jsx>{`
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(255,255,255,0.1));
          pointer-events: none;
          animation: bubble-rise linear infinite;
        }
        .bubble-1 {
          width: 6px;
          height: 6px;
          left: 20%;
          bottom: 10%;
          animation-duration: 4s;
          animation-delay: 0s;
        }
        .bubble-2 {
          width: 4px;
          height: 4px;
          left: 60%;
          bottom: 15%;
          animation-duration: 3.5s;
          animation-delay: 1s;
        }
        .bubble-3 {
          width: 5px;
          height: 5px;
          left: 40%;
          bottom: 5%;
          animation-duration: 5s;
          animation-delay: 0.5s;
        }
        .bubble-4 {
          width: 3px;
          height: 3px;
          left: 75%;
          bottom: 20%;
          animation-duration: 4.5s;
          animation-delay: 2s;
        }
        .bubble-5 {
          width: 4px;
          height: 4px;
          left: 30%;
          bottom: 8%;
          animation-duration: 3s;
          animation-delay: 1.5s;
        }
        @keyframes bubble-rise {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(-40px) translateX(5px) scale(0.8);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-80px) translateX(-3px) scale(0.3);
            opacity: 0;
          }
        }
        .shimmer-orb {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.1) 10%, transparent 20%);
          animation: shimmer-rotate 8s linear infinite;
          pointer-events: none;
        }
        @keyframes shimmer-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .shimmer-float {
          animation: shimmer-float 3s ease-in-out infinite;
        }
        @keyframes shimmer-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(2px) scale(1.1); opacity: 0.6; }
        }
      `}</style>

      {/* Cercle animé qui se trace */}
      <svg
        viewBox="0 0 100 100"
        width={svgSize}
        height={svgSize}
        className="absolute inset-0 z-10"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          opacity: showBubble ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          style={{
            strokeDasharray: 283,
            strokeDashoffset: isAnimating ? 0 : 283,
            transition: `stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1) 0.1s`,
            transformOrigin: 'center',
            transform: 'rotate(-90deg)',
          }}
          opacity="0.6"
        />
      </svg>

      {/* Logo au centre */}
      <div className="relative z-20">
        <Image
          src={logoUrl}
          alt="Perrine Huon Logo"
          width={logoSize}
          height={logoSize}
          className="object-contain brightness-0 invert opacity-90"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </div>
    </div>
  );
}
