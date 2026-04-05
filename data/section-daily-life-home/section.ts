import { Section } from '../types';
import { lesson as rooms } from './lesson-01-rooms';
import { lesson as furniture } from './lesson-02-furniture';
import { lesson as kitchen } from './lesson-03-kitchen';

export const section: Section = {
  id: "daily-life-home",
  title: "روزمرہ کی زندگی - گھر",
  subtitle: "Daily Life - Home",
  lessons: [rooms, furniture, kitchen]
};
