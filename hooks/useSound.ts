import { useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';
import { Sounds } from '../constants/sounds';
import { useSettingsStore } from '../store/settingsStore';

export const useSound = () => {
  const { soundEnabled } = useSettingsStore();
  const [sounds, setSounds] = useState<Record<string, Audio.Sound>>({});

  useEffect(() => {
    const loadSounds = async () => {
      const correctSound = new Audio.Sound();
      const incorrectSound = new Audio.Sound();
      const completeSound = new Audio.Sound();
      const streakSound = new Audio.Sound();

      try {
        await correctSound.loadAsync(Sounds.correct);
        await incorrectSound.loadAsync(Sounds.incorrect);
        await completeSound.loadAsync(Sounds.complete);
        await streakSound.loadAsync(Sounds.streak);

        setSounds({
          correct: correctSound,
          incorrect: incorrectSound,
          complete: completeSound,
          streak: streakSound,
        });
      } catch (error) {
        console.error('Failed to load sounds', error);
      }
    };

    loadSounds();

    return () => {
      Object.values(sounds).forEach(async (sound) => {
        try {
          await sound.unloadAsync();
        } catch (error) {
          console.error('Failed to unload sound', error);
        }
      });
    };
  }, []);

  const playSound = async (name: keyof typeof Sounds) => {
    if (!soundEnabled || !sounds[name]) return;

    try {
      await sounds[name].replayAsync();
    } catch (error) {
      console.error(`Failed to play sound: ${name}`, error);
    }
  };

  return {
    playSound,
  };
};