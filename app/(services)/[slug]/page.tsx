import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllServiceSlugs, getServiceBySlug } from '@/lib/services-data';
import { getAllLocationSlugs, getLocationBySlug } from '@/lib/locations-data';
import { getAllProfessionSlugs, getProfessionBySlug } from '@/lib/professions-data';
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/JsonLd';

const LOCATION_PREFIX = 'creation-site-internet-';
const PROFESSION_PREFIX = 'site-internet-';

type PageType =
  | { kind: 'service'; dataSlug: string }
  | { kind: 'location'; dataSlug: string }
  | { kind: 'profession'; dataSlug: string }
  | null;

function resolveSlug(slug: string): PageType {
  if (getServiceBySlug(slug)) return { kind: 'service', dataSlug: slug };
  if (slug.startsWith(LOCATION_PREFIX)) {
    const loc = slug.slice(LOCATION_PREFIX.length);
    if (getLocationBySlug(loc)) return { kind: 'location', dataSlug: loc };
  }
  if (slug.startsWith(PROFESSION_PREFIX)) {
    const prof = slug.slice(PROFESSION_PREFIX.length);
    if (getProfessionBySlug(prof)) return { kind: 'profession', dataSlug: prof };
  }
  return null;
}

export async function generateStaticParams() {
  const serviceSlugs = getAllServiceSlugs().map((s) => ({ slug: s }));
  const locationSlugs = getAllLocationSlugs().map((s) => ({ slug: `${LOCATION_PREFIX}${s}` }));
  const professionSlugs = getAllProfessionSlugs().map((s) => ({ slug: `${PROFESSION_PREFIX}${s}` }));
  return [...serviceSlugs, ...locationSlugs, ...professionSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveSlug(slug);
  if (!resolved) return { title: 'Page non trouvée' };

  if (resolved.kind === 'service') {
    const s = getServiceBySlug(resolved.dataSlug)!;
    return {
      title: s.metaTitle,
      description: s.metaDescription,
      alternates: { canonical: `https://perrinehuon.com/${slug}` },
      openGraph: { title: s.metaTitle, description: s.metaDescription, url: `https://perrinehuon.com/${slug}`, type: 'website', locale: 'fr_FR', siteName: 'Perrine Huon - Création de Sites Internet' },
      twitter: { card: 'summary_large_image', title: s.metaTitle, description: s.metaDescription },
    };
  }

  if (resolved.kind === 'location') {
    const l = getLocationBySlug(resolved.dataSlug)!;
    return {
      title: l.metaTitle,
      description: l.metaDescription,
      alternates: { canonical: `https://perrinehuon.com/${slug}` },
      openGraph: { title: l.metaTitle, description: l.metaDescription, url: `https://perrinehuon.com/${slug}`, type: 'website', locale: 'fr_FR', siteName: 'Perrine Huon - Création de Sites Internet' },
      twitter: { card: 'summary_large_image', title: l.metaTitle, description: l.metaDescription },
    };
  }

  const p = getProfessionBySlug(resolved.dataSlug)!;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: `https://perrinehuon.com/${slug}` },
    openGraph: { title: p.metaTitle, description: p.metaDescription, url: `https://perrinehuon.com/${slug}`, type: 'website', locale: 'fr_FR', siteName: 'Perrine Huon - Création de Sites Internet' },
    twitter: { card: 'summary_large_image', title: p.metaTitle, description: p.metaDescription },
  };
}

// ---------------------------------------------------------------------------
// Main dispatcher
// ---------------------------------------------------------------------------
export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolved = resolveSlug(slug);
  if (!resolved) notFound();

  if (resolved.kind === 'service') return <ServiceView slug={slug} dataSlug={resolved.dataSlug} />;
  if (resolved.kind === 'location') return <LocationView slug={slug} dataSlug={resolved.dataSlug} />;
  return <ProfessionView slug={slug} dataSlug={resolved.dataSlug} />;
}

// ---------------------------------------------------------------------------
// SERVICE VIEW
// ---------------------------------------------------------------------------
function ServiceView({ slug, dataSlug }: { slug: string; dataSlug: string }) {
  const service = getServiceBySlug(dataSlug)!;
  return (
    <div className="min-h-screen bg-paper-light">
      <BreadcrumbJsonLd items={[{ name: 'Accueil', url: 'https://perrinehuon.com' }, { name: service.title, url: `https://perrinehuon.com/${slug}` }]} />
      <FAQPageJsonLd faqs={service.faqs} />

      <section className="relative grain-overlay pt-32 pb-20 bg-paper">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-primary/50 hover:text-primary transition-colors mb-8 text-sm">← Retour à l&apos;accueil</Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">{service.title}</h1>
            <p className="text-xl md:text-2xl text-primary/60 leading-relaxed max-w-3xl mx-auto">{service.heroSubtitle}</p>
            <div className="mt-10"><Link href="/?openQualifier=true" className="btn-cta">{service.ctaText}</Link></div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">Ce que comprend cette prestation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.features.map((f, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-sketch-lg p-6 border-2 border-primary/10">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">{i + 1}</span>
                  <p className="text-primary/80 leading-relaxed">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-headings:text-primary prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-12 prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-p:text-primary/70 prose-p:leading-relaxed prose-li:text-primary/70 prose-strong:text-primary prose-ul:text-primary/70" dangerouslySetInnerHTML={{ __html: service.content }} />
        </div>
      </section>

      <section className="py-16 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center bg-white/60 backdrop-blur-sm rounded-sketch-lg p-10 md:p-14 border-2 border-primary/10">
            <p className="text-sm uppercase tracking-widest text-primary/40 mb-3">Tarif indicatif</p>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-4">{service.priceRange}</p>
            <p className="text-primary/60 mb-8 max-w-xl mx-auto">Chaque projet est unique. Le tarif final dépend de la complexité, du volume de contenu et des fonctionnalités souhaitées. Demandez un devis personnalisé gratuit.</p>
            <Link href="/?openQualifier=true" className="btn-cta">Obtenir un devis gratuit</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">Questions fréquentes</h2>
            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <details key={i} className="group bg-white/60 backdrop-blur-sm rounded-sketch-lg border-2 border-primary/10 overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-primary font-semibold text-lg hover:bg-primary/5 transition-colors">
                    {faq.question}
                    <span className="flex-shrink-0 ml-4 text-accent group-open:rotate-45 transition-transform text-2xl">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-primary/70 leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prêt à démarrer votre projet ?</h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">Discutons de vos besoins et construisons ensemble la solution idéale pour votre activité. Premier échange gratuit et sans engagement.</p>
            <Link href="/?openQualifier=true" className="btn-cta">{service.ctaText}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LOCATION VIEW
// ---------------------------------------------------------------------------
const whyChoosePoints = [
  { title: 'Sites sur mesure, pas de templates', description: 'Chaque site est conçu de zéro avec les technologies les plus modernes (Next.js, React, Tailwind CSS) pour des performances optimales.' },
  { title: 'SEO local intégré dès la conception', description: 'Votre site est optimisé pour apparaître dans les résultats de recherche géolocalisés et attirer la clientèle de votre zone.' },
  { title: 'Design qui convertit les visiteurs en clients', description: "UX pensée pour guider vos visiteurs vers l'action : appel, formulaire, achat. Chaque élément a un objectif." },
  { title: 'Performances techniques irréprochables', description: "Sites ultra-rapides avec un score Google PageSpeed élevé. La vitesse est un critère de référencement et de conversion." },
  { title: 'Accompagnement de A à Z', description: 'De la conception au lancement et au-delà : je vous accompagne avec un suivi personnalisé et une maintenance proactive.' },
  { title: 'Tarifs transparents, sans surprise', description: 'Devis détaillé et gratuit. Vous savez exactement ce que vous payez, sans coûts cachés ni mauvaises surprises.' },
];

function LocationJsonLd({ name, slug, type }: { name: string; slug: string; type: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Perrine Huon - Création de Sites Internet à ${name}`,
    description: `Développeuse web freelance proposant la création de sites internet sur mesure à ${name}.`,
    url: `https://perrinehuon.com/creation-site-internet-${slug}`,
    logo: 'https://perrinehuon.com/images/logo_vert_perrine_huon.png',
    email: 'contact@perrinehuon.com',
    priceRange: '€€',
    areaServed: { '@type': type === 'region' ? 'AdministrativeArea' : 'City', name },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function LocationView({ slug, dataSlug }: { slug: string; dataSlug: string }) {
  const location = getLocationBySlug(dataSlug)!;
  const typeLabel = location.type === 'city' ? 'Ville' : location.type === 'arrondissement' ? 'Arrondissement' : 'Région';

  return (
    <div className="min-h-screen bg-paper">
      <BreadcrumbJsonLd items={[{ name: 'Accueil', url: 'https://perrinehuon.com' }, { name: `Création de site internet à ${location.name}`, url: `https://perrinehuon.com/${slug}` }]} />
      <LocationJsonLd name={location.name} slug={dataSlug} type={location.type} />

      <section className="relative bg-paper-light grain-overlay overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 border-2 border-primary rounded-full" />
          <div className="absolute bottom-10 left-10 w-40 h-40 border-2 border-primary rotate-45" />
        </div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 border-2 border-primary/20 rounded-full text-xs uppercase tracking-widest text-primary/50 mb-6">{typeLabel}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">{location.h1}</h1>
            <p className="text-lg text-primary/60 max-w-2xl mx-auto">Développeuse web freelance spécialisée en création de sites internet sur mesure pour les entreprises de {location.name}.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-headings:text-primary prose-p:text-primary/70 prose-p:leading-relaxed prose-strong:text-primary" dangerouslySetInnerHTML={{ __html: location.introduction }} />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 text-center">Types d&apos;entreprises à {location.name}</h2>
            <p className="text-primary/60 text-center mb-12 max-w-2xl mx-auto">Je travaille avec tous types de professionnels à {location.name}, voici les secteurs les plus représentés.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {location.localBusinessTypes.map((type) => (
                <div key={type} className="bg-white/60 backdrop-blur-sm rounded-sketch-lg p-5 border-2 border-primary/10 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-sketch">
                  <span className="text-primary font-medium text-sm">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 text-center">Pourquoi choisir Perrine Huon pour votre site internet à {location.name}&nbsp;?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {whyChoosePoints.map((point, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white/40 backdrop-blur-sm rounded-sketch-lg border-2 border-primary/10 transition-all duration-300 hover:border-accent/30">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"><span className="text-accent font-bold text-sm">{i + 1}</span></div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">{point.title}</h3>
                    <p className="text-primary/60 text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-sketch-lg p-10 md:p-14 border-2 border-primary/10">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Le chiffre clé</h2>
              <p className="text-lg text-primary/70 leading-relaxed">{location.keyStats}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-paper">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-sm rounded-sketch-lg p-10 md:p-14 border-2 border-primary/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Prêt·e à créer votre site internet à {location.name}&nbsp;?</h2>
            <p className="text-primary/60 mb-8 max-w-xl mx-auto">Discutons de votre projet. Je vous propose un échange gratuit et sans engagement pour définir la meilleure solution web pour votre activité à {location.name}.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/?openQualifier=true" className="btn-cta">Démarrer mon projet</Link>
              <Link href="/#rdv" className="btn-sketch">Réserver un appel gratuit</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PROFESSION VIEW
// ---------------------------------------------------------------------------
const categoryLabels: Record<string, string> = { 'profession-liberale': 'Profession Libérale', pme: 'PME & Commerce', association: 'Association' };

function ProfessionView({ slug, dataSlug }: { slug: string; dataSlug: string }) {
  const profession = getProfessionBySlug(dataSlug)!;

  return (
    <div className="min-h-screen bg-paper-light grain-overlay">
      <BreadcrumbJsonLd items={[{ name: 'Accueil', url: 'https://perrinehuon.com' }, { name: profession.name, url: `https://perrinehuon.com/${slug}` }]} />
      <FAQPageJsonLd faqs={profession.faqs} />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-sm font-medium text-primary/40 uppercase tracking-widest mb-4">{categoryLabels[profession.category] ?? profession.category}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">{profession.h1}</h1>
            <p className="text-lg text-primary/60 max-w-2xl mx-auto">Un site internet sur mesure conçu pour les besoins spécifiques de votre profession, optimisé pour le référencement local et la conversion.</p>
            <div className="w-24 h-0.5 bg-primary/20 mx-auto mt-8" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-headings:text-primary prose-p:text-primary/70 prose-p:leading-relaxed prose-strong:text-primary" dangerouslySetInnerHTML={{ __html: profession.introduction }} />
        </div>
      </section>

      <section className="py-20 bg-paper-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Fonctionnalités clés pour {profession.name.toLowerCase()}</h2>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profession.keyFeatures.map((f, i) => (
              <div key={i} className="bg-paper border-2 border-primary/10 rounded-sketch-lg p-6 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4"><span className="text-accent font-bold text-sm">{String(i + 1).padStart(2, '0')}</span></div>
                <p className="text-primary font-medium text-sm leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {profession.regulations && (
        <section className="py-16 bg-paper">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-accent/5 border-2 border-accent/20 rounded-sketch-lg p-8 sm:p-12">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Réglementation &amp; conformité</h2>
                  <p className="text-primary/70 leading-relaxed">{profession.regulations}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-paper-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16"><h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Questions fréquentes</h2></div>
          <div className="max-w-3xl mx-auto space-y-4">
            {profession.faqs.map((faq, i) => (
              <details key={i} className="group bg-paper border-2 border-primary/10 rounded-sketch-lg overflow-hidden hover:border-primary/20 transition-all duration-300">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-primary pr-4 group-hover:text-accent transition-colors">{faq.question}</h3>
                  <svg className="w-5 h-5 flex-shrink-0 text-accent transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-6 pb-6"><p className="text-primary/60 leading-relaxed font-light">{faq.answer}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-paper-light border-2 border-primary/10 rounded-sketch-lg p-12 hover:border-primary/20 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-4 text-primary">Prêt à créer votre site internet ?</h2>
            <p className="text-primary/60 mb-8 max-w-xl mx-auto">Discutons de votre projet et de vos besoins spécifiques. Je vous propose un accompagnement personnalisé pour créer le site qui fera décoller votre activité.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/?openQualifier=true" className="btn-cta">Démarrer mon projet</Link>
              <Link href="/#rdv" className="btn-sketch">Réserver un appel</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
