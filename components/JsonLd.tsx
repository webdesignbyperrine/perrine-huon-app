export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://perrinehuon.com/#organization",
    name: "Perrine Huon - Création de Sites Internet",
    url: "https://perrinehuon.com",
    logo: {
      "@type": "ImageObject",
      url: "https://perrinehuon.com/images/logo_vert_perrine_huon.png",
      width: 512,
      height: 512,
    },
    description: "Développeuse web freelance spécialisée en création de sites internet sur mesure, applications web et SEO géolocalisé pour PME, professions libérales et associations.",
    sameAs: [
      "https://www.linkedin.com/in/perrinehuon/",
      "https://www.instagram.com/perrinehuon.web",
      "https://www.facebook.com/profile.php?id=61586560335973",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@perrinehuon.com",
      availableLanguage: ["French"],
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
    "@id": "https://perrinehuon.com/#person",
    name: "Perrine Huon",
    jobTitle: "Développeuse Web Freelance — Création de Sites Internet",
    description: "Développeuse web freelance spécialisée en création de sites internet sur mesure avec Next.js, React et Tailwind CSS. Expertise en SEO géolocalisé pour améliorer la visibilité locale des PME, professions libérales et associations en France.",
    url: "https://perrinehuon.com",
    image: "https://perrinehuon.com/images/perrine-huon-creation.webp",
    sameAs: [
      "https://www.linkedin.com/in/perrinehuon/",
      "https://www.instagram.com/perrinehuon.web",
      "https://www.facebook.com/profile.php?id=61586560335973",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Perrine Huon - Création de Sites Internet",
    },
    knowsAbout: [
      "Création de sites internet",
      "Création de sites web sur mesure",
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
      name: "Développeuse Web Freelance",
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
    "@id": "https://perrinehuon.com/#website",
    url: "https://perrinehuon.com",
    name: "Perrine Huon - Création de Sites Internet & Développeuse Web Freelance",
    description: "Création de sites internet sur mesure, applications web et SEO géolocalisé. Développeuse web freelance pour PME, professions libérales et associations.",
    publisher: {
      "@id": "https://perrinehuon.com/#person",
    },
    inLanguage: "fr-FR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://perrinehuon.com/blog?search={search_term_string}",
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

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://perrinehuon.com/#localbusiness",
    name: "Perrine Huon - Création de Sites Internet & Développeuse Web Freelance",
    description: "Développeuse web freelance proposant des services de création de sites internet sur mesure, développement d'applications web et optimisation SEO géolocalisé pour les PME, professions libérales et associations en France.",
    url: "https://perrinehuon.com",
    logo: "https://perrinehuon.com/images/logo_vert_perrine_huon.png",
    image: "https://perrinehuon.com/images/perrine-huon-creation.webp",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "10",
      bestRating: "5",
      worstRating: "1",
    },
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
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
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
      "@id": "https://perrinehuon.com/#person",
    },
    publisher: {
      "@id": "https://perrinehuon.com/#organization",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(image ? { image: { "@type": "ImageObject", url: image } } : {}),
    inLanguage: "fr-FR",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FAQPageJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
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
