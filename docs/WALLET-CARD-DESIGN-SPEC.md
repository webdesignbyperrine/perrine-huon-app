# Wallet Card — Design Final (Apple Wallet)

> Spec validée le 03/07/2026. À utiliser comme référence pour l'implémentation du pass Apple Wallet.

---

## Structure visuelle (recto uniquement)

### Header strip (hauteur : ~50px, fond blanc)
| Élément | Valeur |
|---|---|
| Logo | `public/images/wallet/logo-strip.png` (aligné à gauche, hauteur max, padding 5px) |
| Tagline (droite) | Police **Outfit** · Rose `#DE337A` · `CRÉATION DE` (400, uppercase) + `SITES WEB + SEO/GEO` (700, uppercase) |

### Séparateur
- Barre horizontale bleue `#2B5B8A`, hauteur 3px

### Nom
- Police **Outfit**
- `PERRINE` — fontWeight 400
- `HUON` — fontWeight 700
- Couleur : bleu `#2B5B8A`
- fontSize ~22, letterSpacing -0.025em

### Sous-titre
- `Développeuse web`
- Uppercase, taille 11, bleu clair `#4A7AA8`, letterSpacing 0.08em

### Tags (pills)
- Labels : `Sites web` · `Référencement Google & IA` · `Logiciel de gestion`
- Style : background `#DE337A`, border `2px solid #DE337A`, borderRadius 9999, couleur blanc, fontWeight 600, fontSize 11

### Liens
- Site web : `https://www.perrinehuon.com` (icône globe bleu)
- LinkedIn : `https://www.linkedin.com/in/perrinehuon/` (icône LinkedIn bleu)
- Style : fond bleu 5%, bordure bleu 15%, borderRadius 12, sans QR code

---

## Palette

| Nom | Hex |
|---|---|
| Bleu principal | `#2B5B8A` |
| Bleu clair | `#4A7AA8` |
| Rose CTA | `#DE337A` |
| Fond beige (corps carte) | `#D4C4A8` |
| Fond blanc (header strip) | `#FFFFFF` |

## Typographie
- Corps : **Outfit** (Google Fonts)
- Fallback : `"SF Pro Text", system-ui, sans-serif`

---

## Fichier de prévisualisation
Canvas : `/Users/perrine/.cursor/projects/Users-perrine-Desktop-Projets-pro-Perrine-Huon-Cursor/canvases/wallet-card-preview.canvas.tsx`

## Fichier de génération du pass
À implémenter / mettre à jour : `lib/wallet/apple-pass.ts`
