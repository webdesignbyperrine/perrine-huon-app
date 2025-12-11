export default function CalendlySection() {
  return (
    <section id="rdv" className="py-20 bg-gradient-to-b from-primary-900 to-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Réserver un Appel</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mt-4">
              Discutons de votre projet lors d'un appel de 30 minutes. C'est gratuit et sans engagement.
            </p>
          </div>

          {/* Bouton CTA Calendly */}
          <div className="card bg-white/5 backdrop-blur-xl border-secondary/30 p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-secondary to-accent-orange rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Choisissez votre créneau</h3>
                <p className="text-white/60 mb-8">
                  Cliquez sur le bouton ci-dessous pour accéder au calendrier et réserver votre consultation gratuite de 30 minutes.
                </p>
              </div>

              <a
                href="https://calendly.com/prne-hn/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-5 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold text-lg uppercase tracking-wider hover:opacity-90 transition-opacity rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                📅 Réserver un créneau (30 min)
              </a>

              <p className="text-white/40 text-sm mt-6">
                ✨ Première consultation offerte • Sans engagement • Réponse sous 24h
              </p>
            </div>

            {/* Bouton alternatif */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <a
                href="mailto:contact@perrinehuon.com"
                className="text-secondary hover:text-accent-orange transition-colors text-sm uppercase tracking-wider"
              >
                Ou contactez-moi par email →
              </a>
            </div>
          </div>

          {/* Bénéfices */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Rendez-vous rapide</h3>
              <p className="text-white/60 text-sm">30 minutes pour faire le point</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Gratuit et sans engagement</h3>
              <p className="text-white/60 text-sm">Aucun frais, discussion libre</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Réponse personnalisée</h3>
              <p className="text-white/60 text-sm">Solutions adaptées à vos besoins</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
