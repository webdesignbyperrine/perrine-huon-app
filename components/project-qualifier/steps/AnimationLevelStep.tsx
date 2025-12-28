'use client';

import { useQualifier } from '../context';
import { ANIMATION_LEVELS, AnimationLevel } from '../types';
import SelectionCard from '../ui/SelectionCard';
import NavigationButtons from '../ui/NavigationButtons';
import ProgressBar from '../ui/ProgressBar';

// ============================================
// SOBRE : Fond bleu, animations légères mais visibles
// ============================================
function SobreAnimation() {
  return (
    <div 
      className="relative w-full h-36 rounded-lg overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #2B5B8A 0%, #1a3a5c 100%)' }}
    >
      {/* Une seule carte centrale avec hover subtil */}
      <div 
        className="w-24 h-16 rounded-lg flex flex-col items-center justify-center"
        style={{ 
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          animation: 'sobreHover 3s ease-in-out infinite'
        }}
      >
        <div className="w-10 h-10 rounded-full bg-white/20 mb-1" style={{ animation: 'sobrePulse 3s ease-in-out infinite' }} />
        <div className="w-14 h-1.5 rounded bg-white/30" />
      </div>
      
      {/* Ligne de séparation qui apparaît doucement */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-white/20"
        style={{ animation: 'sobreLine 3s ease-in-out infinite' }}
      />
      
      <style jsx>{`
        @keyframes sobreHover {
          0%, 100% { transform: translateY(0); opacity: 0.9; }
          50% { transform: translateY(-3px); opacity: 1; }
        }
        @keyframes sobrePulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes sobreLine {
          0%, 100% { width: 30px; opacity: 0.3; }
          50% { width: 60px; opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

// ============================================
// MODÉRÉ : Menu/liste avec éléments qui glissent en cascade
// ============================================
function ModereAnimation() {
  return (
    <div 
      className="relative w-full h-36 rounded-lg overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #2B5B8A 0%, #1a3a5c 100%)' }}
    >
      {/* Conteneur du menu */}
      <div className="flex flex-col gap-2 w-32">
        {/* 4 items de menu qui glissent */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-1.5 rounded"
            style={{
              background: i === 1 ? 'rgba(255,15,124,0.25)' : 'rgba(255,255,255,0.08)',
              border: i === 1 ? '1px solid rgba(255,15,124,0.4)' : '1px solid transparent',
              animation: 'slideIn 2.5s ease-out infinite',
              animationDelay: `${i * 0.1}s`,
            }}
          >
            {/* Icône */}
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ 
                background: i === 1 ? 'rgba(255,15,124,0.6)' : 'rgba(255,255,255,0.3)',
              }}
            />
            {/* Texte simulé */}
            <div 
              className="h-1.5 rounded"
              style={{ 
                width: `${40 + (i % 2) * 20}px`,
                background: i === 1 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Indicateur de sélection qui se déplace */}
      <div 
        className="absolute left-1/2 -translate-x-[85px] w-1 rounded-full"
        style={{ 
          background: '#ff0f7c',
          animation: 'indicator 2.5s ease-in-out infinite'
        }}
      />
      
      <style jsx>{`
        @keyframes slideIn {
          0% { transform: translateX(-20px); opacity: 0; }
          20% { transform: translateX(0); opacity: 1; }
          80% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-20px); opacity: 0; }
        }
        @keyframes indicator {
          0%, 100% { top: 28px; height: 20px; }
          25% { top: 52px; height: 20px; }
          50% { top: 52px; height: 20px; }
          75% { top: 28px; height: 20px; }
        }
      `}</style>
    </div>
  );
}

// ============================================
// IMMERSIF : Animations spectaculaires "WOW" - Bleu/Rose
// ============================================
function ImmersifAnimation() {
  return (
    <div 
      className="relative w-full h-36 rounded-lg overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1a2a4a 0%, #2B5B8A 50%, #3d1a40 100%)' }}
    >
      {/* Particules bleu/rose qui volent */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${4 + (i % 3) * 2}px`,
            height: `${4 + (i % 3) * 2}px`,
            background: i % 3 === 0 ? '#2B5B8A' : i % 3 === 1 ? '#ff0f7c' : '#4A7AA8',
            left: `${10 + (i * 7)}%`,
            top: '60%',
            animation: `flyParticle ${1 + (i % 4) * 0.3}s ease-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      
      {/* Élément central avec rotation 3D et glow bleu/rose */}
      <div className="relative" style={{ perspective: '500px' }}>
        <div 
          className="relative w-16 h-16 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #2B5B8A, #ff0f7c, #4A7AA8)',
            animation: 'rotate3D 3s ease-in-out infinite',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Glow pulsant bleu/rose */}
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #2B5B8A, #ff0f7c, #4A7AA8)',
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
        
        {/* Cercles qui s'expandent - bleu et rose */}
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{ border: '2px solid #4A7AA8', animation: 'expandRing 2s ease-out infinite' }}
        />
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{ border: '2px solid #ff0f7c', animation: 'expandRing 2s ease-out infinite', animationDelay: '0.5s' }}
        />
      </div>
      
      {/* Ligne qui traverse - rose */}
      <div 
        className="absolute w-full h-[2px]"
        style={{ 
          top: '30%',
          background: 'linear-gradient(90deg, transparent, #ff0f7c, transparent)',
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
            transform: translateY(-60px) translateX(10px) scale(0); 
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
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Quel niveau d&apos;animation souhaitez-vous ?
        </h2>
        <p className="text-primary/50 font-light">
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
              <h3 className="text-lg font-semibold text-primary mb-1 text-center">
                {level.label}
              </h3>
              <p className="text-sm text-primary/50 font-light text-center">
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


