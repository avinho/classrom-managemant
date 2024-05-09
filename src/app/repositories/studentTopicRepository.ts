import { Injectable } from '@angular/core';
import { StudentTopic } from '../interfaces/entities/studentTopic.entity';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root',
})
export class StudentTopicRepository extends Repository<StudentTopic> {
  get tableName(): string {
    return 'StudentTopic';
  }

  mapToDbFields(entity: StudentTopic) {
    return entity;
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
