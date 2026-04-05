import { Section } from '../types';
import { lesson as restaurant } from './lesson-01-restaurant';
import { lesson as social } from './lesson-02-social';
import { lesson as cuisine } from './lesson-03-cuisine';

export const section: Section = {
  id: "restaurant-social",
  title: "ریستوران اور سماجی میل جول",
  subtitle: "Restaurant & Socializing",
  lessons: [restaurant, social, cuisine]
};
