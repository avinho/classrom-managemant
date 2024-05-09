import { Book } from '../interfaces/models/book.model';
import { BookEntity } from '../interfaces/entities/book.entity';

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
