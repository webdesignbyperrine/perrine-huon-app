'use client';

import { useCallback, useRef } from 'react';

interface UseSoundOptions {
  volume?: number;
  playbackRate?: number;
}

export function useSound(soundUrl: string, options: UseSoundOptions = {}) {
  const { volume = 0.5, playbackRate = 1 } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    // Créer ou réutiliser l'élément audio
    if (!audioRef.current) {
      audioRef.current = new Audio(soundUrl);
    }
    
    const audio = audioRef.current;
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.playbackRate = playbackRate;
    
    // Remettre au début si déjà en cours de lecture
    audio.currentTime = 0;
    
    // Jouer le son (avec gestion des erreurs silencieuse pour les navigateurs stricts)
    audio.play().catch(() => {
      // Certains navigateurs bloquent l'autoplay - on ignore silencieusement
    });
  }, [soundUrl, volume, playbackRate]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
}

