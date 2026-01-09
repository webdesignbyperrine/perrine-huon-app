-- Données d'exemple pour le développement
-- À exécuter après avoir créé un utilisateur admin via Supabase Auth

-- Quelques FAQs d'exemple
INSERT INTO public.faqs (question, answer, category, sort_order, is_published) VALUES
('Combien de temps faut-il pour créer un site web ?', 'Le délai de création dépend de la complexité du projet. Un site vitrine simple peut être livré en 2-3 semaines, tandis qu''un site e-commerce ou une application web sur mesure peut prendre 6 à 12 semaines.', 'Process', 1, true),
('Proposez-vous un service de maintenance ?', 'Oui, je propose des formules de maintenance mensuelles incluant les mises à jour, la sécurité, les sauvegardes et le support technique.', 'Services', 2, true),
('Comment fonctionne le SEO géolocalisé ?', 'Le SEO géolocalisé permet d''optimiser votre visibilité sur des recherches locales spécifiques. Je travaille sur l''optimisation des contenus, des balises meta, et la création de pages ciblées par ville ou zone géographique pour améliorer votre positionnement local.', 'SEO', 3, true),
('Quels sont vos tarifs ?', 'Mes tarifs varient selon la nature et l''ampleur du projet. Je propose des devis personnalisés après un premier échange pour bien comprendre vos besoins. N''hésitez pas à me contacter pour discuter de votre projet.', 'Tarifs', 4, true),
('Travaillez-vous avec des clients hors de France ?', 'Oui, je travaille avec des clients partout dans le monde. La majorité des échanges se font en ligne, ce qui facilite la collaboration à distance.', 'Process', 5, true);

-- Quelques médias d'exemple
INSERT INTO public.media_assets (type, url, title, alt_text) VALUES
('image', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'Projet Web Design', 'Interface moderne de site web'),
('image', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', 'Développement Web', 'Code sur écran d''ordinateur'),
('image', 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800', 'SEO Analytics', 'Graphiques et analytics'),
('youtube', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Vidéo présentation', 'Vidéo de présentation du projet');

-- Note: Les projets et articles seront créés via l'interface admin
-- Une fois qu'un utilisateur admin sera authentifié









