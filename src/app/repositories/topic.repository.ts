import { Injectable } from '@angular/core';
import { Topic } from 'src/app/models';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root',
})
export class TopicRepository extends Repository<Topic> {
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
    const topics = (await this.db.query(sql)).values as Topic[];
    return topics;
  }
}
