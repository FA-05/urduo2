import { Section } from '../types';
import { lesson as faceHead } from './lesson-1-face-head';
import { lesson as torsoLimbs } from './lesson-2-torso-limbs';
import { lesson as internalOrgans } from './lesson-3-internal-organs';
import { lesson as bodyPlurals } from './lesson-4-body-plurals';

export const section: Section = {
  id: "body-parts",
  title: "انسانی جسم",
  subtitle: "The Human Body",
  lessons: [faceHead, torsoLimbs, internalOrgans, bodyPlurals]
};
