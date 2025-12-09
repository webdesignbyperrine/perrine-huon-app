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
            <div className="aspect-video bg-gradient-to-br from-primary-700 to-primary-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Fond animé */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-red rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
              </div>

              {/* Contenu placeholder */}
              <div className="relative z-10 text-center p-8">
                <svg className="w-20 h-20 mx-auto mb-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-2xl font-bold mb-4">Intégration Calendly</h3>
                <p className="text-white/70 mb-6 max-w-md">
                  Le widget Calendly sera intégré ici pour permettre la prise de rendez-vous directement sur cette page.
                </p>
                <div className="text-sm text-white/50 space-y-2">
                  <p>📅 Choisissez votre créneau</p>
                  <p>⏰ Durée : 30 minutes</p>
                  <p>💬 Visio ou téléphone</p>
                </div>

                {/* Instructions pour l'intégration */}
                <div className="mt-8 p-4 bg-primary-800/50 rounded-lg text-left text-sm">
                  <p className="text-white/70 mb-2"><strong className="text-secondary">Pour intégrer Calendly :</strong></p>
                  <ol className="text-white/60 space-y-1 list-decimal list-inside">
                    <li>Créez un compte sur Calendly</li>
                    <li>Configurez votre type d'événement</li>
                    <li>Récupérez le code d'intégration</li>
                    <li>Remplacez ce contenu par l'iframe Calendly</li>
                  </ol>
                </div>
              </div>

              {/* Alternative : Lien direct vers Calendly */}
              {/* Décommentez quand vous avez votre lien Calendly */}
              {/* <iframe
                src="https://calendly.com/VOTRE-COMPTE/30min"
                width="100%"
                height="100%"
                frameBorder="0"
              ></iframe> */}
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

