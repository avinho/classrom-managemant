import { Injectable, inject } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Lesson } from 'src/app/models';
import { StorageService } from '../storage.service';
import { Repository } from './abstractRepository';

@Injectable({
  providedIn: 'root',
})
export class LessonRepository extends Repository<Lesson> {
  override db: SQLiteDBConnection = inject(StorageService).retrieveDb();

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
}
