import { Section } from '../types';
import { lesson as shop } from './lesson-1-shop';
import { lesson as problem } from './lesson-2-problem';
import { lesson as work } from './lesson-3-work';
import { lesson as appointment } from './lesson-4-appointment';

export const section: Section = {
  id: "conv-practical",
  title: "عملی حالات",
  subtitle: "Practical Contexts",
  lessons: [shop, problem, work, appointment]
};
