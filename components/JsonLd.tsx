export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.perrinehuon.com/#organization",
    name: "Perrine Huon - Création de Sites Internet",
    url: "https://www.perrinehuon.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.perrinehuon.com/images/logo_vert_perrine_huon.png",
      width: 512,
      height: 512,
    },
    description: "Développeur web freelance spécialisé en création de sites internet sur mesure, applications web et SEO géolocalisé pour PME, professions libérales et associations.",
    sameAs: [
      "https://www.linkedin.com/in/perrinehuon/",
      "https://www.instagram.com/perrinehuon.web",
      "https://www.facebook.com/profile.php?id=61586560335973",
      "http://www.michel-lafon.fr/auteur/124-Perrine+Huon",
      "https://www.amazon.fr/stores/Perrine-Huon/author/B004MZ3BJQ",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@perrinehuon.com",
      availableLanguage: ["French", "English", "Spanish"],
    },
    areaServed: {
      "@type": "Country",
      name: "France",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.perrinehuon.com/#person",
    name: "Perrine Huon",
    alternateName: ["Perrine Huon développeur web", "Perrine Huon développeuse web"],
    jobTitle: "Développeur Web Freelance — Création de Sites Internet",
    description: "Développeur web freelance spécialisé en création de sites internet sur mesure avec Next.js, React et Tailwind CSS. Expertise en SEO géolocalisé pour améliorer la visibilité locale des PME, professions libérales et associations en France. Auteur de deux livres publiés aux Éditions Michel Lafon.",
    url: "https://www.perrinehuon.com",
    image: "https://www.perrinehuon.com/images/perrine-huon-creation.webp",
    sameAs: [
      "https://www.linkedin.com/in/perrinehuon/",
      "https://www.instagram.com/perrinehuon.web",
      "https://www.facebook.com/profile.php?id=61586560335973",
      "http://www.michel-lafon.fr/auteur/124-Perrine+Huon",
      "https://www.amazon.fr/stores/Perrine-Huon/author/B004MZ3BJQ",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Perrine Huon - Création de Sites Internet",
    },
    knowsAbout: [
      "Création de sites internet",
      "Création de sites web sur mesure",
      "Développeur web freelance",
      "Développeur Next.js freelance",
      "Développeur React freelance",
      "Développeur full stack freelance",
      "Développement Web",
      "Web Design",
      "Développement Front-end",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "SEO",
      "SEO local",
      "Référencement géolocalisé",
      "Generative Engine Optimization",
      "UX Design",
      "UI Design",
      "Applications web",
      "E-commerce",
      "Landing pages",
      "CRM sur mesure",
      "Sites internet pour PME",
      "Sites internet pour professions libérales",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Développeur Web Freelance",
      occupationLocation: {
        "@type": "Country",
        name: "France",
      },
      skills: "Création de Sites Internet, Développement Web, Web Design, SEO, Next.js, React, TypeScript, Tailwind CSS, Supabase",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.perrinehuon.com/#website",
    url: "https://www.perrinehuon.com",
    name: "Perrine Huon - Création de Sites Internet & Développeur Web Freelance",
    description: "Création de sites internet sur mesure, applications web et SEO géolocalisé. Développeur web freelance pour PME, professions libérales et associations.",
    publisher: {
      "@id": "https://www.perrinehuon.com/#person",
    },
    inLanguage: "fr-FR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.perrinehuon.com/blog?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Public, verified review (with consent) that we can safely surface to Google
 * via Review/AggregateRating JSON-LD. Only use real client reviews here -
 * fake or self-authored reviews violate Google's review snippet policies.
 */
export type VerifiedReview = {
  author: string;
  datePublished: string;
  rating: 1 | 2 | 3 | 4 | 5;
  reviewBody: string;
};

export function LocalBusinessJsonLd({ reviews = [] }: { reviews?: VerifiedReview[] } = {}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.perrinehuon.com/#localbusiness",
    name: "Perrine Huon - Création de Sites Internet & Développeur Web Freelance",
    description: "Développeur web freelance proposant des services de création de sites internet sur mesure, développement d'applications web et optimisation SEO géolocalisé pour les PME, professions libérales et associations en France.",
    url: "https://www.perrinehuon.com",
    logo: "https://www.perrinehuon.com/images/logo_vert_perrine_huon.png",
    image: "https://www.perrinehuon.com/images/perrine-huon-creation.webp",
    email: "contact@perrinehuon.com",
    priceRange: "€€",
    paymentAccepted: ["Virement bancaire", "PayPal"],
    currenciesAccepted: "EUR",
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "City", name: "Paris" },
      { "@type": "City", name: "Lyon" },
      { "@type": "City", name: "Marseille" },
      { "@type": "City", name: "Toulouse" },
      { "@type": "City", name: "Bordeaux" },
      { "@type": "City", name: "Lille" },
      { "@type": "City", name: "Nantes" },
      { "@type": "City", name: "Strasbourg" },
      { "@type": "City", name: "Nice" },
      { "@type": "City", name: "Montpellier" },
      { "@type": "City", name: "Rennes" },
      { "@type": "City", name: "Grenoble" },
      { "@type": "City", name: "Rouen" },
      { "@type": "City", name: "Toulon" },
      { "@type": "City", name: "Dijon" },
      { "@type": "City", name: "Angers" },
      { "@type": "City", name: "Reims" },
      { "@type": "City", name: "Aix-en-Provence" },
      { "@type": "City", name: "Saint-Étienne" },
      { "@type": "City", name: "Clermont-Ferrand" },
      { "@type": "AdministrativeArea", name: "Île-de-France" },
      { "@type": "AdministrativeArea", name: "Auvergne-Rhône-Alpes" },
      { "@type": "AdministrativeArea", name: "Hauts-de-France" },
      { "@type": "AdministrativeArea", name: "Nouvelle-Aquitaine" },
      { "@type": "AdministrativeArea", name: "Occitanie" },
      { "@type": "AdministrativeArea", name: "Provence-Alpes-Côte d'Azur" },
      { "@type": "AdministrativeArea", name: "Grand Est" },
      { "@type": "AdministrativeArea", name: "Pays de la Loire" },
      { "@type": "AdministrativeArea", name: "Bretagne" },
      { "@type": "AdministrativeArea", name: "Normandie" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de Création Web",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Création de site vitrine",
            description: "Site internet professionnel sur mesure pour présenter votre activité et attirer des clients.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Création de site e-commerce",
            description: "Boutique en ligne performante avec paiement sécurisé et gestion des stocks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Développement d'application web",
            description: "Application web sur mesure avec tableau de bord, CRM et fonctionnalités avancées.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Création de landing page",
            description: "Page de conversion optimisée pour générer des leads et maximiser les résultats.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO local & référencement géolocalisé",
            description: "Optimisation du référencement local pour être visible dans votre zone géographique sur Google.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Refonte de site web",
            description: "Modernisation et optimisation de votre site existant pour de meilleures performances et conversions.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Maintenance & support",
            description: "Maintenance technique, mises à jour de sécurité, sauvegardes et support prioritaire.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CRM & logiciel de gestion sur mesure",
            description: "Développement de CRM et outils de gestion adaptés à votre métier et vos processus.",
          },
        },
      ],
    },
    // aggregateRating + Review are only emitted when verified reviews are
    // provided. Self-attributed or fabricated ratings violate Google's
    // review snippet policies (see
    // https://developers.google.com/search/docs/appearance/structured-data/review-snippet).
    ...(reviews.length > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: (
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1),
            reviewCount: String(reviews.length),
            bestRating: "5",
            worstRating: "1",
          },
          review: reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            datePublished: r.datePublished,
            reviewRating: {
              "@type": "Rating",
              ratingValue: String(r.rating),
              bestRating: "5",
              worstRating: "1",
            },
            reviewBody: r.reviewBody,
          })),
        }
      : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ArticleJsonLd({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  image,
  keywords,
  articleSection,
  wordCount,
  speakableCss,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
  speakableCss?: string[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      "@id": "https://www.perrinehuon.com/#person",
    },
    publisher: {
      "@id": "https://www.perrinehuon.com/#organization",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(image ? { image: { "@type": "ImageObject", url: image } } : {}),
    inLanguage: "fr-FR",
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(", ") } : {}),
    ...(articleSection ? { articleSection } : {}),
    ...(wordCount ? { wordCount } : {}),
    ...(speakableCss && speakableCss.length > 0
      ? {
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: speakableCss,
          },
        }
      : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FAQPageJsonLd({
  faqs,
  speakable = true,
}: {
  faqs: { question: string; answer: string }[];
  speakable?: boolean;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
    // SpeakableSpecification helps Google Assistant / voice search and is one
    // of the strongest signals for being quoted by LLM-powered answer engines.
    ...(speakable
      ? {
          speakable: {
            "@type": "SpeakableSpecification",
            xpath: [
              "/html/head/title",
              "/html/head/meta[@name='description']/@content",
            ],
          },
        }
      : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Per-service Schema.org/Service JSON-LD. Use one block per dedicated service
 * page (vitrine, e-commerce, refonte, SEO local, etc.) so Google can
 * distinguish individual service offerings instead of relying on the
 * homepage's hasOfferCatalog.
 */
export function ServiceJsonLd({
  name,
  description,
  url,
  image,
  serviceType,
  areaServed = "France",
  priceRange,
  offers,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  serviceType?: string;
  /**
   * `areaServed` accepte :
   *  - une string ("France") → Country
   *  - un string[] (["Paris", "Lyon", ...]) → liste de City
   * Cela permet de renforcer le signal SEO local pour les pages métier.
   */
  areaServed?: string | string[];
  priceRange?: string;
  offers?: { name: string; price?: string; priceCurrency?: string; description?: string }[];
}) {
  const areaServedSchema = Array.isArray(areaServed)
    ? areaServed.map((city) => ({ "@type": "City", name: city }))
    : { "@type": "Country", name: areaServed };

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    ...(image ? { image } : {}),
    ...(serviceType ? { serviceType } : {}),
    provider: { "@id": "https://www.perrinehuon.com/#organization" },
    areaServed: areaServedSchema,
    ...(priceRange ? { priceRange } : {}),
    ...(offers && offers.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name,
            itemListElement: offers.map((o) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: o.name,
                ...(o.description ? { description: o.description } : {}),
              },
              ...(o.price
                ? {
                    price: o.price,
                    priceCurrency: o.priceCurrency ?? "EUR",
                  }
                : {}),
            })),
          },
        }
      : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * HowTo JSON-LD for tutorial-style blog posts. Strongly preferred by
 * Perplexity, ChatGPT and Google's "things to do" carousels.
 */
export function HowToJsonLd({
  name,
  description,
  totalTime,
  steps,
  image,
}: {
  name: string;
  description: string;
  totalTime?: string;
  steps: { name: string; text: string; url?: string; image?: string }[];
  image?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(image ? { image } : {}),
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
      ...(s.image ? { image: s.image } : {}),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function MainJsonLd() {
  return (
    <>
      <OrganizationJsonLd />
      <PersonJsonLd />
      <WebSiteJsonLd />
      <LocalBusinessJsonLd />
    </>
  )
}
