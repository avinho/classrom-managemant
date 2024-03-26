export interface Book {
  id: number;
  name: string;
  lessons?: Lesson[];
}

export interface Lesson {
  name: string;
  topics: Topic[];
}

export interface Topic {
  name: string;
  done: boolean;
  conclusion: null | string;
}

export interface Student {
  id: number;
  name: string;
  age: string;
  class: Class;
  currentBook: Book;
}

export interface Class {
  id: number;
  name: string;
  students?: Student[];
}