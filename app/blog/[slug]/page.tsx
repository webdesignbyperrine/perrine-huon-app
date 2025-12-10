import Link from 'next/link';
import Image from 'next/image';
import { formatDate, estimateReadingTime } from '@/lib/utils';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  // Article de démo
  const demoPost = {
    title: 'Le SEO Local : Votre Atout pour Dominer Votre Marché',
    slug: 'seo-local-dominer-marche',
    content: `
      <h2>Qu'est-ce que le SEO local ?</h2>
      <p>Le référencement local est une stratégie qui vise à améliorer votre visibilité dans les résultats de recherche géolocalisés. Quand un potentiel client cherche "développeur web Lyon" ou "création site Marseille", c'est le SEO local qui détermine si votre site apparaît en première page.</p>
      
      <h2>Pourquoi est-ce crucial pour votre business ?</h2>
      <p>46% des recherches Google ont une intention locale. Si vous n'êtes pas visible localement, vous passez à côté de la moitié de vos clients potentiels.</p>
      
      <h2>Les piliers du SEO local</h2>
      <ul>
        <li><strong>Google My Business</strong> : Votre vitrine sur Google Maps</li>
        <li><strong>Citations locales</strong> : Présence cohérente sur les annuaires</li>
        <li><strong>Contenu géolocalisé</strong> : Pages optimisées par ville</li>
        <li><strong>Avis clients</strong> : Votre réputation en ligne</li>
        <li><strong>Backlinks locaux</strong> : Partenariats avec acteurs locaux</li>
      </ul>
      
      <h2>Comment je peux vous aider</h2>
      <p>J'intègre le SEO local dès la conception de votre site. Chaque page, chaque élément est pensé pour maximiser votre visibilité dans votre zone géographique cible.</p>
    `,
    cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    published_at: '2024-12-05T10:00:00Z',
    seo_city: 'Lyon',
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
              {demoPost.seo_city && (
                <>
                  <span>•</span>
                  <span>📍 {demoPost.seo_city}</span>
                </>
              )}
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
                className="px-10 py-4 bg-gradient-to-r from-secondary to-accent-red text-white font-semibold tracking-wider uppercase text-sm"
              >
                Réserver un appel
              </Link>
              <Link
                href="/blog"
                className="px-10 py-4 glass-dark text-white/80 hover:text-white font-semibold tracking-wider uppercase text-sm transition-colors"
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

