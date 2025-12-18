# 📸 Comment Ajouter Vos Images

## Étapes Simples

### 1. Créer le dossier images

```bash
mkdir -p "/Users/perrine/Desktop/Projets pro/Perrine Huon Cursor/perrine-huon-app/public/images"
```

### 2. Ajouter vos fichiers

Placez vos fichiers dans le dossier `public/images/` :

#### Logo Perroquet
- **Nom du fichier** : `logo-perroquet.png` ou `logo-perroquet.svg`
- **Où le mettre** : `public/images/logo-perroquet.png`
- **Utilisation** : Header (coin haut gauche)
- **Fond** : Transparent de préférence

#### Photo Portrait
- **Nom du fichier** : `portrait-perrine.jpg`
- **Où le mettre** : `public/images/portrait-perrine.jpg`
- **Utilisation** : Section "À propos"
- **Format** : Carré (800x800px idéal)

### 3. Activer les images dans le code

Une fois vos images ajoutées, décommentez ces lignes :

#### Dans `components/Header.tsx` (ligne ~35) :
Remplacez :
```tsx
{/* <Image
  src="/images/logo-perroquet.png"
  alt="Perrine Huon Logo"
  width={48}
  height={48}
  className="object-contain"
/> */}

{/* Fallback temporaire */}
<span className="text-xl font-bold...">PH</span>
```

Par :
```tsx
<Image
  src="/images/logo-perroquet.png"
  alt="Perrine Huon Logo"
  width={48}
  height={48}
  className="object-contain"
/>
```

#### Dans `components/home/About.tsx` (ligne ~39) :
Remplacez :
```tsx
{/* <Image
  src="/images/portrait-perrine.jpg"
  alt="Perrine Huon"
  fill
  className="object-cover"
  priority
/> */}

{/* Placeholder temporaire */}
<div className="w-full h-full...">...</div>
```

Par :
```tsx
<Image
  src="/images/portrait-perrine.jpg"
  alt="Perrine Huon"
  fill
  className="object-cover"
  priority
/>
```

### 4. Commiter et pousser

```bash
cd "/Users/perrine/Desktop/Projets pro/Perrine Huon Cursor/perrine-huon-app"
git add .
git commit -m "feat: Ajout du logo et de la photo portrait"
git push
```

## Alternative : Images depuis URL

Si vos images sont déjà en ligne quelque part, vous pouvez aussi utiliser des URLs directement :

```tsx
<Image
  src="https://votre-url.com/logo.png"
  alt="Perrine Huon Logo"
  width={48}
  height={48}
/>
```

## Besoin d'aide ?

Si vous avez besoin que je fasse ces modifications pour vous :
1. Ajoutez vos fichiers dans `public/images/`
2. Dites-moi et je décommenterai le code automatiquement
3. Je pousserai les changements sur GitHub

---

**Note** : Next.js Image nécessite que les images soient dans le dossier `public/` pour fonctionner.




