import { Student } from './interfaces/models/student.model';

export interface Book {
  id?: number;
  name: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id?: number;
  name: string;
  topics?: Topic[];
  book?: Book | null;
  book_id?: number;
}

export interface Topic {
  id?: number;
  name: string;
  done?: boolean;
  conclusion?: string | null;
  lesson_id?: number;
}

export interface Class {
  id?: number;
  name: string;
  students?: Student[];
}

export interface StudentLesson {
  id?: number;
  student_id: number;
  lesson_id: number;
  done: number;
  conclusion?: string | null;
}

export interface StudentTopic {
  id?: number;
  student_id: number;
  topic_id: number;
  done: number;
  conclusion?: string | null;
}
