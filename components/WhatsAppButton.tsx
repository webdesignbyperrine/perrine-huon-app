'use client';

export default function WhatsAppButton() {
  // Numéro WhatsApp de Perrine Huon
  const phoneNumber = '33645182749';
  
  const message = encodeURIComponent(
    "Bonjour Perrine, je vous contacte depuis votre site web. J'aimerais discuter d'un projet..."
  );
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
      {/* Bouton WhatsApp flottant - Style bille de verre animée */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group transition-transform duration-300 hover:scale-105 sphere-wiggle"
        aria-label="Contactez-moi sur WhatsApp"
      >
        <div 
          className="relative flex flex-col items-center justify-center gap-1 w-28 h-28 rounded-full overflow-hidden backdrop-blur-md"
          style={{
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
          
          {/* Icône WhatsApp */}
          <div className="relative z-10">
            <svg
              className="w-9 h-9 text-[#25D366] group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {/* Badge "En ligne" */}
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#25D366] border-2 border-primary-900 rounded-full animate-pulse" />
          </div>
          
          {/* Texte */}
          <span className="relative z-10 text-white/80 group-hover:text-white font-medium tracking-wide text-xs transition-colors whitespace-nowrap">
            On en parle ?
          </span>
          
          {/* Ombre interne en bas pour effet 3D */}
          <span 
            className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
            style={{ 
              background: 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 100%)',
            }}
          />
        </div>
      </a>
      
      {/* Styles pour les animations */}
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
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.1) 10%, transparent 20%);
          animation: shimmer-rotate 8s linear infinite;
          pointer-events: none;
        }
        @keyframes shimmer-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .shimmer-float {
          animation: shimmer-float 3s ease-in-out infinite;
        }
        @keyframes shimmer-float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(2px) scale(1.1);
            opacity: 0.6;
          }
        }
        .sphere-wiggle {
          animation: sphere-wiggle 3s ease-in-out infinite;
        }
        .sphere-wiggle:hover {
          animation: none;
        }
        @keyframes sphere-wiggle {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-3px) rotate(1deg);
          }
          50% {
            transform: translateY(0) rotate(0deg);
          }
          75% {
            transform: translateY(-2px) rotate(-1deg);
          }
        }
      `}</style>
    </>
  );
}

