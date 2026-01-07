'use client';

import { useCallback, useRef, useEffect } from 'react';

interface UseSoundOptions {
  volume?: number;
  playbackRate?: number;
  preload?: boolean;
}

export function useSound(soundUrl: string, options: UseSoundOptions = {}) {
  const { volume = 0.5, playbackRate = 1, preload = true } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isLoadedRef = useRef(false);

  // Précharger l'audio au montage pour une lecture instantanée
  useEffect(() => {
    if (preload && typeof window !== 'undefined') {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = soundUrl;
      audio.volume = Math.max(0, Math.min(1, volume));
      audio.playbackRate = playbackRate;
      
      // Précharger le fichier audio
      audio.load();
      audioRef.current = audio;
      
      audio.addEventListener('canplaythrough', () => {
        isLoadedRef.current = true;
      });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundUrl, volume, playbackRate, preload]);

  const play = useCallback(() => {
    // Créer si pas encore créé (fallback)
    if (!audioRef.current) {
      audioRef.current = new Audio(soundUrl);
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
      audioRef.current.playbackRate = playbackRate;
    }
    
    const audio = audioRef.current;
    
    // Remettre au début si déjà en cours de lecture
    audio.currentTime = 0;
    
    // Jouer le son immédiatement (avec gestion des erreurs silencieuse)
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

  return { play, stop, isLoaded: isLoadedRef.current };
}

