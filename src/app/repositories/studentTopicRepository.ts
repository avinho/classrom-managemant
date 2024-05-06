import { Injectable } from '@angular/core';
import { StudentTopic } from '../models';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root',
})
export class StudentTopicRepository extends Repository<StudentTopic> {
  get tableName(): string {
    return 'StudentTopic';
  }

  mapToDbFields(entity: StudentTopic) {
    return {
      id: entity.id,
      student_id: entity.student_id,
      topic_id: entity.topic_id,
      done: entity.done,
      conclusion: entity.conclusion,
    };
  }

  async getTopicsByStudentId(id: number) {
    return (
      await this.db.query(`SELECT * FROM StudentTopic WHERE student_id=${id}`)
    ).values as StudentTopic[];
  }

  async getTopicsByLessonId(id: number) {
    return (
      await this.db.query(`SELECT * FROM StudentTopic WHERE topic_id=${id}`)
    ).values as StudentTopic[];
  }
}
