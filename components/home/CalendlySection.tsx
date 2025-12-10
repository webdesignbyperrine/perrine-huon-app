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

          {/* Calendly Embed */}
          <div className="card bg-white/5 backdrop-blur-xl border-secondary/30">
            <div className="aspect-video bg-white rounded-lg relative overflow-hidden">
              {/* Calendly iframe intégré */}
              <iframe
                src="https://calendly.com/prne-hn/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Réservation de rendez-vous"
                className="absolute inset-0"
              ></iframe>
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


