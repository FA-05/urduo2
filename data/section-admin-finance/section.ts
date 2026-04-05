import { Section } from '../types';
import { lesson as documents } from './lesson-1-documents';
import { lesson as banking } from './lesson-2-banking';
import { lesson as services } from './lesson-3-services';
import { lesson as workSalary } from './lesson-4-work-salary';

export const section: Section = {
  id: "admin-finance",
  title: "انتظامی امور اور مالیات",
  subtitle: "Administrative & Finance",
  lessons: [documents, banking, services, workSalary]
};
