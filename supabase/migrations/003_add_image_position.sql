-- Migration: Ajouter la colonne image_crop à la table projects
-- Cette colonne permet de stocker les paramètres de recadrage de l'image d'aperçu
-- Format JSON: { "x": number, "y": number, "zoom": number }

ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS image_crop JSONB DEFAULT NULL;

-- Commentaire sur la colonne
COMMENT ON COLUMN projects.image_crop IS 'Paramètres de recadrage de l''image d''aperçu (x, y, zoom)';


