# Perrine Huon - Next.js App

Ce projet est une application Next.js avec TypeScript, Tailwind CSS et Supabase comme base de données.

## 🚀 Stack Technique

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styles**: Tailwind CSS
- **Base de données**: Supabase
- **Déploiement**: Vercel
- **Version Control**: Git/GitHub

## 📋 Prérequis

- Node.js 18+ et npm
- Un compte Supabase
- Un compte GitHub
- Un compte Vercel

## 🛠️ Installation

1. Clonez le dépôt :
```bash
git clone <votre-repo-url>
cd perrine-huon-app
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env.local
```

Ensuite, remplissez `.env.local` avec vos clés Supabase :
- `NEXT_PUBLIC_SUPABASE_URL` : URL de votre projet Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : Clé anonyme de votre projet

Vous pouvez trouver ces informations dans votre [tableau de bord Supabase](https://supabase.com/dashboard) > Paramètres du projet > API

4. Lancez le serveur de développement :
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🗄️ Configuration Supabase

### Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre URL et clé API (anon/public)
4. Ajoutez-les dans `.env.local`

### Structure de la base de données

Les clients Supabase sont configurés dans :
- `lib/supabase/client.ts` - Pour les composants client
- `lib/supabase/server.ts` - Pour les composants serveur
- `lib/supabase/middleware.ts` - Pour le middleware Next.js

## 🚢 Déploiement sur Vercel

### Connexion GitHub

1. Poussez votre code sur GitHub :
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <votre-repo-github-url>
git push -u origin main
```

### Déploiement Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre compte GitHub
3. Importez votre dépôt
4. Ajoutez les variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Déployez !

Vercel détectera automatiquement Next.js et appliquera les configurations optimales.

## 📁 Structure du Projet

```
perrine-huon-app/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── lib/
│   └── supabase/          # Configuration Supabase
│       ├── client.ts      # Client Supabase (côté client)
│       ├── server.ts      # Client Supabase (côté serveur)
│       └── middleware.ts  # Middleware Supabase
├── middleware.ts          # Middleware Next.js
├── .env.local            # Variables d'environnement (ne pas commiter)
├── .env.example          # Template des variables d'environnement
└── vercel.json           # Configuration Vercel
```

## 🔧 Scripts Disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée une version de production
- `npm run start` - Lance le serveur de production
- `npm run lint` - Vérifie le code avec ESLint

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)

## 🔐 Sécurité

- Ne commitez jamais vos fichiers `.env.local`
- Utilisez toujours la clé `anon` publique côté client
- Configurez les Row Level Security (RLS) dans Supabase pour protéger vos données

## 🤝 Contribution

Ce projet est personnel. Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue.
