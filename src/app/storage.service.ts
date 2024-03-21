import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { asyncScheduler, delay, first, from, of, repeat, take } from 'rxjs';
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
    if (!(await this.has('books'))) {
      this.http
        .get<Book[]>('assets/books.json')
        .pipe(first())
        .subscribe({
          next: async (books) => await this.storage.set('books', books),
          error: (error) => console.log(error),
          complete: () => console.log('complete books'),
        });
    }

    if (!(await this.has('students'))) {
      this.http
        .get<Student[]>('assets/students.json')
        .pipe(first())
        .subscribe({
          next: async (student) => await this.set('students', student),
          error: (error) => console.log(error),
          complete: () => console.log('complete students'),
        });
    }
  }

  public async has(key: string) {
    return (await this.storage.keys().then((keys) => keys.includes(key)))
      ? true
      : false;
  }

  loadBooksObservable() {
    return of(this.storage.get('books')).pipe(delay(2000));
  }

  loadStudentsObservable() {
    return of(this.storage.get('students')).pipe(delay(2000));
  }

  async loadStudents(): Promise<Student[]> {
    return this.storage.get('students');
  }

  async loadBooks(): Promise<Book[]> {
    return this.storage.get('books');
  }

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
