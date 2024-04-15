export interface Book {
  id: number;
  name: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: number;
  name: string;
  topics: Topic[];
}

export interface Topic {
  id: number;
  name: string;
  done: boolean;
  conclusion: null | string;
}

export interface Student {
  id: number;
  name: string;
  birthdate: string;
  class?: Class;
  currentBook?: Book;
}

export interface Class {
  id: number;
  name: string;
  students?: Student[];
}
