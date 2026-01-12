// Données structurées JSON-LD pour le SEO et les LLM
// Ces données aident Google et les IA à comprendre le contenu du site

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://perrinehuon.com/#organization",
    name: "Perrine Huon - Web Designer Freelance",
    url: "https://perrinehuon.com",
    logo: {
      "@type": "ImageObject",
      url: "https://perrinehuon.com/images/logo_vert_perrine_huon.png",
      width: 512,
      height: 512,
    },
    description: "Web designer et développeuse freelance spécialisée en création de sites web sur mesure, applications web et SEO géolocalisé.",
    sameAs: [
      "https://www.linkedin.com/in/perrinehuon/",
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
    jobTitle: "Web Designer & Développeuse Freelance",
    description: "Web designer et développeuse freelance spécialisée en création de sites web sur mesure avec Next.js, React et Tailwind CSS. Expertise en SEO géolocalisé pour améliorer la visibilité locale des entreprises.",
    url: "https://perrinehuon.com",
    image: "https://perrinehuon.com/images/perrine-huon-creation.webp",
    sameAs: [
      "https://www.linkedin.com/in/perrinehuon/",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Perrine Huon - Web Designer Freelance",
    },
    knowsAbout: [
      "Création de sites web",
      "Web Design",
      "Développement Front-end",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "SEO",
      "SEO local",
      "Référencement géolocalisé",
      "UX Design",
      "UI Design",
      "Applications web",
      "E-commerce",
      "Landing pages",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Web Designer Freelance",
      occupationLocation: {
        "@type": "Country",
        name: "France",
      },
      skills: "Web Design, Développement Web, SEO, Next.js, React, TypeScript, Tailwind CSS",
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
    name: "Perrine Huon - Web Designer & Développeuse Freelance",
    description: "Portfolio et services de création de sites web sur mesure, applications web et SEO géolocalisé.",
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
    name: "Perrine Huon - Web Designer Freelance",
    description: "Web designer et développeuse freelance proposant des services de création de sites web sur mesure, développement d'applications web et optimisation SEO géolocalisé pour les entreprises en France.",
    url: "https://perrinehuon.com",
    logo: "https://perrinehuon.com/images/logo_vert_perrine_huon.png",
    image: "https://perrinehuon.com/images/perrine-huon-creation.webp",
    email: "contact@perrinehuon.com",
    priceRange: "€€",
    paymentAccepted: ["Virement bancaire", "PayPal"],
    currenciesAccepted: "EUR",
    areaServed: [
      {
        "@type": "Country",
        name: "France",
      },
      {
        "@type": "City",
        name: "Paris",
      },
      {
        "@type": "City",
        name: "Lyon",
      },
      {
        "@type": "City",
        name: "Lille",
      },
      {
        "@type": "City",
        name: "Bordeaux",
      },
      {
        "@type": "City",
        name: "Marseille",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Web",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Création de site vitrine",
            description: "Site web professionnel sur mesure pour présenter votre activité et attirer des clients.",
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
            description: "Application web sur mesure avec tableau de bord et fonctionnalités avancées.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO géolocalisé",
            description: "Optimisation du référencement local pour être visible dans votre zone géographique.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Refonte de site web",
            description: "Modernisation et optimisation de votre site existant.",
          },
        },
      ],
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

// Composant combiné pour le layout principal
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
