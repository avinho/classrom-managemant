import { Injectable } from '@angular/core';
import { LessonEntity } from '../interfaces/entities/lesson.entity';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root',
})
export class LessonRepository extends Repository<LessonEntity> {
  get tableName(): string {
    return 'Lesson';
  }
  mapToDbFields(entity: LessonEntity) {
    return entity;
  }

  async getLessonsByBookId(id: number) {
    const lessons = (
      await this.db.query(`SELECT * FROM Lesson WHERE book_id=${id}`)
    ).values as LessonEntity[];
    return lessons;
  }
}
