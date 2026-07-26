'use client';

import { useCallback, useRef, useEffect } from 'react';

interface UseSoundOptions {
  volume?: number;
  playbackRate?: number;
  preload?: boolean;
}

// Cache global pour les audios préchargés (persiste entre les re-renders)
const audioCache = new Map<string, HTMLAudioElement>();

function resetAudio(audio: HTMLAudioElement) {
  audio.currentTime = 0;
}

/**
 * Hook pour charger et jouer un son avec mise en cache globale.
 * Précharge le fichier audio au montage pour une lecture instantanée sans latence.
 * Les erreurs de lecture (politiques autoplay strictes) sont ignorées silencieusement.
 * @param soundUrl - URL du fichier audio (ex. '/sounds/parrot.wav').
 * @param options - Volume (0-1), vitesse de lecture, et activation du préchargement.
 * @returns Fonctions de chargement et de contrôle du son.
 */
export function useSound(soundUrl: string, options: UseSoundOptions = {}) {
  const { volume = 0.5, playbackRate = 1, preload = false } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const load = useCallback(() => {
    if (typeof window === 'undefined') return null;

    if (audioCache.has(soundUrl)) {
      const cachedAudio = audioCache.get(soundUrl)!;
      cachedAudio.volume = Math.max(0, Math.min(1, volume));
      cachedAudio.playbackRate = playbackRate;
      audioRef.current = cachedAudio;
      return cachedAudio;
    }

    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = soundUrl;
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.playbackRate = playbackRate;
    audio.load();

    audioCache.set(soundUrl, audio);
    audioRef.current = audio;

    return audio;
  }, [soundUrl, volume, playbackRate]);

  // Le préchargement reste disponible pour les usages qui le demandent explicitement.
  useEffect(() => {
    if (preload) load();
  }, [preload, load]);

  const play = useCallback(() => {
    const audio = audioRef.current || audioCache.get(soundUrl) || load();
    if (!audio) return;
    
    // Remettre au début pour lecture immédiate
    resetAudio(audio);
    
    // Jouer le son immédiatement
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Navigateurs stricts - ignore silencieusement
      });
    }
  }, [soundUrl, load]);

  const stop = useCallback(() => {
    const audio = audioRef.current || audioCache.get(soundUrl);
    if (audio) {
      audio.pause();
      resetAudio(audio);
    }
  }, [soundUrl]);

  return { play, stop, load };
}
