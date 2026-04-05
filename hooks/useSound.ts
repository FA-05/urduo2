import * as Speech from 'expo-speech';
import { useAudioPlayer } from 'expo-audio';
import { Sounds } from '../constants/sounds';
import { useSettingsStore } from '../store/settingsStore';

export const useSound = () => {
  const { soundEnabled } = useSettingsStore();

  const players = {
    correct: useAudioPlayer(Sounds.correct),
    incorrect: useAudioPlayer(Sounds.incorrect),
    complete: useAudioPlayer(Sounds.complete),
    streak: useAudioPlayer(Sounds.streak),
  };

  const playSound = (name: keyof typeof Sounds) => {
    if (!soundEnabled) return;

    try {
      const player = players[name];
      if (player) {
        player.seekTo(0);
        player.play();
      }
    } catch (error) {
      console.error(`Failed to play sound: ${name}`, error);
    }
  };

  /**
   * Speaks the provided text in Italian (it-IT).
   * Respects soundEnabled setting.
   */
  const speak = (text: string) => {
    if (!soundEnabled) return;

    try {
      // Use standard Italian language code
      Speech.speak(text, {
        language: 'it-IT',
        pitch: 1.0,
        rate: 0.9, // Slightly slower for better clarity in learning
      });
    } catch (error) {
      console.error('Failed to speak text:', error);
    }
  };

  return {
    playSound,
    speak,
  };
};