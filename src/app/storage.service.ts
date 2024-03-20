import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { delay, first } from 'rxjs';
import { Book, Student } from './tab3/tab3.page';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    await this.storage.create();
  }

  public async has(key: string) {
    return (await this.storage.keys().then((keys) => keys.includes(key)))
      ? true
      : false;
  }

  public async loadBooks(): Promise<Book[]> {
    let _books: Book[] = [];
    if (!(await this.has('books'))) {
      this.http
        .get<Book[]>('assets/books.json')
        .pipe(delay(1300), first())
        .subscribe(async (books) => {
          await this.set('books', books);
          _books = books;
        });
      return _books;
    }
    return await this.get('books').then((data) => {
      return data;
    });
  }

  public async loadStudents(): Promise<Student[]> {
    let _students: Student[] = [];
    if (!(await this.has('students'))) {
      this.http
        .get<Student[]>('assets/students.json')
        .pipe(delay(1300), first())
        .subscribe(async (student) => {
          await this.set('students', student);
          _students = student;
        });
      return _students;
    }
    return await this.get('students').then((data) => {
      return data;
    });
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any) {
    await this.storage.set(key, value);
  }

  public async get(key: string) {
    return await this.storage.get(key);
  }

  public remove(key: string) {
    this.storage.remove(key);
  }

  public async clear() {
    await this.storage.clear();
  }

  public async keys() {
    return await this.storage.keys();
  }

  public async length() {
    return await this.storage.length();
  }

  public async enumerated(key: string) {
    this.storage.forEach((key, value, index) => {});
  }
}
