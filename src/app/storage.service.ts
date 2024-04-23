import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import bookJson from '../assets/books.json';
import studentJson from '../assets/students.json';
import classesJson from '../assets/classes.json';
import { Student, Book, Class } from './models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    await this.storage.create();
  }

  private async has(key: string) {
    return await this.storage.keys().then((keys) => keys.includes(key));
  }

  async loadStudents(): Promise<Student[]> {
    if (!(await this.has('students'))) {
      await this.storage.set('students', studentJson);
      return this.storage.get('students');
    }
    return this.storage.get('students');
  }

  async loadBooks(): Promise<Book[]> {
    if (!(await this.has('books'))) {
      await this.storage.set('books', bookJson);
      return this.storage.get('books');
    }
    return this.storage.get('books');
  }

  async loadClasses(): Promise<Class[]> {
    if (!(await this.has('classes'))) {
      await this.storage.set('classes', classesJson);
      return this.storage.get('classes');
    }
    return this.storage.get('classes');
  }

  public async set(key: string, value: any) {
    await this.storage.set(key, value);
  }

  private async get(key: string) {
    return await this.storage.get(key);
  }

  private remove(key: string) {
    this.storage.remove(key);
  }

  private async clear() {
    await this.storage.clear();
  }

  private async keys() {
    return await this.storage.keys();
  }

  private async length() {
    return await this.storage.length();
  }

  private async enumerated(key: string, value: any, index: number) {
    return this.storage.forEach((key, value, index) => {});
  }

  public async loadStudentById(id: number) {
    try {
      const students = await this.loadStudents();
      return students.find((student) => student.id === id);
    } catch (error) {
      throw console.error(error);
    }
  }

  public async loadClassById(id: number) {
    try {
      const classes = await this.loadClasses();
      return classes.find((data) => data.id === id);
    } catch (error) {
      throw console.error(error);
    }
  }

  public async loadBookById(id: number) {
    try {
      const books = await this.loadBooks();
      return books.find((data) => data.id === id);
    } catch (error) {
      throw console.error(error);
    }
  }

  public async addStudent(student: Student) {
    const students = await this.loadStudents();
    students.push(student);
    await this.storage.set('students', students);
  }

  public async deleteStudent(student: Student) {
    const students = await this.loadStudents();
    const index = students.findIndex((s) => s.id === student.id);
    students.splice(index, 1);
    await this.storage.set('students', students);
  }

  public async addBook(book: Book) {
    const books = await this.loadBooks();
    books.push(book);
    await this.storage.set('books', books);
  }

  public async addClass(newClass: Class) {
    const classes = await this.loadClasses();
    classes.push(newClass);
    await this.storage.set('classes', classes);
  }

  public async updateStudent(student: Student) {
    const students = await this.loadStudents();
    const index = students.findIndex((s) => s.id === student.id);
    students[index] = student;
    await this.storage.set('students', students);
  }

  public async updateBook(book: Book) {
    const books = await this.loadBooks();
    const index = books.findIndex((s) => s.id === book.id);
    books[index] = book;
    await this.storage.set('books', books);
  }
}
