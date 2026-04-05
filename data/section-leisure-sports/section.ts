import { Section } from '../types';
import { lesson as hobbies } from './lesson-01-hobbies';
import { lesson as sports } from './lesson-02-sports';
import { lesson as travel } from './lesson-03-travel';
import { lesson as entertainment } from './lesson-04-entertainment';

export const section: Section = {
  id: "leisure-sports",
  title: "فراغت اور کھیل",
  subtitle: "Leisure & Sports",
  lessons: [hobbies, sports, travel, entertainment]
};
