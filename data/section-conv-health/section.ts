import { Section } from '../types';
import { lesson as ambulance } from './lesson-1-ambulance';
import { lesson as pharmacy } from './lesson-2-pharmacy';
import { lesson as pain } from './lesson-3-pain';
import { lesson as firstAid } from './lesson-4-first-aid';

export const section: Section = {
  id: "conv-health",
  title: "صحت اور ہنگامی گفتگو",
  subtitle: "Health & Emergency Dialogue",
  lessons: [ambulance, pharmacy, pain, firstAid]
};
