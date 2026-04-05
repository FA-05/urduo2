import { Section } from '../types';
import { lesson as artMusic } from './lesson-01-art-music';
import { lesson as booksLit } from './lesson-02-books-lit';
import { lesson as cinemaTheater } from './lesson-03-cinema-theater';
import { lesson as historyTraditions } from './lesson-04-history-traditions';
import { lesson as festivalsEvents } from './lesson-05-festivals-events';

export const section: Section = {
  id: "art-culture-history",
  title: "فن، ثقافت اور تاریخ",
  subtitle: "Art, Culture & History",
  lessons: [artMusic, booksLit, cinemaTheater, historyTraditions, festivalsEvents]
};
