#!/bin/bash

# Script pour connecter le projet au dépôt GitHub
# Une fois que vous avez créé le dépôt sur GitHub, exécutez ce script

echo "🔗 Connexion au dépôt GitHub..."

# Remplacez VOTRE-USERNAME par votre nom d'utilisateur GitHub
# Ou utilisez webdesignbyperrine si c'est votre username GitHub

# Option 1 : Si votre username GitHub est webdesignbyperrine
git remote add origin https://github.com/webdesignbyperrine/perrine-huon-app.git

# Option 2 : Si vous avez un autre username, commentez la ligne au-dessus et décommentez celle-ci :
# git remote add origin https://github.com/VOTRE-USERNAME/perrine-huon-app.git

echo "✅ Remote ajouté"

# Vérifier que le remote est bien configuré
echo ""
echo "📋 Configuration du remote :"
git remote -v

echo ""
echo "🚀 Maintenant, poussez votre code avec :"
echo "git push -u origin main"

