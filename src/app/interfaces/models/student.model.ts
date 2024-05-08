import { Class, Book } from 'src/app/models';

export interface Student {
  id?: number;
  name: string;
  birthdate: string;
  currentClass: Class | null;
  currentBook: Book | null;
}
