import { StudentEntity } from 'src/app/interfaces/entities/student.entity';
import { Student } from 'src/app/interfaces/models/student.model';

export class StudentMapper {
  static toModel({ id, name, birthdate }: StudentEntity): Student {
    return {
      id,
      name,
      birthdate,
      currentClass: null,
      currentBook: null,
    };
  }
  static toEntity({
    id,
    name,
    birthdate,
    currentClass,
    currentBook,
  }: Student): StudentEntity {
    return {
      id,
      name,
      birthdate,
      class_id: currentClass?.id ? currentClass.id : null,
      current_book_id: currentBook?.id ? currentBook.id : null,
    };
  }
}
