import { Section } from '../types';
import { lesson as weather } from './lesson-01-weather';
import { lesson as nature } from './lesson-02-nature';
import { lesson as seasons } from './lesson-03-seasons';

export const section: Section = {
  id: "weather-nature",
  title: "موسم اور فطرت",
  subtitle: "Weather & Nature",
  lessons: [weather, nature, seasons]
};
