import { Injectable, inject } from '@angular/core';
import { Student } from 'src/app/models';
import { StorageService } from '../database/storage.service';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root',
})
export class StudentsRepository extends Repository<Student> {
  private _db = inject(StorageService).retrieveDb();

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
      await this._db.query(`SELECT * FROM Student WHERE class_id=${id}`)
    ).values as Student[];
    return students;
  }
}
