import { Injectable } from '@angular/core';
import { Lesson } from 'src/app/models';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root',
})
export class LessonRepository extends Repository<Lesson> {
  get tableName(): string {
    return 'Lesson';
  }
  mapToDbFields(entity: Lesson) {
    return {
      id: entity.id,
      name: entity.name,
      book_id: entity.book_id,
    };
  }

  async getLessonsByBookId(id: number) {
    const lessons = (
      await this.db.query(`SELECT * FROM Lesson WHERE book_id=${id}`)
    ).values as Lesson[];
    return lessons;
  }
}
