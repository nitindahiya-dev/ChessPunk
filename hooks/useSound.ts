// hooks/useSound.ts
import { useEffect, useState } from 'react';

const soundFiles = {
  move: '/sounds/move.mp3',
  capture: '/sounds/capture.mp3',
  check: '/sounds/check.mp3',
  gameStart: '/sounds/game-start.mp3',
  gameEnd: '/sounds/game-end.mp3',
  draw: '/sounds/draw.mp3',
  victory: '/sounds/victory.mp3',
};

export const useSound = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [sounds, setSounds] = useState<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    // Preload sounds
    const loadedSounds: Record<string, HTMLAudioElement> = {};
    Object.entries(soundFiles).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      loadedSounds[key] = audio;
    });
    setSounds(loadedSounds);

    // Cleanup: Pause and remove audio elements on unmount
    return () => {
      Object.values(loadedSounds).forEach(audio => {
        audio.pause();
        audio.remove();
      });
    };
  }, []);

  const play = (soundKey: keyof typeof soundFiles) => {
    if (!audioEnabled || !sounds[soundKey]) return;

    try {
      const audio = sounds[soundKey].cloneNode(true) as HTMLAudioElement;
      audio.volume = 0.4;
      audio.play().catch(e => console.error('Failed to play sound:', e));
    } catch (e) {
      console.error('Sound error:', e);
    }
  };

  const toggleAudio = () => setAudioEnabled(!audioEnabled);

  return { play, audioEnabled, toggleAudio };
};