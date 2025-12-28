import Link from 'next/link';
import Image from 'next/image';
import { formatDate, estimateReadingTime } from '@/lib/utils';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
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
    <div className="min-h-screen bg-paper">
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
              className="opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/80 to-paper/40" />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10 pb-16 pt-32">
          <div className="max-w-4xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-primary/50 text-sm">
              <time>{formatDate(demoPost.published_at)}</time>
              <span>•</span>
              <span>{readingTime} min de lecture</span>
            </div>

            {/* Titre */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary leading-tight">
              {demoPost.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <article 
            className="max-w-4xl mx-auto prose prose-lg prose-headings:text-primary prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-12 prose-p:text-primary/70 prose-p:leading-relaxed prose-li:text-primary/70 prose-strong:text-primary prose-ul:text-primary/70"
            dangerouslySetInnerHTML={{ __html: demoPost.content }}
          />
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-paper-light">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-primary/10 shadow-xl">
            <h3 className="text-3xl font-bold mb-4 text-primary">
              Prêt à booster votre SEO local ?
            </h3>
            <p className="text-primary/60 mb-8 font-light">
              Discutons de votre projet et de votre stratégie de référencement local
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#rdv"
                className="btn-cta"
              >
                Réserver un appel
              </Link>
              <Link
                href="/blog"
                className="btn-sketch"
              >
                ← Tous les articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}




