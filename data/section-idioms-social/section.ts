import { Section } from '../types';
import { lesson as fillers } from './lesson-1-fillers';
import { lesson as idioms } from './lesson-2-idioms';
import { lesson as social } from './lesson-3-social';
import { lesson as slang } from './lesson-4-slang';

export const section: Section = {
  id: "idioms-social",
  title: "محاورے اور سماجی باریکیاں",
  subtitle: "Idioms & Social Nuances",
  lessons: [fillers, idioms, social, slang]
};
