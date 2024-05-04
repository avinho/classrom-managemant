import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Book, Lesson } from 'src/app/models';
import { StorageService } from '../database/storage.service';
import { Repository } from './repository';
import { LessonRepository } from './lesson.repository';
import { TopicRepository } from './topic.repository';

@Injectable({
  providedIn: 'root',
})
export class BookRepository extends Repository<Book> {
  private _db = inject(StorageService).retrieveDb();
  private lessonRepository = inject(LessonRepository);
  private topicRepository = inject(TopicRepository);

  get tableName(): string {
    return 'Book';
  }

  mapToDbFields(entity: Book): any {
    return {
      id: entity.id,
      name: entity.name,
    };
  }

  async loadLessonsByBookId(id: number) {
    const result = (
      await this._db.query(`SELECT * FROM Lesson WHERE book_id=${id}`)
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
    const result = (await this._db.query('SELECT * FROM Book;'))
      .values as Book[];
    let books: Book[] = [];

    result?.forEach(async (data) => {
      let book: Book = {
        id: data.id,
        name: data.name,
        lessons: await this.loadLessonsByBookId(data.id!),
      };
      books.push(book);
      return book;
    });
    return books;
  }
}
