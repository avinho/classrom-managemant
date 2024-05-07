import { Injectable, inject } from '@angular/core';
import { Book } from '../models';
import { BookRepository } from '../repositories/book.repository';
import { LessonService } from './lesson.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private bookRepository = inject(BookRepository);
  private LessonService = inject(LessonService);

  async save(book: Book) {
    if (book.id) {
      await this.bookRepository.update(book.id, book);
    } else {
      await this.bookRepository.add(book);
    }
  }

  async delete(book: Book) {
    await this.bookRepository.remove(book.id!);
  }

  async exists(id: number) {
    return await this.bookRepository.exists(id);
  }

  async loadBooks() {
    const foundBooks = await this.bookRepository.getAll();
    let books: Book[] = [];
    for (const book of foundBooks) {
      books.push(await this.loadBookLessons(book));
    }
    return books;
  }

  async loadBookById(id: number) {
    let foundBook = await this.bookRepository.getById(id);
    if (!foundBook) {
      return null;
    }
    return await this.loadBookLessons(foundBook);
  }

  private async loadBookLessons(book: Book): Promise<Book> {
    let lessons = await this.LessonService.loadLessonsByBookId(book.id!);
    return {
      id: book.id,
      name: book.name,
      lessons: lessons,
    };
  }
}
