# Guide de Configuration - Étape par Étape

Ce guide vous accompagne dans la configuration complète du projet.

## 📝 Étape 1 : Connexion à GitHub

1. Créez un nouveau dépôt sur [GitHub](https://github.com/new)
   - Nom suggéré : `perrine-huon-app`
   - Choisissez Public ou Private selon vos préférences
   - **NE PAS** initialiser avec README, .gitignore ou license (déjà présents)

2. Dans votre terminal, liez votre projet au dépôt GitHub :

```bash
cd "/Users/perrine/Desktop/Projets pro/Perrine Huon Cursor/perrine-huon-app"
git remote add origin https://github.com/VOTRE-USERNAME/perrine-huon-app.git
git add .
git commit -m "Initial commit: Next.js + Supabase setup"
git push -u origin main
```

## 🗄️ Étape 2 : Configuration Supabase

### Option A : Créer un nouveau projet Supabase

1. Allez sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Cliquez sur "New Project"
3. Choisissez votre organisation
4. Configurez :
   - **Name** : perrine-huon-app
   - **Database Password** : Créez un mot de passe fort (notez-le !)
   - **Region** : Europe (Frankfurt) ou plus proche de vous
   - **Pricing Plan** : Free pour commencer

5. Attendez que le projet soit créé (1-2 minutes)

### Option B : Utiliser un projet existant

Si vous avez déjà un projet Supabase que vous souhaitez utiliser, passez directement à la récupération des clés.

### Récupération des clés Supabase

1. Dans votre projet Supabase, allez dans **Settings** (⚙️)
2. Cliquez sur **API** dans le menu latéral
3. Copiez :
   - **Project URL** (ex: https://xxxxx.supabase.co)
   - **anon/public key** (commence par "eyJh...")

4. Mettez à jour votre fichier `.env.local` :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
```

### Configuration de la base de données (optionnel)

Vous pouvez créer vos tables via :
- **SQL Editor** dans Supabase Dashboard
- Ou via migrations avec la CLI Supabase

Exemple de première table :

```sql
-- Créer une table d'exemple
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Activer RLS (Row Level Security)
alter table public.profiles enable row level security;

-- Politique RLS : les utilisateurs peuvent lire leur propre profil
create policy "Users can view their own profile" 
  on profiles for select 
  using ( auth.uid() = id );

-- Politique RLS : les utilisateurs peuvent mettre à jour leur propre profil
create policy "Users can update their own profile" 
  on profiles for update 
  using ( auth.uid() = id );
```

## 🚀 Étape 3 : Déploiement sur Vercel

### Configuration initiale

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Add New..."** > **"Project"**
3. Importez votre dépôt GitHub :
   - Autorisez Vercel à accéder à votre GitHub
   - Sélectionnez le dépôt `perrine-huon-app`

### Configuration du projet

4. Dans la section **"Configure Project"** :
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : `./` (laisser par défaut)
   - **Build Command** : `npm run build` (détecté automatiquement)
   - **Output Directory** : `.next` (détecté automatiquement)

5. Ajoutez les variables d'environnement :
   - Cliquez sur **"Environment Variables"**
   - Ajoutez :
     - Key: `NEXT_PUBLIC_SUPABASE_URL` → Value: votre URL Supabase
     - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Value: votre clé anon Supabase

6. Cliquez sur **"Deploy"**

### Après le premier déploiement

7. Une fois déployé, Vercel vous donnera une URL (ex: `perrine-huon-app.vercel.app`)
8. Notez cette URL et testez votre application !

### Déploiements automatiques

À partir de maintenant, chaque fois que vous poussez du code sur la branche `main`, Vercel déploiera automatiquement les changements.

## 🔄 Workflow de Développement Recommandé

1. **Développement local** :
```bash
npm run dev
```

2. **Faire des changements** et tester localement

3. **Commiter et pousser** :
```bash
git add .
git commit -m "Description des changements"
git push
```

4. **Vercel déploie automatiquement** 🎉

## 🔐 Configuration Avancée (Optionnel)

### GitHub Actions pour CI/CD

Le fichier `.github/workflows/vercel-deploy.yml` est déjà configuré.

Pour l'activer :

1. Dans Vercel, allez dans **Settings** > **Tokens**
2. Créez un nouveau token
3. Dans votre dépôt GitHub, allez dans **Settings** > **Secrets and variables** > **Actions**
4. Ajoutez les secrets :
   - `VERCEL_TOKEN` : votre token Vercel
   - `VERCEL_ORG_ID` : trouvé dans les settings Vercel
   - `VERCEL_PROJECT_ID` : trouvé dans les settings du projet Vercel

### Domaine personnalisé (Optionnel)

1. Dans Vercel, allez dans **Settings** > **Domains**
2. Ajoutez votre domaine personnalisé
3. Suivez les instructions pour configurer les DNS

## ✅ Vérification

Pour vérifier que tout fonctionne :

1. **Local** : `npm run dev` → http://localhost:3000 ✓
2. **GitHub** : Votre code est visible sur GitHub ✓
3. **Supabase** : Vous pouvez voir votre projet dans le dashboard ✓
4. **Vercel** : Votre site est accessible via l'URL Vercel ✓

## 🆘 Besoin d'aide ?

- **Next.js** : https://nextjs.org/docs
- **Supabase** : https://supabase.com/docs
- **Vercel** : https://vercel.com/docs
- **GitHub** : https://docs.github.com

## 🎯 Prochaines étapes

Maintenant que tout est configuré, vous pouvez :

1. Créer vos pages dans `app/`
2. Ajouter des composants dans un dossier `components/`
3. Créer vos tables Supabase
4. Implémenter l'authentification avec Supabase Auth
5. Déployer vos changements automatiquement !

Bon développement ! 🚀






