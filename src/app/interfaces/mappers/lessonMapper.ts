import { Lesson } from '../models/lesson.model';
import { LessonEntity } from '../entities/lesson.entity';

export class LessonMapper {
  static toModel({ id, name, book_id }: LessonEntity): Lesson {
    return {
      id,
      name,
      topics: [],
      book_id,
    };
  }
  static toEntity({ id, name, book_id }: Lesson): LessonEntity {
    return {
      id,
      name,
      book_id: book_id!,
    };
  }
}
