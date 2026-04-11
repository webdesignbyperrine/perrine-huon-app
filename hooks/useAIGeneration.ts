'use client';

import { useState, useCallback } from 'react';

interface UseAIGenerationOptions {
  onSuccess?: (content: string, type: 'excerpt' | 'content') => void;
  onError?: (error: string) => void;
}

/**
 * Hook pour générer du contenu IA (résumé ou article complet) via /api/generate-content.
 * Appelle `onError` si fourni, sinon affiche une alerte native.
 */
export function useAIGeneration(options: UseAIGenerationOptions = {}) {
  const [generating, setGenerating] = useState(false);

  const notifyError = useCallback(
    (message: string) => {
      if (options.onError) {
        options.onError(message);
      } else {
        alert(message);
      }
    },
    [options]
  );

  const generate = useCallback(
    async (title: string, type: 'excerpt' | 'content') => {
      if (!title) {
        notifyError('Le titre est requis pour générer du contenu');
        return null;
      }

      setGenerating(true);

      try {
        const response = await fetch('/api/generate-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, type }),
        });

        if (!response.ok) {
          let errorMessage = 'Erreur lors de la génération.';
          try {
            const errorData = await response.json();
            if (errorData?.error) errorMessage = errorData.error;
          } catch {
            // Corps non-JSON — on garde le message générique
          }
          notifyError(errorMessage);
          return null;
        }

        const data = await response.json();

        if (data.error) {
          notifyError(data.error);
          return null;
        }

        options.onSuccess?.(data.content, type);
        return data.content as string;
      } catch (error) {
        console.error('Erreur génération IA:', error);
        notifyError(
          'Erreur lors de la génération. Vérifiez que votre clé API OpenAI est configurée.'
        );
        return null;
      } finally {
        setGenerating(false);
      }
    },
    [notifyError, options]
  );

  return { generate, generating };
}
