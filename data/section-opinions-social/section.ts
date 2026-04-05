import { Section } from '../types';
import { lesson as opinions } from './lesson-01-opinions';
import { lesson as agreement } from './lesson-02-agreement';
import { lesson as advice } from './lesson-03-advice';
import { lesson as doubts } from './lesson-04-doubts';

export const section: Section = {
  id: "opinions-social",
  title: "رائے اور سماجی گفتگو",
  subtitle: "Opinions & Social Talk",
  lessons: [
    opinions,
    agreement,
    advice,
    doubts,
  ]
};
