import { Injectable, inject } from '@angular/core';
import { Book } from '../interfaces/models/book.model';
import { BookRepository } from '../repositories/book.repository';
import { LessonService } from './lesson.service';
import { BookMapper } from '../mappers/bookMapper';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private bookRepository = inject(BookRepository);
  private LessonService = inject(LessonService);

  async save(source: Book) {
    const book = BookMapper.toEntity(source);
    if (book.id) {
      await this.bookRepository.update(book.id, book);
    } else {
      await this.bookRepository.add(book);
    }
  }

  async delete(bookId: number) {
    await this.bookRepository.remove(bookId);
  }

  async exists(bookId: number) {
    return await this.bookRepository.exists(bookId);
  }

  async loadBooks() {
    const foundBooks = (await this.bookRepository.getAll()).map(
      BookMapper.toModel
    );
    let books: Book[] = [];
    for (const book of foundBooks) {
      books.push(await this.loadBookLessons(book));
    }
    return books;
  }

  async loadBookById(bookId: number) {
    let foundBook = await this.bookRepository.getById(bookId);
    if (!foundBook) {
      return null;
    }
    return await this.loadBookLessons(BookMapper.toModel(foundBook));
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
