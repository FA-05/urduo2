import { Section } from '../types';
import { lesson as pets } from './lesson-01-pets';
import { lesson as wild } from './lesson-02-wild';
import { lesson as farm } from './lesson-03-farm';
import { lesson as birds } from './lesson-04-birds';

export const section: Section = {
  id: "animals-wildlife",
  title: "جانور اور جنگلی حیات",
  subtitle: "Animals & Wildlife",
  lessons: [
    pets,
    wild,
    farm,
    birds,
  ]
};
