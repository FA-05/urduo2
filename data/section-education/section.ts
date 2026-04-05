import { Section } from '../types';
import { lesson as schoolBasics } from './lesson-01-school-basics';
import { lesson as classroomTools } from './lesson-02-classroom-tools';
import { lesson as studyExams } from './lesson-03-study-exams';
import { lesson as higherEd } from './lesson-04-higher-ed';

export const section: Section = {
  id: "education",
  title: "تعلیم اور سکول",
  subtitle: "Education & School",
  lessons: [schoolBasics, classroomTools, studyExams, higherEd]
};
