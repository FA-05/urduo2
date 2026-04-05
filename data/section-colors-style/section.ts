import { Section } from '../types';
import { lesson as colorsBasic } from './lesson-1-colors-basic';
import { lesson as shadesPatterns } from './lesson-2-shades-patterns';
import { lesson as clothesBasic } from './lesson-3-clothes-basic';
import { lesson as accessories } from './lesson-4-accessories';

export const section: Section = {
  id: "colors-style",
  title: "رنگ اور سٹائل",
  subtitle: "Colors & Style",
  lessons: [colorsBasic, shadesPatterns, clothesBasic, accessories]
};
