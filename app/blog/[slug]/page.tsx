import Link from 'next/link';
import Image from 'next/image';
import { formatDate, estimateReadingTime } from '@/lib/utils';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  // Article de démo
  const demoPost = {
    title: 'Vibe Coding : La révolution de 2025 et ce qui nous attend',
    slug: 'vibe-coding-2025-2026',
    content: `
      <h2>Le vibe coding, c'est quoi exactement ?</h2>
      <p>Le terme "vibe coding" a explosé en 2025. L'idée ? Coder en décrivant ce qu'on veut en langage naturel, assisté par l'IA. Fini les heures passées sur la syntaxe : on se concentre sur la vision, l'IA s'occupe de l'exécution.</p>
      
      <h2>Ce qui a changé en 2025</h2>
      <p>Cette année a été un tournant. Des outils comme Cursor, Lovable, et v0 ont démocratisé cette approche. Des projets complets sont désormais réalisables en quelques heures au lieu de plusieurs semaines.</p>
      <ul>
        <li><strong>Cursor + Claude</strong> : Le duo qui a tout changé pour le développement</li>
        <li><strong>Lovable</strong> : Du prompt à l'app en quelques minutes</li>
        <li><strong>v0 by Vercel</strong> : Génération d'interfaces React instantanée</li>
        <li><strong>Bolt.new</strong> : Prototypage full-stack en temps réel</li>
      </ul>
      
      <h2>Les limites qu'on a découvertes</h2>
      <p>Tout n'est pas rose. Le vibe coding excelle pour les MVPs et les prototypes, mais les projets complexes nécessitent toujours une expertise technique solide. L'IA génère du code, mais comprendre ce code reste essentiel.</p>
      
      <h2>Ce qui nous attend en 2026</h2>
      <p>Les prédictions sont enthousiasmantes : agents autonomes capables de gérer des projets entiers, meilleure compréhension du contexte métier, et intégration native dans tous les IDE. Le développeur de demain sera avant tout un chef d'orchestre.</p>
      
      <h2>Mon approche</h2>
      <p>J'utilise le vibe coding quotidiennement pour accélérer mes projets. Résultat : des délais divisés par 3, sans compromis sur la qualité. Et vous bénéficiez directement de cette efficacité.</p>
    `,
    cover_image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
    published_at: '2025-12-10T10:00:00Z',
  };

  const readingTime = estimateReadingTime(demoPost.content);

  return (
    <div className="min-h-screen bg-primary-900">
      {/* Hero article */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        {demoPost.cover_image_url && (
          <div className="absolute inset-0">
            <Image
              src={demoPost.cover_image_url}
              alt={demoPost.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
              className="opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/80 to-primary-900/40" />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10 pb-16 pt-32">
          <div className="max-w-4xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-white/50 text-sm">
              <time>{formatDate(demoPost.published_at)}</time>
              <span>•</span>
              <span>{readingTime} min de lecture</span>
            </div>

            {/* Titre */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              {demoPost.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <article 
            className="max-w-4xl mx-auto prose prose-invert prose-lg prose-headings:text-white prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-12 prose-p:text-white/70 prose-p:leading-relaxed prose-li:text-white/70 prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: demoPost.content }}
          />
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-primary-800/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto glass-dark rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-4 text-white">
              Prêt à booster votre SEO local ?
            </h3>
            <p className="text-white/70 mb-8 font-light">
              Discutons de votre projet et de votre stratégie de référencement local
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#rdv"
                className="group/cta relative inline-block transition-transform duration-300 hover:scale-[1.02]"
              >
                <div 
                  className="relative flex items-center gap-3 px-10 py-4 rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}
                >
                  <span className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }} />
                  <span className="absolute inset-1 rounded-full pointer-events-none overflow-hidden" style={{ background: 'linear-gradient(180deg, #476787 0%, var(--secondary) 50%, #1C2A35 100%)', boxShadow: '0 0 20px rgba(47, 69, 88, 0.6), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)' }}>
                    <span className="absolute top-1 left-6 right-6 h-2 rounded-full transition-transform duration-500 group-hover/cta:translate-x-2" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)' }} />
                  </span>
                  <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm drop-shadow-lg">Réserver un appel</span>
                </div>
              </Link>
              <Link
                href="/blog"
                className="group/cta relative inline-block transition-transform duration-300 hover:scale-[1.02]"
              >
                <div 
                  className="relative flex items-center gap-3 px-10 py-4 rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}
                >
                  <span className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }} />
                  <span className="relative z-10 text-white/80 group-hover/cta:text-white font-semibold tracking-wider uppercase text-sm transition-colors">← Tous les articles</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



