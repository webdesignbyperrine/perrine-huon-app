'use client';

import Image from 'next/image';

interface LaptopMockupProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LaptopMockup({ src, alt, className = '' }: LaptopMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Shadow under laptop */}
      <div 
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-6 rounded-[50%] blur-xl"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)'
        }}
      />
      
      {/* Laptop screen */}
      <div className="relative">
        {/* Screen outer frame - silver bezel */}
        <div 
          className="relative rounded-t-[12px] p-[2px]"
          style={{
            background: 'linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 50%, #a0a0a0 100%)',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
          }}
        >
          {/* Screen inner frame - black bezel */}
          <div 
            className="relative bg-[#0d0d0d] rounded-t-[10px] p-[8px] pb-[10px]"
          >
            {/* Camera */}
            <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-[#1a1a1a] border border-[#333]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[2px] rounded-full bg-[#2a4a3a]" />
            </div>
            
            {/* Screen with reflection */}
            <div 
              className="relative overflow-hidden rounded-[4px]"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
              }}
            >
              {/* Screen content */}
              <div className="relative aspect-[16/10] bg-[#1a1a1a]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                
                {/* Screen glare/reflection */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(115deg, rgba(255,255,255,0.1) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Laptop body/base */}
        <div className="relative">
          {/* Top edge of base (hinge area) */}
          <div 
            className="h-[4px] rounded-b-[2px]"
            style={{
              background: 'linear-gradient(180deg, #d4d4d4 0%, #b8b8b8 50%, #a8a8a8 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)'
            }}
          />
          
          {/* Main base */}
          <div 
            className="h-[10px] rounded-b-[8px]"
            style={{
              background: 'linear-gradient(180deg, #c8c8c8 0%, #b0b0b0 30%, #a0a0a0 70%, #909090 100%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)'
            }}
          >
            {/* Notch/indent for opening */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 top-0 w-[50px] h-[3px] rounded-b-[4px]"
              style={{
                background: 'linear-gradient(180deg, #888 0%, #999 100%)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)'
              }}
            />
          </div>
          
          {/* Bottom lip */}
          <div 
            className="h-[2px] mx-[2px] rounded-b-[6px]"
            style={{
              background: 'linear-gradient(180deg, #888 0%, #777 100%)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
