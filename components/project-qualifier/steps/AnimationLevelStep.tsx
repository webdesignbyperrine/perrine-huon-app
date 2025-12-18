'use client';

import { useQualifier } from '../context';
import { ANIMATION_LEVELS, AnimationLevel } from '../types';
import SelectionCard from '../ui/SelectionCard';
import NavigationButtons from '../ui/NavigationButtons';
import ProgressBar from '../ui/ProgressBar';

// ============================================
// SOBRE : Élégant et raffiné, style cabinet avocat
// ============================================
function SobreAnimation() {
  return (
    <div className="relative w-full h-36 rounded-lg overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}
    >
      {/* Ligne dorée décorative en haut */}
      <div 
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ 
          background: 'linear-gradient(90deg, transparent, #c9a962, transparent)',
          animation: 'shimmerLine 3s ease-in-out infinite'
        }}
      />
      
      <div className="flex flex-col items-center gap-4">
        {/* Carte élégante avec bordure dorée subtile */}
        <div 
          className="relative w-24 h-28 rounded-sm flex flex-col items-center justify-center p-3"
          style={{ 
            background: 'linear-gradient(180deg, rgba(201,169,98,0.08) 0%, rgba(26,26,46,0.9) 100%)',
            border: '1px solid rgba(201,169,98,0.2)',
            animation: 'fadeElegant 4s ease-in-out infinite'
          }}
        >
          {/* Forme géométrique élégante - losange */}
          <div 
            className="relative w-10 h-10 mb-2"
            style={{ 
              animation: 'fadeElegant 4s ease-in-out infinite',
              animationDelay: '0.5s'
            }}
          >
            <div 
              className="absolute inset-0 rotate-45 rounded-sm"
              style={{ 
                border: '1px solid rgba(201,169,98,0.6)',
                background: 'linear-gradient(135deg, rgba(201,169,98,0.1), transparent)'
              }}
            />
            <div 
              className="absolute inset-2 rotate-45 rounded-sm"
              style={{ 
                border: '1px solid rgba(201,169,98,0.3)',
              }}
            />
          </div>
          
          {/* Lignes de texte élégantes */}
          <div 
            className="w-16 h-1 rounded-full mb-1"
            style={{ 
              background: 'linear-gradient(90deg, transparent, rgba(201,169,98,0.4), transparent)',
              animation: 'fadeElegant 4s ease-in-out infinite',
              animationDelay: '1s'
            }}
          />
          <div 
            className="w-12 h-1 rounded-full"
            style={{ 
              background: 'linear-gradient(90deg, transparent, rgba(201,169,98,0.25), transparent)',
              animation: 'fadeElegant 4s ease-in-out infinite',
              animationDelay: '1.5s'
            }}
          />
        </div>
        
        {/* Séparateur doré animé */}
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-[1px]"
            style={{ 
              background: 'linear-gradient(90deg, transparent, #c9a962)',
              animation: 'expandLine 3s ease-in-out infinite'
            }}
          />
          <div 
            className="w-1.5 h-1.5 rounded-full"
            style={{ 
              background: '#c9a962',
              animation: 'pulseGold 3s ease-in-out infinite'
            }}
          />
          <div 
            className="w-8 h-[1px]"
            style={{ 
              background: 'linear-gradient(90deg, #c9a962, transparent)',
              animation: 'expandLine 3s ease-in-out infinite'
            }}
          />
        </div>
      </div>
      
      {/* Ligne dorée décorative en bas */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ 
          background: 'linear-gradient(90deg, transparent, #c9a962, transparent)',
          animation: 'shimmerLine 3s ease-in-out infinite',
          animationDelay: '1.5s'
        }}
      />
      
      <style jsx>{`
        @keyframes fadeElegant {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes shimmerLine {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes expandLine {
          0%, 100% { transform: scaleX(0.5); opacity: 0.3; }
          50% { transform: scaleX(1); opacity: 0.8; }
        }
        @keyframes pulseGold {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ============================================
// MODÉRÉ : Animations fluides et visibles
// ============================================
function ModereAnimation() {
  return (
    <div className="relative w-full h-36 bg-primary-800/30 rounded-lg overflow-hidden flex items-center justify-center">
      <div className="flex gap-3">
        {/* 3 cartes qui slide up en cascade */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-14 h-20 rounded-lg flex flex-col items-center justify-center p-2"
            style={{
              background: `linear-gradient(135deg, ${
                i === 0 ? 'rgba(221,71,179,0.3)' : 
                i === 1 ? 'rgba(255,185,124,0.3)' : 
                'rgba(255,72,85,0.3)'
              }, transparent)`,
              border: '1px solid rgba(255,255,255,0.1)',
              animation: 'slideUpBounce 2s ease-out infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          >
            <div 
              className="w-8 h-8 rounded-full mb-2"
              style={{
                background: i === 0 ? '#2F4558' : i === 1 ? '#FFB97C' : '#FF4855',
                opacity: 0.6,
              }}
            />
            <div className="w-10 h-1 bg-white/30 rounded" />
          </div>
        ))}
      </div>
      
      {/* Barre de chargement animée */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-secondary to-accent-orange rounded-full"
          style={{ animation: 'loadingBar 1.5s ease-in-out infinite' }}
        />
      </div>
      
      <style jsx>{`
        @keyframes slideUpBounce {
          0% { transform: translateY(20px); opacity: 0; }
          40% { transform: translateY(-5px); opacity: 1; }
          60% { transform: translateY(2px); }
          80%, 100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes loadingBar {
          0% { width: 0%; transform: translateX(0); }
          50% { width: 100%; }
          100% { width: 0%; transform: translateX(128px); }
        }
      `}</style>
    </div>
  );
}

// ============================================
// IMMERSIF : Animations spectaculaires "WOW"
// ============================================
function ImmersifAnimation() {
  return (
    <div className="relative w-full h-36 bg-primary-800/30 rounded-lg overflow-hidden flex items-center justify-center">
      {/* Particules qui volent partout */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${4 + (i % 3) * 2}px`,
            height: `${4 + (i % 3) * 2}px`,
            background: i % 3 === 0 ? '#2F4558' : i % 3 === 1 ? '#FFB97C' : '#FF4855',
            left: `${10 + (i * 7)}%`,
            top: '60%',
            animation: `flyParticle ${1 + (i % 4) * 0.3}s ease-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      
      {/* Élément central avec rotation 3D et glow */}
      <div className="relative" style={{ perspective: '500px' }}>
        <div 
          className="relative w-16 h-16 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #2F4558, #FF4855, #FFB97C)',
            animation: 'rotate3D 3s ease-in-out infinite',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Glow pulsant */}
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #2F4558, #FF4855, #FFB97C)',
              filter: 'blur(15px)',
              animation: 'pulseGlow 1.5s ease-in-out infinite',
            }}
          />
          
          {/* Icône */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ animation: 'iconPulse 1.5s ease-in-out infinite' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
        </div>
        
        {/* Cercles qui s'expandent */}
        <div 
          className="absolute inset-0 rounded-2xl border-2 border-secondary"
          style={{ animation: 'expandRing 2s ease-out infinite' }}
        />
        <div 
          className="absolute inset-0 rounded-2xl border-2 border-accent-orange"
          style={{ animation: 'expandRing 2s ease-out infinite', animationDelay: '0.5s' }}
        />
      </div>
      
      {/* Lignes qui traversent */}
      <div 
        className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent"
        style={{ 
          top: '30%',
          animation: 'scanLine 2s linear infinite',
        }}
      />
      
      <style jsx>{`
        @keyframes flyParticle {
          0% { 
            transform: translateY(0) scale(1); 
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% { 
            transform: translateY(-60px) translateX(${Math.random() > 0.5 ? '' : '-'}${10 + Math.random() * 20}px) scale(0); 
            opacity: 0;
          }
        }
        @keyframes rotate3D {
          0%, 100% { 
            transform: rotateY(0deg) rotateX(0deg) scale(1);
          }
          25% { 
            transform: rotateY(15deg) rotateX(10deg) scale(1.1);
          }
          50% { 
            transform: rotateY(0deg) rotateX(0deg) scale(1);
          }
          75% { 
            transform: rotateY(-15deg) rotateX(-10deg) scale(1.1);
          }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes expandRing {
          0% { 
            transform: scale(1); 
            opacity: 0.8;
          }
          100% { 
            transform: scale(2.5); 
            opacity: 0;
          }
        }
        @keyframes scanLine {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(80px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function AnimationLevelStep() {
  const { data, setAnimationLevel, goNext } = useQualifier();

  const handleSelect = (level: AnimationLevel) => {
    setAnimationLevel(level);
    // Auto-advance après sélection avec animation
    setTimeout(() => goNext(), 150);
  };

  // Composants d'animation pour chaque niveau
  const animationPreviews: Record<AnimationLevel, React.ReactNode> = {
    sobre: <SobreAnimation />,
    modere: <ModereAnimation />,
    immersif: <ImmersifAnimation />,
  };

  return (
    <div className="py-4">
      <ProgressBar />
      
      {/* Titre */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Quel niveau d&apos;animation souhaitez-vous ?
          </span>
        </h2>
        <p className="text-white/50 font-light">
          Comparez les 3 styles en temps réel 👇
        </p>
      </div>

      {/* Options avec aperçu animé */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {ANIMATION_LEVELS.map((level) => (
          <SelectionCard
            key={level.value}
            selected={data.animationLevel === level.value}
            onClick={() => handleSelect(level.value)}
            showCheck={false}
          >
            <div className="pr-0">
              {/* Aperçu animé */}
              <div className="mb-4">
                {animationPreviews[level.value]}
              </div>
              
              {/* Texte */}
              <h3 className="text-lg font-semibold text-white mb-1 text-center">
                {level.label}
              </h3>
              <p className="text-sm text-white/50 font-light text-center">
                {level.description}
              </p>
            </div>
          </SelectionCard>
        ))}
      </div>

      <NavigationButtons />
    </div>
  );
}

