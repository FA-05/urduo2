import { Section } from '../types';
import { lesson as airport } from './lesson-01-airport';
import { lesson as transit } from './lesson-02-transit';
import { lesson as driving } from './lesson-03-driving';

export const section: Section = {
  id: "travel-transport",
  title: "سفر اور آمد و رفت",
  subtitle: "Travel & Transportation",
  lessons: [airport, transit, driving]
};
