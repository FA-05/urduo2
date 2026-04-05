import { Section } from '../types';
import { lesson as greetings } from './lesson-01-greetings';
import { lesson as pronounsSingular } from './lesson-02-pronouns-singular';
import { lesson as pronounsPlural } from './lesson-03-pronouns-plural';
import { lesson as numbers15 } from './lesson-04-numbers-1-5';
import { lesson as polite } from './lesson-05-polite-expressions';
import { lesson as introductions } from './lesson-06-introductions';

export const section: Section = {
  id: "foundations",
  title: "بنیادی باتیں",
  subtitle: "Foundations",
  lessons: [
    greetings,
    pronounsSingular,
    pronounsPlural,
    numbers15,
    polite,
    introductions
  ]
};
