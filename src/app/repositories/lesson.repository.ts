import { Injectable, inject } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Lesson } from 'src/app/models';
import { StorageService } from '../database/storage.service';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root',
})
export class LessonRepository extends Repository<Lesson> {
  private _db: SQLiteDBConnection = inject(StorageService).retrieveDb();

  get tableName(): string {
    return 'Lesson';
  }
  mapToDbFields(entity: Lesson) {
    return {
      id: entity.id,
      name: entity.name,
      book_id: entity.book?.id,
    };
  }

  async getLessonsByBookId(id: number) {
    const lessons = (
      await this._db.query(`SELECT * FROM Lesson WHERE book_id=${id}`)
    ).values as Lesson[];
    return lessons;
  }
}
