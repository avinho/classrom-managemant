import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { TopicEntity } from '../interfaces/entities/topic.entity';

@Injectable({
  providedIn: 'root',
})
export class TopicRepository extends Repository<TopicEntity> {
  get tableName(): string {
    return 'Topic';
  }
  mapToDbFields(entity: TopicEntity) {
    return entity;
  }

  async getTopicsByLessonId(id: number) {
    const sql = `SELECT * FROM Topic WHERE lesson_id = ${id};`;
    const topics = (await this.db.query(sql)).values as TopicEntity[];
    return topics;
  }
}
