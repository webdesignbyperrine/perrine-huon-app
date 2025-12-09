export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-primary-900 to-primary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Photo */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent-red rounded-2xl opacity-20 blur-2xl" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-secondary/30 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-secondary to-accent-red rounded-full flex items-center justify-center">
                      <span className="text-5xl font-bold">PH</span>
                    </div>
                    <p className="text-white/70 text-sm">Photo de Perrine à ajouter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div>
            <h2 className="section-title">À propos</h2>
            <div className="space-y-4 text-white/80 text-lg">
              <p>
                Passionnée par le <span className="text-secondary font-semibold">web design</span> et le{' '}
                <span className="text-secondary font-semibold">développement</span>, je mets mon expertise au service
                de votre réussite digitale.
              </p>
              <p>
                Ma spécialité ? Créer des expériences web <span className="text-accent-orange font-semibold">uniques</span> et{' '}
                <span className="text-accent-orange font-semibold">performantes</span>, optimisées pour le référencement local.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { number: '50+', label: 'Projets réalisés' },
                  { number: '100%', label: 'Clients satisfaits' },
                  { number: '5 ans', label: 'D\'expérience' },
                  { number: 'SEO', label: 'Expert local' },
                ].map((stat, index) => (
                  <div key={index} className="card text-center">
                    <div className="text-3xl font-bold text-secondary mb-2">{stat.number}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

