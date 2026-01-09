# 🚀 Guide de Démarrage Rapide

Votre site est en ligne ! Voici comment commencer à développer.

## 🌐 Votre Site

**Production** : https://perrine-huon-app.vercel.app

## 💻 Développer en Local

```bash
cd "/Users/perrine/Desktop/Projets pro/Perrine Huon Cursor/perrine-huon-app"
npm run dev
```

Ouvrez http://localhost:3000

## ✏️ Personnaliser la Page d'Accueil

Le fichier à modifier : `app/page.tsx`

### Exemple Simple

Remplacez le contenu de `app/page.tsx` par :

```typescript
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Perrine Huon
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Web Designer & Developer
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Voir mes projets
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
            >
              Me contacter
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
```

## 📤 Déployer vos Changements

```bash
git add .
git commit -m "Personnalisation de la page d'accueil"
git push
```

Vercel déploiera automatiquement ! ⚡

## 📂 Structure des Fichiers

```
app/
├── page.tsx          ← Page d'accueil (commencez ici !)
├── layout.tsx        ← Layout principal (navigation, footer)
└── globals.css       ← Styles globaux
```

## 🎨 Ajouter une Nouvelle Page

Créez simplement un nouveau dossier dans `app/` :

```
app/
└── about/
    └── page.tsx      ← Accessible sur /about
```

Contenu de `app/about/page.tsx` :

```typescript
export default function About() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">À propos</h1>
      <p className="text-lg">Votre présentation...</p>
    </main>
  )
}
```

## 🔗 Liens Utiles

- 🌐 [Votre site](https://perrine-huon-app.vercel.app)
- 📊 [Dashboard Vercel](https://vercel.com/dashboard)
- 💾 [GitHub](https://github.com/webdesignbyperrine/perrine-huon-app)
- 🗄️ [Supabase](https://supabase.com/dashboard/project/iuqljcfianyoffoaaqjb)

## 🆘 Besoin d'Aide ?

Consultez les fichiers :
- `README.md` - Documentation complète
- `DEPLOYMENT-SUCCESS.md` - Guide détaillé
- `SETUP-GUIDE.md` - Configuration

---

**Prêt à coder !** Modifiez `app/page.tsx` et faites `git push` ! 🚀









