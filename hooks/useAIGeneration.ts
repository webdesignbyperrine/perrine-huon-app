'use client';

import { useState, useCallback } from 'react';

interface UseAIGenerationOptions {
  onSuccess?: (content: string, type: 'excerpt' | 'content') => void;
  onError?: (error: string) => void;
}

/**
 * Hook pour générer du contenu avec IA (blog articles)
 */
export function useAIGeneration(options: UseAIGenerationOptions = {}) {
  const [generating, setGenerating] = useState(false);

  const generate = useCallback(async (title: string, type: 'excerpt' | 'content') => {
    if (!title) {
      const error = 'Le titre est requis pour générer du contenu';
      options.onError?.(error) ?? alert(error);
      return null;
    }

    setGenerating(true);

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, type }),
      });

      const data = await response.json();

      if (data.error) {
        options.onError?.(data.error) ?? alert(data.error);
        return null;
      }

      options.onSuccess?.(data.content, type);
      return data.content;
    } catch (error) {
      console.error('Generation error:', error);
      const errorMsg = 'Erreur lors de la génération. Vérifiez que votre clé API OpenAI est configurée.';
      options.onError?.(errorMsg) ?? alert(errorMsg);
      return null;
    } finally {
      setGenerating(false);
    }
  }, [options]);

  return { generate, generating };
}
