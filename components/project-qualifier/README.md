# Project Qualifier - Parcours de Qualification Interactive

Un composant React interactif pour qualifier les prospects directement depuis la section Hero du portfolio.

## Fonctionnalités

- ✅ **8 étapes facultatives** : Type de projet, Fonctionnalités, Style de design, Animations, Budget, Délais, Accompagnement, Inspirations
- ✅ **Toutes les étapes sont optionnelles** : L'utilisateur peut passer n'importe quelle étape
- ✅ **Sauvegarde automatique** : Progression sauvegardée en localStorage
- ✅ **Design system cohérent** : Utilise les couleurs et styles du site (glassmorphism, gradients, animations)
- ✅ **100% Responsive** : Mobile-first, adapté à tous les écrans
- ✅ **Accessible** : Navigation clavier, ARIA labels, focus visible
- ✅ **Pré-remplissage du formulaire** : Le récapitulatif pré-remplit automatiquement le formulaire de contact

## Structure des fichiers

```
components/project-qualifier/
├── index.ts                    # Exports principaux
├── types.ts                    # Types TypeScript et données de configuration
├── context.tsx                 # Context React pour le state management
├── icons.tsx                   # Icônes SVG personnalisées
├── ProjectQualifier.tsx        # Composant principal
├── ui/
│   ├── ProgressBar.tsx         # Barre de progression
│   ├── NavigationButtons.tsx   # Boutons Précédent/Suivant/Passer
│   └── SelectionCard.tsx       # Cartes de sélection (simple et multiple)
├── steps/
│   ├── IntroStep.tsx           # Écran d'introduction
│   ├── ProjectTypeStep.tsx     # Étape 1: Type de projet
│   ├── FeaturesStep.tsx        # Étape 2: Fonctionnalités
│   ├── DesignStyleStep.tsx     # Étape 3: Style de design
│   ├── AnimationLevelStep.tsx  # Étape 4: Niveau d'animation
│   ├── BudgetStep.tsx          # Étape 5: Budget
│   ├── DeadlineStep.tsx        # Étape 6: Délais
│   ├── AccompagnementStep.tsx  # Étape 7: Accompagnement
│   ├── InspirationsStep.tsx    # Étape 8: Inspirations
│   └── SummaryStep.tsx         # Écran de récapitulatif
└── README.md                   # Cette documentation
```

## Utilisation

### Mode Inline (dans la page)

```tsx
import { ProjectQualifier } from '@/components/project-qualifier';

function MyPage() {
  return (
    <div>
      <ProjectQualifier mode="inline" />
    </div>
  );
}
```

### Mode Modal (overlay)

```tsx
import { useState } from 'react';
import { ProjectQualifier } from '@/components/project-qualifier';

function MyPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Définir mon projet
      </button>
      
      <ProjectQualifier 
        mode="modal" 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </div>
  );
}
```

### Accéder aux données (hook)

```tsx
import { useQualifier } from '@/components/project-qualifier';

function MyComponent() {
  const { data, currentStep, goNext, goPrevious } = useQualifier();
  
  console.log(data.projectType);
  console.log(data.features);
  // etc.
}
```

## Personnalisation

### Ajouter une nouvelle option de type de projet

Dans `types.ts`, ajoutez à `PROJECT_TYPES` :

```ts
export const PROJECT_TYPES = [
  // ... options existantes
  { 
    value: 'nouveau-type', 
    label: 'Nouveau type', 
    description: 'Description', 
    icon: 'page' // nom d'icône existant dans icons.tsx
  },
];
```

### Modifier les budgets

Dans `types.ts`, modifiez `BUDGET_OPTIONS` :

```ts
export const BUDGET_OPTIONS = [
  { value: 'petit', label: 'Petit budget', range: '500€ - 1 500€', description: 'Description' },
  // etc.
];
```

### Ajouter une nouvelle icône

Dans `icons.tsx`, ajoutez une nouvelle fonction et référencez-la dans `ICON_MAP`.

## Couleurs utilisées

Le composant utilise les variables CSS du site :
- `secondary` : #DD47B3 (magenta)
- `accent-orange` : #FFB97C
- `accent-red` : #FF4855
- `accent-blue` : #4FC3F7
- `primary-900` : #0a0e1a (fond)

## Stockage localStorage

Les données sont sauvegardées sous les clés :
- `project-qualifier-data` : Données du formulaire
- `project-qualifier-step` : Étape actuelle

Pour réinitialiser :
```js
localStorage.removeItem('project-qualifier-data');
localStorage.removeItem('project-qualifier-step');
```

## Intégration avec le formulaire de contact

Le récapitulatif génère automatiquement un message pré-formaté qui est injecté dans le formulaire de contact via un événement `input` sur le textarea.

Le formulaire de contact (`ContactForm.tsx`) écoute cet événement pour mettre à jour son state React.



