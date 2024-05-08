import { Book } from '../models/book.model';
import { BookEntity } from '../entities/book.entity';

export class BookMapper {
  static toModel({ id, name }: BookEntity): Book {
    return {
      id,
      name,
      lessons: [],
    };
  }
  static toEntity({ id, name }: Book): BookEntity {
    return {
      id,
      name,
    };
  }
}
