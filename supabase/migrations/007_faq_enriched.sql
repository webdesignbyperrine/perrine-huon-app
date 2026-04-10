ALTER TABLE public.faqs ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
ALTER TABLE public.faqs ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;
ALTER TABLE public.faqs ADD COLUMN IF NOT EXISTS category TEXT;

DELETE FROM public.faqs;

-- ============================================
-- CATÉGORIE : Tarifs & Budget
-- ============================================

INSERT INTO public.faqs (question, answer, category, sort_order, is_published) VALUES
(
  'Combien coûte un site internet vitrine ?',
  'Un site vitrine professionnel coûte généralement entre 1 500 € et 5 000 €, selon le nombre de pages, le niveau de personnalisation et les fonctionnalités souhaitées (formulaire de contact, galerie, blog, etc.). Un site de 5 pages avec un design sur mesure et une optimisation SEO de base se situe autour de 2 500 € à 3 500 €. Ce tarif inclut la conception graphique, le développement, l''intégration du contenu et la mise en ligne. Je vous recommande de définir clairement vos besoins en amont pour obtenir un devis précis et éviter les surprises.',
  'Tarifs & Budget',
  1,
  true
),
(
  'Combien coûte un site e-commerce ?',
  'Un site e-commerce sur mesure représente un investissement de 3 000 € à 15 000 € selon la complexité : nombre de produits, passerelle de paiement, gestion des stocks, livraison, espace client, etc. Pour une boutique en ligne de moins de 50 produits avec Stripe ou PayPal, comptez entre 4 000 € et 7 000 €. Les solutions plus complexes avec gestion multi-devises, abonnements ou marketplace dépassent souvent les 10 000 €. L''important est de choisir une architecture évolutive qui pourra grandir avec votre activité.',
  'Tarifs & Budget',
  2,
  true
),
(
  'Combien coûte une application web sur mesure ?',
  'Le coût d''une application web sur mesure démarre à partir de 5 000 € et peut atteindre 30 000 € ou plus selon la complexité fonctionnelle. Un outil de gestion interne simple se situe autour de 5 000 € à 10 000 €, tandis qu''une plateforme SaaS complète avec authentification, tableaux de bord et API nécessite un budget de 15 000 € à 30 000 €. Chaque projet est unique : je réalise d''abord un cahier des charges détaillé pour estimer précisément le temps de développement. Un MVP (produit minimum viable) permet souvent de démarrer avec un budget maîtrisé puis d''itérer.',
  'Tarifs & Budget',
  3,
  true
),
(
  'Quels sont les coûts récurrents d''un site web ?',
  'Les coûts annuels d''un site web comprennent l''hébergement (50 € à 300 €/an selon la solution), le nom de domaine (10 € à 20 €/an), le certificat SSL (souvent gratuit avec Let''s Encrypt), et éventuellement la maintenance technique (200 € à 1 200 €/an). Si vous utilisez des outils tiers comme une newsletter ou un CRM, prévoyez des abonnements supplémentaires. Je recommande un budget annuel de 500 € à 1 500 € pour maintenir un site professionnel performant et sécurisé. C''est un investissement modeste comparé à la visibilité qu''il vous apporte.',
  'Tarifs & Budget',
  4,
  true
),
(
  'Proposez-vous des facilités de paiement ?',
  'Oui, je propose un échelonnement du paiement en plusieurs fois pour rendre votre projet accessible. Le schéma classique est un acompte de 30 % à la signature du devis, 40 % à la validation des maquettes, et 30 % à la livraison finale. Pour les projets plus importants, un paiement en 3 à 4 mensualités peut être envisagé. L''objectif est de trouver un arrangement qui vous convient tout en permettant un déroulement fluide du projet. N''hésitez pas à en discuter lors de notre premier échange.',
  'Tarifs & Budget',
  5,
  true
),
(
  'Pourquoi un site sur mesure coûte-t-il plus cher qu''un template ?',
  'Un site sur mesure est conçu spécifiquement pour votre activité, votre identité visuelle et vos objectifs business. Contrairement à un template pré-fabriqué, chaque élément est pensé pour optimiser l''expérience de vos visiteurs et votre taux de conversion. Le code est plus propre, plus performant et plus facile à faire évoluer. Un template peut sembler économique au départ, mais les coûts cachés de personnalisation, les limitations fonctionnelles et les problèmes de performance finissent souvent par dépasser l''investissement d''un site sur mesure. C''est un investissement dans la durabilité et la qualité.',
  'Tarifs & Budget',
  6,
  true
),
(
  'Combien coûte la maintenance d''un site web ?',
  'La maintenance d''un site web coûte entre 50 € et 200 € par mois selon le niveau de service. Un forfait basique inclut les mises à jour de sécurité, les sauvegardes régulières et la surveillance de la disponibilité. Un forfait premium ajoute les modifications de contenu, l''optimisation des performances et un support prioritaire. Sans maintenance, votre site devient vulnérable aux failles de sécurité et risque de perdre en performance au fil du temps. Je recommande au minimum un suivi trimestriel pour garantir le bon fonctionnement et la sécurité de votre site.',
  'Tarifs & Budget',
  7,
  true
),
(
  'Le devis est-il gratuit ?',
  'Oui, le devis est entièrement gratuit et sans engagement. Après un premier échange pour comprendre vos besoins, je vous envoie une proposition détaillée incluant le périmètre du projet, les fonctionnalités prévues, le planning estimé et le budget. Ce document vous permet de comparer les offres en toute transparence. Je prends le temps de vous expliquer chaque poste pour que vous compreniez exactement ce que vous payez. N''hésitez pas à me contacter pour en discuter, même si votre projet n''est qu''au stade de la réflexion.',
  'Tarifs & Budget',
  8,
  true
),
(
  'Que comprend exactement le prix d''un site vitrine ?',
  'Le prix d''un site vitrine inclut généralement : l''audit de vos besoins, la conception UX/UI (wireframes et maquettes graphiques), le développement front-end et back-end, l''intégration de votre contenu, l''optimisation SEO technique de base, la mise en ligne et les tests sur différents navigateurs et appareils. Les révisions sont également incluses (généralement 2 à 3 tours de corrections). En revanche, la rédaction de contenu, les séances photos professionnelles et le référencement avancé sont des prestations complémentaires qui peuvent être ajoutées au devis.',
  'Tarifs & Budget',
  9,
  true
),
(
  'Est-ce que le nom de domaine et l''hébergement sont inclus ?',
  'La première année de nom de domaine et d''hébergement peut être incluse dans le devis selon la formule choisie. Le nom de domaine (.fr, .com) coûte environ 10 € à 15 € par an et l''hébergement entre 50 € et 300 € par an selon les performances requises. Je vous conseille sur le meilleur choix de nom de domaine et d''hébergeur en fonction de votre projet. Après la première année, ces frais récurrents restent à votre charge, mais je vous accompagne dans les démarches de renouvellement et vous restez propriétaire de votre domaine.',
  'Tarifs & Budget',
  10,
  true
);

-- ============================================
-- CATÉGORIE : Processus de création
-- ============================================

INSERT INTO public.faqs (question, answer, category, sort_order, is_published) VALUES
(
  'Combien de temps faut-il pour créer un site web ?',
  'La création d''un site vitrine prend en moyenne 4 à 8 semaines, tandis qu''un site e-commerce nécessite 8 à 12 semaines. Une application web sur mesure peut demander 3 à 6 mois selon sa complexité. Ces délais incluent les phases de conception, développement, tests et révisions. Le facteur qui influence le plus le planning est la réactivité dans la fourniture du contenu (textes, images, validations). Un projet bien préparé en amont avec un brief clair et du contenu prêt peut considérablement accélérer le processus.',
  'Processus de création',
  11,
  true
),
(
  'Quelles sont les étapes de création d''un site internet ?',
  'Le processus suit 6 étapes clés : 1) Le brief et l''analyse de vos besoins, 2) La conception UX avec les wireframes et l''arborescence, 3) La création des maquettes graphiques (UI design), 4) Le développement technique et l''intégration, 5) Les tests, optimisations et recettage, 6) La mise en ligne et la formation. Chaque étape fait l''objet d''une validation de votre part avant de passer à la suivante. Cette méthode structurée garantit un résultat conforme à vos attentes et évite les malentendus en cours de projet.',
  'Processus de création',
  12,
  true
),
(
  'Comment se passe notre premier échange ?',
  'Le premier échange est un appel découverte gratuit de 30 à 45 minutes, en visio ou par téléphone. L''objectif est de comprendre votre activité, vos objectifs, votre cible et vos contraintes (budget, délais). Je vous pose des questions sur votre positionnement, vos concurrents et vos attentes visuelles. C''est aussi l''occasion pour vous de me poser toutes vos questions. Suite à cet échange, je vous envoie une proposition détaillée sous 48 à 72 heures. Aucun engagement n''est requis à ce stade.',
  'Processus de création',
  13,
  true
),
(
  'Dois-je fournir le contenu (textes, photos) ?',
  'Idéalement, oui. Vous connaissez mieux que quiconque votre activité et vos clients. Cependant, je comprends que la rédaction web n''est pas votre métier. Je peux vous accompagner avec un guide de rédaction structuré pour chaque page, ou proposer une prestation de rédaction web optimisée SEO en complément. Pour les photos, je recommande des visuels authentiques de votre activité plutôt que des banques d''images génériques. Si besoin, je peux vous orienter vers un photographe professionnel ou sélectionner des visuels de qualité adaptés à votre secteur.',
  'Processus de création',
  14,
  true
),
(
  'Puis-je voir des maquettes avant le développement ?',
  'Absolument, c''est même une étape essentielle du processus. Avant tout développement, je crée des maquettes graphiques détaillées (mockups) que vous pouvez visualiser et commenter. Vous verrez exactement à quoi ressemblera votre site sur ordinateur, tablette et mobile. Deux tours de révisions sont généralement inclus pour ajuster les couleurs, la typographie, la disposition des éléments. Une fois les maquettes validées, le développement commence sur des bases solides, ce qui évite les modifications coûteuses en cours de route.',
  'Processus de création',
  15,
  true
),
(
  'Comment se passe la livraison du site ?',
  'La livraison suit un processus structuré. D''abord, le site est déployé sur un environnement de pré-production (staging) pour que vous puissiez le tester en conditions réelles. Vous disposez d''une période de recettage pour vérifier chaque page, formulaire et fonctionnalité. Une fois vos retours intégrés et votre validation finale obtenue, le site est mis en ligne sur votre nom de domaine. Je vous fournis ensuite une documentation, les accès administrateur et une session de formation. Un suivi post-lancement de 30 jours est inclus pour corriger tout bug éventuel.',
  'Processus de création',
  16,
  true
),
(
  'Proposez-vous une formation à l''utilisation du site ?',
  'Oui, chaque projet inclut une session de formation personnalisée d''une à deux heures. Je vous montre comment modifier vos textes, ajouter des images, publier des articles de blog ou gérer vos produits. La formation est adaptée à votre niveau technique et je fournis un guide écrit avec captures d''écran pour que vous puissiez vous y référer à tout moment. L''objectif est de vous rendre autonome sur les tâches courantes. Si vous avez besoin de formations complémentaires par la suite, elles peuvent être organisées à la demande.',
  'Processus de création',
  17,
  true
),
(
  'Travaillez-vous à distance ou en présentiel ?',
  'Je travaille principalement à distance, ce qui me permet de collaborer efficacement avec des clients partout en France. Les échanges se font par visioconférence (Google Meet, Zoom), email et téléphone. Pour les clients situés dans ma région, des rencontres en présentiel sont tout à fait possibles, notamment pour le brief initial ou les présentations de maquettes. Le travail à distance n''affecte en rien la qualité de la collaboration : les outils numériques actuels permettent un suivi de projet transparent et des échanges fluides.',
  'Processus de création',
  18,
  true
);

-- ============================================
-- CATÉGORIE : SEO & Référencement
-- ============================================

INSERT INTO public.faqs (question, answer, category, sort_order, is_published) VALUES
(
  'Le SEO est-il inclus dans la création du site ?',
  'Oui, chaque site que je crée intègre les fondamentaux du SEO technique : structure HTML sémantique (balises H1, H2, H3), méta-titres et méta-descriptions optimisés, URLs propres, images compressées avec attributs alt, sitemap XML, fichier robots.txt et temps de chargement optimisé. Cette base technique est indispensable pour que Google puisse indexer correctement votre site. Pour une stratégie SEO avancée (recherche de mots-clés, création de contenu, netlinking), une prestation complémentaire dédiée est recommandée pour des résultats durables.',
  'SEO & Référencement',
  19,
  true
),
(
  'Comment être premier sur Google ?',
  'Atteindre la première position sur Google demande une stratégie SEO complète et du temps. Il faut d''abord identifier les mots-clés pertinents pour votre activité (ni trop concurrentiels, ni trop peu recherchés), puis créer du contenu de qualité qui répond aux intentions de recherche de vos prospects. La performance technique du site, l''obtention de liens entrants (backlinks) de qualité et la régularité dans la publication de contenu sont des facteurs déterminants. Attention aux promesses de « première page garantie » : le SEO est un travail de fond qui porte ses fruits sur 6 à 12 mois.',
  'SEO & Référencement',
  20,
  true
),
(
  'Qu''est-ce que le SEO local et pourquoi c''est important ?',
  'Le SEO local vise à positionner votre entreprise sur les recherches géolocalisées comme « boulangerie Paris 11 » ou « plombier près de chez moi ». C''est crucial pour les commerces et prestataires qui dépendent d''une clientèle de proximité. Le SEO local repose sur l''optimisation de votre fiche Google Business Profile, la cohérence de vos informations (nom, adresse, téléphone) sur tous les annuaires, les avis clients et le contenu localisé sur votre site. Près de 46 % des recherches Google ont une intention locale, c''est donc un levier de visibilité incontournable pour les TPE/PME.',
  'SEO & Référencement',
  21,
  true
),
(
  'Comment apparaître sur Google Maps ?',
  'Pour apparaître sur Google Maps, vous devez créer et optimiser votre fiche Google Business Profile (anciennement Google My Business). Renseignez toutes les informations : adresse exacte, horaires d''ouverture, numéro de téléphone, site web, catégorie d''activité et description détaillée. Ajoutez des photos de qualité de votre établissement et de vos réalisations. Encouragez vos clients satisfaits à laisser des avis et répondez à chaque avis (positif comme négatif). La régularité des publications (Google Posts) et la cohérence de vos informations sur le web renforcent votre positionnement dans le « pack local » des résultats Google.',
  'SEO & Référencement',
  22,
  true
),
(
  'Quelle est la différence entre SEO et SEA ?',
  'Le SEO (Search Engine Optimization) désigne le référencement naturel : c''est le travail d''optimisation pour apparaître gratuitement dans les résultats de recherche. Le SEA (Search Engine Advertising) correspond aux annonces payantes (Google Ads) qui s''affichent en haut des résultats avec la mention « Sponsorisé ». Le SEO demande du temps (3 à 12 mois) mais génère un trafic durable et gratuit. Le SEA donne des résultats immédiats mais s''arrête dès que vous coupez le budget. L''idéal est de combiner les deux : le SEA pour des résultats rapides, le SEO pour construire une visibilité pérenne.',
  'SEO & Référencement',
  23,
  true
),
(
  'Combien de temps faut-il pour voir les résultats du SEO ?',
  'Les premiers résultats visibles du SEO apparaissent généralement entre 3 et 6 mois après la mise en place d''une stratégie. Pour des mots-clés peu concurrentiels ou locaux, des améliorations peuvent être constatées dès 4 à 8 semaines. En revanche, pour des requêtes très concurrentielles, il faut parfois 12 à 18 mois d''efforts soutenus. Le SEO est un investissement à moyen et long terme : les résultats sont progressifs mais durables. Je recommande de suivre l''évolution avec des outils comme Google Search Console et d''ajuster la stratégie chaque trimestre.',
  'SEO & Référencement',
  24,
  true
),
(
  'Qu''est-ce que le GEO (Generative Engine Optimization) ?',
  'Le GEO (Generative Engine Optimization) est une discipline émergente qui vise à optimiser votre présence dans les réponses des intelligences artificielles comme ChatGPT, Google AI Overview, Perplexity ou Copilot. Contrairement au SEO classique qui cible les résultats de recherche traditionnels, le GEO s''assure que votre marque et votre expertise sont correctement citées par les IA génératives. Cela passe par la structuration de vos données, la création de contenu faisant autorité, et la présence sur des sources fiables que les IA utilisent pour générer leurs réponses. C''est un enjeu majeur pour la visibilité des entreprises dans les années à venir.',
  'SEO & Référencement',
  25,
  true
),
(
  'Mon site actuel n''apparaît pas sur Google, pourquoi ?',
  'Plusieurs raisons peuvent expliquer l''absence de votre site dans les résultats Google : le site n''a pas été indexé (pas de sitemap soumis à Google Search Console), une balise « noindex » bloque l''indexation, le contenu est trop pauvre ou dupliqué, la structure technique est défaillante (temps de chargement lent, erreurs 404, pas de HTTPS), ou le site est trop récent et n''a pas encore acquis de notoriété. Un audit SEO technique permet d''identifier précisément les problèmes et de définir un plan d''action correctif. C''est souvent la première étape que je recommande avant toute refonte.',
  'SEO & Référencement',
  26,
  true
),
(
  'Optimisez-vous aussi pour les recherches vocales ?',
  'Oui, l''optimisation pour la recherche vocale fait partie des bonnes pratiques SEO que j''intègre. Les recherches vocales (via Siri, Google Assistant, Alexa) utilisent un langage plus conversationnel et sont souvent formulées sous forme de questions. J''optimise le contenu en intégrant des questions/réponses naturelles, des données structurées (schema.org FAQ), et en ciblant les « featured snippets » (position zéro). Le SEO local est particulièrement impacté par la recherche vocale, car beaucoup de requêtes vocales sont du type « Où trouver un … près de moi ? ». C''est un levier de plus en plus important à ne pas négliger.',
  'SEO & Référencement',
  27,
  true
);

-- ============================================
-- CATÉGORIE : Choix du prestataire
-- ============================================

INSERT INTO public.faqs (question, answer, category, sort_order, is_published) VALUES
(
  'Quelle est la différence entre un freelance et une agence web ?',
  'Un freelance est un professionnel indépendant qui gère votre projet de A à Z avec un interlocuteur unique, tandis qu''une agence dispose d''une équipe spécialisée (designer, développeur, chef de projet, etc.). Le freelance offre généralement des tarifs plus compétitifs (pas de charges de structure), une plus grande flexibilité et une relation de proximité. L''agence convient mieux aux projets très complexes nécessitant des compétences multiples simultanément. Pour un site vitrine ou un e-commerce standard, un freelance expérimenté est souvent le meilleur choix en termes de rapport qualité-prix.',
  'Choix du prestataire',
  28,
  true
),
(
  'Pourquoi choisir un freelance plutôt qu''une agence ?',
  'Choisir un freelance présente plusieurs avantages concrets : des tarifs 30 à 50 % inférieurs à ceux d''une agence (moins de frais de structure), un interlocuteur unique qui connaît parfaitement votre projet, une réactivité accrue dans les échanges et les modifications, et une relation de confiance directe sans intermédiaire. En tant que freelance, je m''investis personnellement dans chaque projet car ma réputation en dépend directement. Vous bénéficiez aussi d''une plus grande transparence sur le travail réalisé et les technologies utilisées.',
  'Choix du prestataire',
  29,
  true
),
(
  'Comment évaluer un devis de création de site web ?',
  'Pour évaluer un devis, vérifiez qu''il détaille clairement : le périmètre exact (nombre de pages, fonctionnalités), les technologies utilisées, le planning prévisionnel, le nombre de révisions incluses, les conditions de paiement et ce qui n''est pas inclus. Comparez au moins 3 devis mais attention à ne pas comparer uniquement les prix : un devis peu cher peut cacher des limitations (template non personnalisé, pas de SEO, pas de responsive). Demandez aussi qui sera propriétaire du code source et du nom de domaine à la fin du projet, c''est un point crucial souvent négligé.',
  'Choix du prestataire',
  30,
  true
),
(
  'Quelle est la différence entre un web designer et un développeur web ?',
  'Le web designer se concentre sur l''aspect visuel et l''expérience utilisateur (UX/UI) : il conçoit les maquettes, choisit les couleurs, la typographie et la disposition des éléments pour créer une interface esthétique et intuitive. Le développeur web traduit ces maquettes en code fonctionnel, gère la partie technique (base de données, serveur, performances, sécurité) et rend le site interactif. Certains professionnels, comme moi, maîtrisent les deux disciplines, ce qui assure une cohérence totale entre le design et le développement et simplifie la gestion de votre projet.',
  'Choix du prestataire',
  31,
  true
),
(
  'Faut-il choisir un prestataire local ou travailler à distance ?',
  'Les deux options fonctionnent très bien aujourd''hui. Un prestataire local offre la possibilité de rendez-vous physiques, ce qui peut rassurer certains clients et faciliter les échanges pour les projets complexes. Le travail à distance élargit votre choix de prestataires et n''est plus un frein grâce aux outils de visioconférence, de partage d''écran et de gestion de projet collaboratifs. L''essentiel est la qualité de la communication et la méthodologie de travail. Je recommande de privilégier les compétences et le portfolio du prestataire plutôt que sa localisation géographique.',
  'Choix du prestataire',
  32,
  true
),
(
  'Que vérifier avant de signer avec un prestataire web ?',
  'Avant de signer, vérifiez ces points essentiels : le portfolio et les avis clients (contactez d''anciens clients si possible), la clarté du devis et du contrat, la propriété du code source et du nom de domaine à la fin du projet, les conditions de maintenance et de support post-livraison, les délais et pénalités en cas de retard, et la clause de résiliation. Assurez-vous également que le prestataire est à jour de ses obligations légales (SIRET, assurance RC Pro). Un bon prestataire n''hésitera pas à répondre à toutes ces questions en toute transparence.',
  'Choix du prestataire',
  33,
  true
),
(
  'Peut-on voir des exemples de vos réalisations ?',
  'Bien sûr, mon portfolio est accessible directement sur mon site perrinehuon.com dans la section « Réalisations ». Vous y trouverez une sélection de projets variés : sites vitrines, e-commerces, applications web, avec pour chacun le contexte du projet, les technologies utilisées et les résultats obtenus. Je peux également vous fournir des références clients à contacter si vous souhaitez un retour d''expérience direct. Chaque projet est unique et je serai ravie de vous montrer des réalisations similaires à votre secteur d''activité lors de notre premier échange.',
  'Choix du prestataire',
  34,
  true
);

-- ============================================
-- CATÉGORIE : Questions techniques
-- ============================================

INSERT INTO public.faqs (question, answer, category, sort_order, is_published) VALUES
(
  'Qu''est-ce que le responsive design ?',
  'Le responsive design (ou design adaptatif) est une approche de conception web qui permet à votre site de s''afficher correctement sur tous les écrans : ordinateur, tablette et smartphone. Le site ajuste automatiquement sa mise en page, la taille des textes et des images en fonction de la taille de l''écran. C''est aujourd''hui indispensable car plus de 60 % du trafic web provient des mobiles. Google privilégie d''ailleurs les sites « mobile-friendly » dans ses résultats de recherche. Tous les sites que je crée sont nativement responsive, avec des tests sur les principaux appareils et navigateurs.',
  'Questions techniques',
  35,
  true
),
(
  'Mon site doit-il être en HTTPS ?',
  'Oui, le HTTPS est absolument indispensable en 2026. Le protocole HTTPS chiffre les données échangées entre le navigateur de vos visiteurs et votre serveur, protégeant ainsi les informations personnelles (formulaires de contact, données de paiement). Google pénalise les sites en HTTP dans ses classements et les navigateurs affichent un avertissement « Non sécurisé » qui fait fuir les visiteurs. Le certificat SSL nécessaire pour le HTTPS est souvent gratuit (Let''s Encrypt) et son installation fait partie de la mise en ligne de tout site que je crée. C''est aussi une obligation pour la conformité RGPD.',
  'Questions techniques',
  36,
  true
),
(
  'Qu''est-ce que le RGPD pour un site web ?',
  'Le RGPD (Règlement Général sur la Protection des Données) impose à tout site web collectant des données personnelles (formulaire de contact, newsletter, cookies, analytics) de respecter des règles strictes. Concrètement, votre site doit afficher un bandeau de consentement aux cookies, une politique de confidentialité détaillée, des mentions légales, et permettre aux utilisateurs d''exercer leurs droits (accès, suppression, modification de leurs données). Les sanctions en cas de non-conformité peuvent atteindre 4 % du chiffre d''affaires annuel. J''intègre systématiquement la conformité RGPD dans tous mes projets.',
  'Questions techniques',
  37,
  true
),
(
  'Quelles technologies utilisez-vous ?',
  'J''utilise des technologies modernes et performantes adaptées à chaque projet. Pour le front-end : React, Next.js et TypeScript pour des interfaces rapides et interactives. Pour le back-end : Supabase (base de données PostgreSQL, authentification, stockage) et des API REST ou GraphQL. Pour le design : Figma pour les maquettes. Pour l''hébergement : Vercel ou Netlify pour des déploiements optimisés. Ces choix technologiques garantissent des sites rapides, sécurisés, évolutifs et faciles à maintenir. Je privilégie les solutions open-source pour éviter toute dépendance à un éditeur propriétaire.',
  'Questions techniques',
  38,
  true
),
(
  'Mon site sera-t-il rapide ?',
  'La performance est une priorité absolue dans tous mes projets. J''optimise chaque aspect : compression et redimensionnement des images (format WebP/AVIF), minification du code CSS et JavaScript, mise en cache intelligente, chargement différé (lazy loading) des éléments non visibles, et choix d''un hébergement performant. L''objectif est d''obtenir un score supérieur à 90/100 sur Google PageSpeed Insights. Un site rapide améliore l''expérience utilisateur, réduit le taux de rebond et favorise le référencement naturel. Chaque seconde de chargement en plus fait perdre environ 7 % de conversions.',
  'Questions techniques',
  39,
  true
),
(
  'Puis-je modifier mon site moi-même après la livraison ?',
  'Oui, c''est un point essentiel de ma démarche. Selon la solution retenue, vous pourrez modifier vos textes, images et contenus via une interface d''administration intuitive. Pour les sites avec CMS, les modifications courantes (ajout d''articles de blog, mise à jour de tarifs, changement de photos) sont simples et ne nécessitent aucune compétence technique. Je fournis une formation et un guide d''utilisation pour vous rendre autonome. Pour les modifications plus complexes (nouvelle fonctionnalité, refonte d''une section), vous pourrez toujours faire appel à mes services ou à un autre développeur grâce au code propre et documenté.',
  'Questions techniques',
  40,
  true
),
(
  'Qu''est-ce qu''un CMS et en ai-je besoin ?',
  'Un CMS (Content Management System) est un système de gestion de contenu qui permet de modifier votre site sans toucher au code. WordPress, Strapi et Sanity sont des exemples populaires. Un CMS est recommandé si vous publiez régulièrement du contenu (blog, actualités, fiches produits) ou si vous souhaitez être totalement autonome pour les mises à jour courantes. Pour un site vitrine avec peu de contenu à modifier, une solution plus légère peut suffire. Je vous conseille la meilleure option selon la fréquence de vos mises à jour et votre aisance avec les outils numériques.',
  'Questions techniques',
  41,
  true
),
(
  'Qu''est-ce qu''un hébergement web et comment le choisir ?',
  'L''hébergement web est le service qui stocke les fichiers de votre site sur un serveur connecté à internet 24h/24, le rendant accessible à vos visiteurs. Le choix de l''hébergeur impacte directement la vitesse, la sécurité et la disponibilité de votre site. Pour un site vitrine, un hébergement mutualisé (OVH, o2switch) à partir de 5 €/mois suffit généralement. Pour un site à fort trafic ou une application web, un hébergement cloud (Vercel, AWS, Google Cloud) offre de meilleures performances et une scalabilité automatique. Je vous guide vers la solution la plus adaptée à votre budget et à vos besoins.',
  'Questions techniques',
  42,
  true
);

-- ============================================
-- CATÉGORIE : Questions par métier
-- ============================================

INSERT INTO public.faqs (question, answer, category, sort_order, is_published) VALUES
(
  'Un avocat a-t-il le droit de faire de la publicité sur internet ?',
  'Oui, depuis la loi Macron de 2015 et les évolutions réglementaires du Conseil National des Barreaux, les avocats sont autorisés à communiquer sur internet, sous certaines conditions. La communication doit rester informative, digne et respectueuse du secret professionnel. Un site web vitrine présentant les domaines de compétence, les publications et la biographie de l''avocat est parfaitement conforme. Le référencement naturel (SEO) et le contenu éducatif (articles de blog, FAQ juridiques) sont les leviers les plus efficaces et les plus éthiques pour développer la visibilité d''un cabinet d''avocats en ligne.',
  'Questions par métier',
  43,
  true
),
(
  'Comment un médecin peut-il être visible en ligne tout en respectant la déontologie ?',
  'Les médecins doivent respecter le Code de déontologie médicale qui interdit la publicité directe mais autorise l''information du public. Un site web professionnel présentant le parcours, les spécialités, les horaires et les modalités de prise de rendez-vous est tout à fait conforme. L''optimisation de la fiche Google Business Profile est particulièrement efficace pour les médecins car les patients recherchent massivement « médecin + ville » ou « spécialiste + quartier ». La publication de contenu éducatif sur la santé (sans diagnostic en ligne) renforce la crédibilité et le référencement naturel tout en restant dans le cadre déontologique.',
  'Questions par métier',
  44,
  true
),
(
  'Quelles fonctionnalités pour le site d''un restaurant ?',
  'Le site d''un restaurant doit être pensé pour convertir les visiteurs en clients. Les fonctionnalités essentielles sont : le menu à jour avec les prix (en PDF et en HTML pour le SEO), un système de réservation en ligne (intégration de TheFork, Resy ou formulaire personnalisé), des photos professionnelles des plats et de l''ambiance, les horaires et l''adresse avec un plan interactif, les avis clients, et un lien vers la commande en ligne si vous proposez la livraison. Le site doit être rapide sur mobile car la majorité des recherches de restaurants se font depuis un smartphone, souvent dans la rue.',
  'Questions par métier',
  45,
  true
),
(
  'Un site web est-il utile pour un artisan du bâtiment ?',
  'Absolument, un site web est devenu indispensable pour les artisans du bâtiment. 80 % des particuliers recherchent un artisan sur internet avant de demander un devis. Un site bien référencé localement vous permet d''apparaître dans les résultats quand un prospect tape « plombier Toulouse » ou « rénovation cuisine Lyon ». Les éléments clés sont : une galerie de réalisations avant/après, les avis clients, les certifications et labels (RGE, Qualibat), une zone d''intervention clairement définie et un formulaire de demande de devis. Le retour sur investissement est souvent excellent pour les artisans qui dépendaient uniquement du bouche-à-oreille.',
  'Questions par métier',
  46,
  true
),
(
  'Comment une association peut-elle créer un site web avec un petit budget ?',
  'Plusieurs options s''offrent aux associations avec un budget limité. Pour les très petits budgets, des solutions comme WordPress.com ou Google Sites permettent de créer un site basique gratuitement. Pour un résultat plus professionnel entre 500 € et 1 500 €, un freelance peut créer un site adapté avec les fonctionnalités essentielles : présentation de l''association, événements, formulaire d''adhésion et collecte de dons. Pensez aux subventions numériques proposées par certaines collectivités locales et au mécénat de compétences. Je propose des tarifs préférentiels pour les associations reconnues d''utilité publique, car je crois au rôle essentiel du tissu associatif.',
  'Questions par métier',
  47,
  true
),
(
  'Quelles sont les obligations légales d''un site e-commerce ?',
  'Un site e-commerce en France doit respecter de nombreuses obligations : mentions légales complètes (raison sociale, SIRET, coordonnées), conditions générales de vente (CGV) détaillant les prix, modalités de livraison et de retour, respect du droit de rétractation de 14 jours, conformité RGPD pour la collecte de données clients, affichage clair des prix TTC, sécurisation des paiements (protocole 3D Secure), et facturation conforme. La non-conformité peut entraîner des sanctions de la DGCCRF et des litiges avec les clients. Je m''assure que chaque site e-commerce que je crée respecte l''ensemble de ces obligations légales.',
  'Questions par métier',
  48,
  true
),
(
  'Un expert-comptable a-t-il vraiment besoin d''un site web ?',
  'Oui, un site web est un atout stratégique pour un expert-comptable, notamment pour attirer de nouveaux clients et se différencier de la concurrence. Le site doit mettre en avant vos domaines d''expertise (création d''entreprise, gestion de patrimoine, conseil fiscal), votre approche et votre équipe. La publication régulière d''articles sur les actualités comptables et fiscales (échéances, nouvelles réglementations) est un excellent levier SEO qui positionne votre cabinet comme une référence. Les prospects recherchent de plus en plus leur expert-comptable en ligne : sans site, vous êtes invisible pour une grande partie de votre clientèle potentielle.',
  'Questions par métier',
  49,
  true
),
(
  'Comment un photographe peut-il optimiser son portfolio en ligne ?',
  'Un portfolio de photographe en ligne doit conjuguer esthétique et performance technique. Sélectionnez rigoureusement vos meilleures images (qualité plutôt que quantité, 50 à 100 photos maximum), organisez-les par catégorie (mariage, portrait, corporate, produit) et optimisez chaque image pour le web (compression WebP sans perte visible, chargement progressif). Le SEO pour photographe passe par le nommage descriptif des fichiers, des balises alt détaillées et du contenu textuel sur chaque projet (contexte, lieu, ambiance). Un blog montrant les coulisses de vos shootings humanise votre approche et améliore considérablement votre référencement.',
  'Questions par métier',
  50,
  true
),
(
  'Quelles fonctionnalités pour un site de kinésithérapeute ?',
  'Le site d''un kinésithérapeute doit faciliter la prise de rendez-vous et rassurer les patients. Les fonctionnalités clés sont : un module de prise de rendez-vous en ligne (Doctolib ou calendrier intégré), la présentation des spécialités (rééducation sportive, kiné respiratoire, post-opératoire), les informations pratiques (adresse, accès, parking, horaires), les tarifs et les modalités de remboursement, ainsi qu''une section de conseils et d''exercices. La fiche Google Business Profile optimisée est particulièrement importante car les patients recherchent souvent « kiné + quartier ». Un site professionnel inspire confiance et réduit les appels téléphoniques pour les informations de base.',
  'Questions par métier',
  51,
  true
),
(
  'Comment un salon de coiffure peut-il attirer des clients avec un site web ?',
  'Un site web pour un salon de coiffure doit être visuellement attractif et axé sur la conversion. Les éléments essentiels sont : une galerie de réalisations (avant/après, coupes tendance), un système de réservation en ligne qui affiche les créneaux disponibles en temps réel, la carte des prestations avec les tarifs, la présentation de l''équipe et de l''ambiance du salon, et les avis clients. Le SEO local est particulièrement rentable pour les coiffeurs car les recherches « coiffeur + ville » ou « salon de coiffure près de moi » sont très fréquentes. L''intégration avec Instagram permet de montrer vos dernières créations et de créer une communauté engagée.',
  'Questions par métier',
  52,
  true
);
