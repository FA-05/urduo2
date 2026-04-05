import { Section } from '../types';
import { lesson as meeting } from './lesson-1-meeting';
import { lesson as time } from './lesson-2-time';
import { lesson as requests } from './lesson-3-requests';
import { lesson as origin } from './lesson-4-origin';

export const section: Section = {
  id: "conv-interactions",
  title: "روزمرہ کی بات چیت",
  subtitle: "Everyday Interactions",
  lessons: [meeting, time, requests, origin]
};
