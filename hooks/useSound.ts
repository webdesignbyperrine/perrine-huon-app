'use client';

import { useCallback, useRef, useEffect, useState } from 'react';

interface UseSoundOptions {
  volume?: number;
  playbackRate?: number;
  preload?: boolean;
}

// Cache global pour les audios préchargés (persiste entre les re-renders)
const audioCache = new Map<string, HTMLAudioElement>();

export function useSound(soundUrl: string, options: UseSoundOptions = {}) {
  const { volume = 0.5, playbackRate = 1, preload = true } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Précharger l'audio au montage pour une lecture instantanée
  useEffect(() => {
    if (!preload || typeof window === 'undefined') return;
    
    // Vérifier si déjà dans le cache global
    if (audioCache.has(soundUrl)) {
      audioRef.current = audioCache.get(soundUrl)!;
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
      setIsLoaded(true);
      return;
    }
    
    // Créer et précharger le nouvel audio
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = soundUrl;
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.playbackRate = playbackRate;
    
    const handleCanPlay = () => {
      setIsLoaded(true);
    };
    
    audio.addEventListener('canplaythrough', handleCanPlay);
    
    // Déclencher le chargement immédiatement
    audio.load();
    
    // Stocker dans le cache global et la ref
    audioCache.set(soundUrl, audio);
    audioRef.current = audio;
    
    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, [soundUrl, volume, playbackRate, preload]);

  const play = useCallback(() => {
    // Utiliser le cache global si disponible
    let audio = audioRef.current || audioCache.get(soundUrl);
    
    // Fallback: créer à la volée si nécessaire
    if (!audio) {
      audio = new Audio(soundUrl);
      audio.volume = Math.max(0, Math.min(1, volume));
      audio.playbackRate = playbackRate;
      audioRef.current = audio;
    }
    
    // Remettre au début pour lecture immédiate
    audio.currentTime = 0;
    
    // Jouer le son immédiatement
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Navigateurs stricts - ignore silencieusement
      });
    }
  }, [soundUrl, volume, playbackRate]);

  const stop = useCallback(() => {
    const audio = audioRef.current || audioCache.get(soundUrl);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [soundUrl]);

  return { play, stop, isLoaded };
}
