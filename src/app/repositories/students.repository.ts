import { Injectable } from '@angular/core';
import { StudentEntity } from '../interfaces/entities/student.entity';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root',
})
export class StudentsRepository extends Repository<StudentEntity> {
  get tableName(): string {
    return 'Student';
  }

  mapToDbFields(entity: StudentEntity) {
    return entity;
  }

  async getStudentsByClassId(id: number) {
    let students = (
      await this.db.query(`SELECT * FROM Student WHERE class_id=${id}`)
    ).values as StudentEntity[];
    return students;
  }
}
