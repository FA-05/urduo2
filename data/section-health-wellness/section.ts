import { Section } from '../types';
import { lesson as symptoms } from './lesson-1-symptoms';
import { lesson as atHospital } from './lesson-2-at-hospital';
import { lesson as treatments } from './lesson-3-treatments';
import { lesson as hygiene } from './lesson-4-hygiene';

export const section: Section = {
  id: "health-wellness",
  title: "صحت اور تندرستی",
  subtitle: "Health & Wellbeing",
  lessons: [symptoms, atHospital, treatments, hygiene]
};
