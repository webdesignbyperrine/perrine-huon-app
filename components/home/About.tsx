import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-primary-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-glow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Titre de section */}
          <div className="text-center mb-24">
            <div className="inline-block">
              <h2 className="text-6xl md:text-7xl font-bold mt-4">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  Derrière l'écran
                </span>
              </h2>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-8" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Photo */}
            <div className="relative group">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-secondary via-accent-red to-accent-orange opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500" />
                
                {/* Frame décoratif */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-secondary via-accent-orange to-accent-red opacity-50 rounded-2xl" />
                
                {/* Photo container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden glass-dark">
                  {/* Votre photo - décommentez et ajoutez portrait-perrine.jpg dans public/images/ */}
                  {/* <Image
                    src="/images/portrait-perrine.jpg"
                    alt="Perrine Huon"
                    fill
                    className="object-cover"
                    priority
                  /> */}
                  
                  {/* Placeholder temporaire */}
                  <div className="w-full h-full bg-gradient-to-br from-primary-800 to-primary-900 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-secondary to-accent-red rounded-full flex items-center justify-center">
                        <span className="text-6xl font-bold">PH</span>
                      </div>
                      <p className="text-white/50 text-sm mb-2">📸 Votre photo ici</p>
                      <p className="text-white/30 text-xs">
                        Ajoutez portrait-perrine.jpg<br />dans public/images/
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed">
                  Je construis des <span className="text-secondary font-normal">projets digitaux</span> avec{' '}
                  <span className="text-secondary font-normal">rigueur</span>, <span className="text-secondary font-normal">créativité</span>, et beaucoup d'écoute.
                </p>

                <div className="w-16 h-[1px] bg-secondary/50" />

                <p className="text-lg text-white/60 leading-relaxed font-light">
                  Un beau site, c'est bien. Un site qui vous rapporte des clients, <span className="text-white/90">c'est mieux</span>.
                  Mon objectif ? Que votre site travaille pour vous. Qu'il <span className="text-white/90">attire</span>,{' '}
                  <span className="text-white/90">convainque</span>, et <span className="text-accent-orange">convertisse</span>.
                </p>
              </div>

              {/* Stats minimalistes */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                {[
                  { value: '50+', label: 'Projets' },
                  { value: '100%', label: 'Satisfaction' },
                  { value: '5 ans', label: 'Expérience' },
                  { value: 'Top 3', label: 'SEO Local' },
                ].map((stat, index) => (
                  <div key={index} className="text-center glass-dark p-6 rounded-xl hover:bg-white/5 transition-colors duration-300">
                    <div className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent-orange bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</div>
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
