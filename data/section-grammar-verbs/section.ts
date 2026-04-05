import { Section } from '../types';
import { lesson as areVerbs } from './lesson-1-are-verbs';
import { lesson as ereVerbs } from './lesson-2-ere-verbs';
import { lesson as ireVerbs } from './lesson-3-ire-verbs';
import { lesson as modals } from './lesson-4-modals';

export const section: Section = {
  id: "grammar-verbs",
  title: "درمیانی قواعد: فعل",
  subtitle: "Intermediate Grammar: Verbs",
  lessons: [areVerbs, ereVerbs, ireVerbs, modals]
};
