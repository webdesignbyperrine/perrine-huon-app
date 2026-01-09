# 🗄️ Appliquer les Migrations Supabase

## Méthode Simple : Via le Dashboard Supabase

### Étape 1 : Ouvrir le SQL Editor

1. Allez sur : **https://supabase.com/dashboard/project/iuqljcfianyoffoaaqjb**
2. Dans le menu latéral, cliquez sur **"SQL Editor"**
3. Cliquez sur **"New query"**

### Étape 2 : Copier la Migration 1

1. Ouvrez le fichier : `supabase/migrations/001_initial_schema.sql`
2. **Copiez tout le contenu** (Cmd + A, puis Cmd + C)
3. Collez dans le SQL Editor de Supabase
4. Cliquez sur **"Run"** (ou Cmd + Enter)

✅ Vous devriez voir : "Success. No rows returned"

### Étape 3 : Copier la Migration 2

1. Ouvrez le fichier : `supabase/migrations/002_sample_data.sql`
2. **Copiez tout le contenu**
3. Créez une nouvelle query dans Supabase
4. Collez et cliquez sur **"Run"**

✅ Vous verrez : "Success. Rows inserted"

### Étape 4 : Vérifier les Tables

1. Dans le menu latéral, cliquez sur **"Table Editor"**
2. Vous devriez voir toutes vos tables :
   - ✅ profiles
   - ✅ projects
   - ✅ blog_posts
   - ✅ faqs
   - ✅ contact_messages
   - ✅ media_assets
   - ✅ project_media
   - ✅ post_media

### Étape 5 : Vérifier les Données de Démo

Cliquez sur la table **"faqs"** - vous devriez voir 5 questions.

## 🎯 Une fois terminé

Quand vous aurez appliqué les migrations :
1. Le formulaire de contact fonctionnera
2. Les sections Portfolio/Blog/FAQ afficheront de vraies données
3. Vous pourrez créer votre premier compte admin

---

**Besoin d'aide ?** Dites-moi simplement "migrations appliquées" quand c'est fait !








