import { Injectable } from '@angular/core';
import { Student } from 'src/app/models';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root',
})
export class StudentsRepository extends Repository<Student> {
  get tableName(): string {
    return 'Student';
  }

  mapToDbFields(entity: Student) {
    return {
      id: entity.id,
      name: entity.name,
      birthdate: entity.birthdate,
      class_id: entity.class?.id,
      current_book_id: entity.currentBook?.id,
    };
  }

  async getStudentsByClassId(id: number) {
    let students = (
      await this.db.query(`SELECT * FROM Student WHERE class_id=${id}`)
    ).values as Student[];
    return students;
  }
}
