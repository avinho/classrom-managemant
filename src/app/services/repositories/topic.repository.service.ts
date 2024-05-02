import { Injectable, inject } from '@angular/core';
import { Topic } from 'src/app/models';
import { ITopic } from 'src/app/services/repositories/Interfaces';
import { Repository } from './abstractRepository';
import { StorageService } from '../storage.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class TopicRepository extends Repository<Topic> {
  override db: SQLiteDBConnection = inject(StorageService).retrieveDb();
  get tableName(): string {
    return 'Topic';
  }
  mapToDbFields(entity: Topic) {
    return {
      name: entity.name,
      lesson_id: entity.lesson_id,
    };
  }

  async getTopicsByLessonId(id: number) {
    const sql = `SELECT * FROM Topic WHERE lesson_id = ${id};`;
    const result = (await this.db.query(sql)).values;
    let topics: Topic[] = [];

    result?.forEach(async (data) => {
      let topic: Topic = {
        id: data.id,
        name: data.name,
        lesson_id: data.lesson_id,
      };
      topics.push(topic);
      return topic;
    });
    return topics;
  }
}
