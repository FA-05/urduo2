import { Section } from '../types';
import { lesson as familyClose } from './lesson-1-family-close';
import { lesson as familyExtended } from './lesson-2-family-extended';
import { lesson as feelings } from './lesson-3-feelings';
import { lesson as relationships } from './lesson-4-relationships';

export const section: Section = {
  id: "family-emotions",
  title: "خاندان اور جذبات",
  subtitle: "Family & Emotions",
  lessons: [familyClose, familyExtended, feelings, relationships]
};
