import { Section } from '../types';
import { lesson as intro } from './lesson-01-intro';
import { lesson as prices } from './lesson-02-prices';
import { lesson as grocery } from './lesson-03-grocery';

export const section: Section = {
  id: "shopping",
  title: "خریداری اور خدمات",
  subtitle: "Shopping & Services",
  lessons: [intro, prices, grocery]
};
