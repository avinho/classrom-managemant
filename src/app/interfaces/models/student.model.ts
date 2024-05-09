import { Book } from 'src/app/interfaces/models/book.model';
import { Class } from 'src/app/interfaces/models/class.model';

export interface Student {
  id?: number;
  name: string;
  birthdate: string;
  currentClass: Class | null;
  currentBook: Book | null;
}
