import { Section } from '../types';
import { lesson as neighbor } from './lesson-1-neighbor';
import { lesson as directions } from './lesson-2-directions';
import { lesson as services } from './lesson-3-services';
import { lesson as area } from './lesson-4-area';

export const section: Section = {
  id: "conv-city",
  title: "شہر اور پڑوسی سے بات چیت",
  subtitle: "City & Neighborly Talk",
  lessons: [neighbor, directions, services, area]
};
