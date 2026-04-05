import { Section } from '../types';
import { lesson as intro } from './lesson-01-intro';
import { lesson as advanced } from './lesson-02-advanced';
import { lesson as office } from './lesson-03-office';

export const section: Section = {
  id: "professions",
  title: "پیشے اور کیریئر",
  subtitle: "Professions & Career",
  lessons: [intro, advanced, office]
};
