import { ITopic } from './services/repositories/Interfaces';

export interface Book {
  id: number;
  name: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id?: number;
  name: string;
  topics?: Topic[];
  book?: Book | null;
}

export interface Topic {
  id?: number;
  name: string;
  done?: boolean;
  conclusion?: string | null;
  lesson_id?: number;
}

export interface Student {
  id?: number;
  name: string;
  birthdate: string;
  class: Class | null;
  currentBook?: Book | null;
}

export interface Class {
  id: number;
  name: string;
  students?: Student[];
}

export interface User {
  id: number;
  name: string;
  active: number;
  /* for version 2
     email: string
     */
}
