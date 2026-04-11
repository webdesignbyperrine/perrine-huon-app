-- Migration 008: Ajout des colonnes multilingues pour le contenu dynamique
-- Cette migration ajoute des colonnes _en et _es pour stocker les traductions
-- anglaises et espagnoles du contenu, avec fallback automatique sur le français

-- ============================================================================
-- BLOG POSTS - Articles de blog
-- ============================================================================
ALTER TABLE blog_posts 
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS title_es TEXT,
  ADD COLUMN IF NOT EXISTS excerpt_en TEXT,
  ADD COLUMN IF NOT EXISTS excerpt_es TEXT,
  ADD COLUMN IF NOT EXISTS content_en TEXT,
  ADD COLUMN IF NOT EXISTS content_es TEXT,
  ADD COLUMN IF NOT EXISTS seo_title_en TEXT,
  ADD COLUMN IF NOT EXISTS seo_title_es TEXT,
  ADD COLUMN IF NOT EXISTS seo_description_en TEXT,
  ADD COLUMN IF NOT EXISTS seo_description_es TEXT;

COMMENT ON COLUMN blog_posts.title_en IS 'Titre de l''article en anglais';
COMMENT ON COLUMN blog_posts.title_es IS 'Titre de l''article en espagnol';
COMMENT ON COLUMN blog_posts.excerpt_en IS 'Extrait de l''article en anglais';
COMMENT ON COLUMN blog_posts.excerpt_es IS 'Extrait de l''article en espagnol';
COMMENT ON COLUMN blog_posts.content_en IS 'Contenu complet de l''article en anglais';
COMMENT ON COLUMN blog_posts.content_es IS 'Contenu complet de l''article en espagnol';

-- ============================================================================
-- PROJECTS - Projets portfolio
-- ============================================================================
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS title_es TEXT,
  ADD COLUMN IF NOT EXISTS short_description_en TEXT,
  ADD COLUMN IF NOT EXISTS short_description_es TEXT,
  ADD COLUMN IF NOT EXISTS long_description_en TEXT,
  ADD COLUMN IF NOT EXISTS long_description_es TEXT,
  ADD COLUMN IF NOT EXISTS seo_title_en TEXT,
  ADD COLUMN IF NOT EXISTS seo_title_es TEXT,
  ADD COLUMN IF NOT EXISTS seo_description_en TEXT,
  ADD COLUMN IF NOT EXISTS seo_description_es TEXT;

COMMENT ON COLUMN projects.title_en IS 'Titre du projet en anglais';
COMMENT ON COLUMN projects.title_es IS 'Titre du projet en espagnol';
COMMENT ON COLUMN projects.short_description_en IS 'Description courte en anglais';
COMMENT ON COLUMN projects.short_description_es IS 'Description courte en espagnol';
COMMENT ON COLUMN projects.long_description_en IS 'Description longue en anglais';
COMMENT ON COLUMN projects.long_description_es IS 'Description longue en espagnol';

-- ============================================================================
-- FAQS - Questions fréquentes
-- ============================================================================
ALTER TABLE faqs
  ADD COLUMN IF NOT EXISTS question_en TEXT,
  ADD COLUMN IF NOT EXISTS question_es TEXT,
  ADD COLUMN IF NOT EXISTS answer_en TEXT,
  ADD COLUMN IF NOT EXISTS answer_es TEXT,
  ADD COLUMN IF NOT EXISTS category_en TEXT,
  ADD COLUMN IF NOT EXISTS category_es TEXT;

COMMENT ON COLUMN faqs.question_en IS 'Question en anglais';
COMMENT ON COLUMN faqs.question_es IS 'Question en espagnol';
COMMENT ON COLUMN faqs.answer_en IS 'Réponse en anglais';
COMMENT ON COLUMN faqs.answer_es IS 'Réponse en espagnol';
COMMENT ON COLUMN faqs.category_en IS 'Catégorie en anglais (ex: Process, SEO, Services, Pricing, Technical)';
COMMENT ON COLUMN faqs.category_es IS 'Catégorie en espagnol (ex: Proceso, SEO, Servicios, Tarifas, Técnico)';

-- ============================================================================
-- TESTIMONIALS - Témoignages clients
-- ============================================================================
ALTER TABLE testimonials
  ADD COLUMN IF NOT EXISTS content_en TEXT,
  ADD COLUMN IF NOT EXISTS content_es TEXT,
  ADD COLUMN IF NOT EXISTS profession_en TEXT,
  ADD COLUMN IF NOT EXISTS profession_es TEXT;

COMMENT ON COLUMN testimonials.content_en IS 'Contenu du témoignage en anglais';
COMMENT ON COLUMN testimonials.content_es IS 'Contenu du témoignage en espagnol';
COMMENT ON COLUMN testimonials.profession_en IS 'Profession du client en anglais';
COMMENT ON COLUMN testimonials.profession_es IS 'Profession du client en espagnol';

-- ============================================================================
-- NOTES D'UTILISATION
-- ============================================================================
-- 
-- Les colonnes originales (title, content, etc.) contiennent la version française.
-- Les colonnes _en et _es contiennent les traductions.
-- 
-- Utilisation dans le code :
--   const title = post.title_en || post.title;  // Fallback sur FR
-- 
-- Ou avec la fonction helper :
--   const title = getLocalizedField(post, 'title', locale);
-- 
-- Migration progressive :
--   - Les contenus peuvent être traduits au fur et à mesure
--   - Le code affichera automatiquement le français si la traduction n'existe pas
--   - Pas besoin de tout traduire immédiatement
-- 
