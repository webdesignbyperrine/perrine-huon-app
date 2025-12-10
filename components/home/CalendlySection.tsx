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

          {/* Calendly Embed avec wrapper sombre */}
          <div className="relative">
            {/* Fond sombre décoratif */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 rounded-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" />
              <div 
                className="absolute bottom-0 left-0 w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl animate-float" 
                style={{ animationDelay: '2s' }}
              />
            </div>

            {/* Card avec glass effect */}
            <div className="relative glass-dark border border-secondary/30 rounded-2xl p-8">
              <div className="aspect-video relative overflow-hidden rounded-xl">
                {/* Calendly iframe */}
                <iframe
                  src="https://calendly.com/prne-hn/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Réservation de rendez-vous"
                  className="absolute inset-0 rounded-xl shadow-2xl"
                ></iframe>
              </div>

              {/* Badge décoratif */}
              <div className="absolute -top-3 -right-3 px-4 py-2 bg-gradient-to-r from-secondary to-accent-orange text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg">
                ✨ Réservation en ligne
              </div>
            </div>

            {/* Bouton alternatif */}
            <div className="mt-6 text-center">
              <a
                href="mailto:contact@perrinehuon.com"
                className="btn-secondary inline-block"
              >
                Ou contactez-moi par email
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
