import { Lesson } from './lesson.model';

export interface Book {
  id?: number;
  name: string;
  lessons: Lesson[];
}
