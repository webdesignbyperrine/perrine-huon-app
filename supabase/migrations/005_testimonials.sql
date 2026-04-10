-- ============================================================
-- Migration 005: Testimonials
-- ============================================================

CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  profession TEXT,
  company TEXT,
  city TEXT,
  content TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 5.0,
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published testimonials"
  ON public.testimonials FOR SELECT
  USING (is_published = true OR auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Admins can manage testimonials"
  ON public.testimonials FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ============================================================
-- Données initiales : 10 témoignages
-- ============================================================

INSERT INTO public.testimonials (name, profession, company, city, content, rating, is_published, sort_order) VALUES
(
  'Marie L.',
  'Avocate',
  NULL,
  'Paris 8e',
  'Mon site reflète enfin le sérieux de mon cabinet. Perrine a parfaitement compris mes contraintes déontologiques et a créé un site élégant qui inspire confiance à mes clients. Le référencement local a considérablement augmenté ma visibilité.',
  5.0, true, 1
),
(
  'Thomas D.',
  'Restaurateur',
  'Le Comptoir',
  'Lyon',
  'Nos réservations en ligne ont augmenté de 40% depuis le nouveau site. L''intégration du menu interactif et du système de réservation est impeccable. Perrine a su capturer l''ambiance de notre restaurant.',
  5.0, true, 2
),
(
  'Sophie M.',
  'Expert-Comptable',
  NULL,
  'Bordeaux',
  'Un site moderne qui me démarque des autres cabinets. Le SEO local a transformé ma visibilité : je reçois maintenant des demandes qualifiées chaque semaine. L''investissement est largement rentabilisé.',
  5.0, true, 3
),
(
  'Jean-Pierre R.',
  'Menuisier ébéniste',
  NULL,
  'Lille',
  'Enfin visible sur Google ! Mes demandes de devis ont doublé en 3 mois. Le portfolio met parfaitement en valeur mon travail. Simple, efficace, professionnel.',
  5.0, true, 4
),
(
  'Claire B.',
  'Présidente d''association',
  NULL,
  'Paris 15e',
  'Budget serré mais résultat professionnel. Perrine a compris nos besoins associatifs et a livré un site qui facilite nos inscriptions et notre communication. L''accompagnement était top du début à la fin.',
  5.0, true, 5
),
(
  'Karim A.',
  'Kinésithérapeute',
  NULL,
  'Marseille',
  'La prise de rendez-vous en ligne intégrée au site a changé mon quotidien. Moins d''appels téléphoniques, plus de temps pour mes patients. Le site est rapide et s''affiche parfaitement sur mobile.',
  4.5, true, 6
),
(
  'Isabelle F.',
  'Agence immobilière',
  NULL,
  'Nantes',
  'Un site qui génère des mandats. Le référencement local fait des merveilles : nous apparaissons en première page pour toutes les recherches immobilières sur Nantes.',
  5.0, true, 7
),
(
  'Lucas P.',
  'Fondateur startup SaaS',
  NULL,
  'Paris 10e',
  'Notre MVP a été livré en 4 semaines. Code propre en Next.js, performance excellente, et une vraie compréhension de nos besoins produit. Le rapport qualité-prix est imbattable par rapport aux agences.',
  5.0, true, 8
),
(
  'Nathalie G.',
  'Salon de coiffure',
  NULL,
  'Toulouse',
  'Simple, beau, efficace. Mes clientes adorent réserver en ligne et consulter les tarifs sur le site. La galerie de photos de nos réalisations attire de nouvelles clientes chaque semaine.',
  4.5, true, 9
),
(
  'François H.',
  'Gestionnaire de patrimoine',
  NULL,
  'Paris 16e',
  'Un site qui inspire confiance à mes prospects haut de gamme. Le design est sobre et professionnel, exactement ce qu''il faut pour mon activité. Perrine comprend les enjeux de la communication financière.',
  5.0, true, 10
);
