import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fond animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-700 to-primary-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-red rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-6 px-6 py-2 bg-secondary/20 backdrop-blur-sm border border-secondary/40 rounded-full">
            <span className="text-secondary font-semibold">Web Designer & Developer</span>
          </div>

          {/* Titre principal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-white via-accent-orange to-secondary bg-clip-text text-transparent">
              Perrine Huon
            </span>
            <span className="block text-3xl md:text-5xl lg:text-6xl mt-4 text-white/90">
              Sites Web avec SEO Ultra Performant
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto">
            Je crée des <span className="text-secondary font-semibold">sites web</span> et{' '}
            <span className="text-secondary font-semibold">applications</span> sur mesure avec un{' '}
            <span className="text-accent-orange font-semibold">SEO géolocalisé</span> qui propulse votre visibilité locale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#rdv"
              className="btn-primary w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Réserver un appel
              </span>
            </Link>
            <Link
              href="#contact"
              className="btn-secondary w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Me contacter
              </span>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <Link href="#about" className="inline-block text-white/50 hover:text-secondary transition-colors">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

