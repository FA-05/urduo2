import { Section } from '../types';
import { lesson as basics } from './lesson-01-basics';
import { lesson as internet } from './lesson-02-internet';
import { lesson as devices } from './lesson-03-devices';
import { lesson as apps } from './lesson-04-apps';

export const section: Section = {
  id: "technology",
  title: "ٹیکنالوجی اور میڈیا",
  subtitle: "Technology & Media",
  lessons: [basics, internet, devices, apps]
};
