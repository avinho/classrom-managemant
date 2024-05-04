import { Injectable, inject } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Topic } from 'src/app/models';
import { StorageService } from '../database/storage.service';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root',
})
export class TopicRepository extends Repository<Topic> {
  private _db: SQLiteDBConnection = inject(StorageService).retrieveDb();
  get tableName(): string {
    return 'Topic';
  }
  mapToDbFields(entity: Topic) {
    return {
      id: entity.id,
      name: entity.name,
      lesson_id: entity.lesson_id,
    };
  }

  async getTopicsByLessonId(id: number) {
    const sql = `SELECT * FROM Topic WHERE lesson_id = ${id};`;
    const topics = (await this._db.query(sql)).values as Topic[];
    return topics;
  }
}
