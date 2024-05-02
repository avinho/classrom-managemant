import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Book, Lesson } from 'src/app/models';
import { StorageService } from '../storage.service';
import { LessonRepository } from './lesson.repository.service';
import { TopicRepository } from './topic.repository.service';

@Injectable({
  providedIn: 'root',
})
export class BookRepository {
  private db = inject(StorageService).retrieveDb();
  private lessonRepository = inject(LessonRepository);
  private topicRepository = inject(TopicRepository);
  public bookList: WritableSignal<Book[]> = signal<Book[]>([]);
  constructor() {}

  async loadBooks() {
    let books = (await this.db.query('SELECT * FROM Book;')).values as Book[];

    this.bookList.set(books);
  }

  async addBook(book: string) {
    try {
      const sql = `INSERT INTO Book (name) VALUES (?);`;
      const result = await this.db.run(sql, [book]);

      if (result.changes) {
        const insertedBookId = result.changes?.lastId!;
        const insertedBook = await this.loadBookById(insertedBookId);
        return insertedBook;
      }
      return null;
    } catch (error: any) {
      return Error(error.message);
    }
  }

  async addBooks(books: string[]) {
    try {
      for (const book of books) {
        const sql = `INSERT INTO Book (name) VALUES (?);`;
        await this.db.run(sql, [book]);
      }
      await this.loadBooks();
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async updateBookById(id: number, name: string) {
    try {
      const sql = `UPDATE Book SET name=? WHERE id=${id}`;
      await this.db.run(sql, [name]);
      await this.loadBooks();
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async loadBookById(id: number) {
    const result = (await this.db.query(`SELECT * FROM Book WHERE id=${id}`))
      .values?.[0];

    let book: Book = {
      id: result?.id,
      name: result?.name,
      lessons: await this.loadLessonsByBookId(id),
    };
    console.log(book);
    return book ? book : null;
  }

  async loadLessonsByBookId(id: number) {
    const result = (
      await this.db.query(`SELECT * FROM Lesson WHERE book_id=${id}`)
    ).values;
    let lessons: Lesson[] = [];

    result?.forEach(async (data) => {
      let lesson: Lesson = {
        id: data.id,
        name: data.name,
        topics: await this.topicRepository.getTopicsByLessonId(data.id),
        //book: await this.loadBookById(data.book_id),
      };
      lessons.push(lesson);
      return lesson;
    });
    return lessons;
  }

  async getBooks() {
    const result = (await this.db.query('SELECT * FROM Book;')).values;
    let books: Book[] = [];

    result?.forEach(async (data) => {
      let book: Book = {
        id: data.id,
        name: data.name,
        lessons: await this.loadLessonsByBookId(data.id),
      };
      books.push(book);
      return book;
    });
    return books;
  }

  async deleteBookById(id: number) {
    try {
      const sql = `DELETE FROM Book WHERE id=${id}`;
      await this.db.run(sql);
      await this.loadBooks();
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
