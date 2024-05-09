import { Injectable, inject } from '@angular/core';
import { StudentTopic } from '../interfaces/entities/studentTopic.entity';
import { StudentTopicRepository } from '../repositories/studentTopicRepository';
import { StudentsRepository } from '../repositories/students.repository';
import { TopicService } from './topic.service';

@Injectable({
  providedIn: 'root',
})
export class StudentTopicService {
  private readonly topicService = inject(TopicService);
  private readonly studentRepository = inject(StudentsRepository);
  private readonly studentTopicRepository = inject(StudentTopicRepository);

  async save(studentTopic: StudentTopic) {
    if (studentTopic.id) {
      await this.studentTopicRepository.update(studentTopic.id, studentTopic);
    } else {
      await this.studentTopicRepository.add(studentTopic);
    }
  }

  async loadAll() {
    return await this.studentTopicRepository.getAll();
  }

  async delete(studentTopic: StudentTopic) {
    await this.studentTopicRepository.remove(studentTopic.id!);
  }

  async exists(id: number) {
    return await this.studentTopicRepository.exists(id);
  }

  async loadByTopicId(id: number) {
    return await this.studentTopicRepository.getById(id);
  }

  async loadTopicsByStudentId(id: number) {
    return await this.studentTopicRepository.getTopicsByStudentId(id);
  }

  async loadTopicsByLessonId(id: number) {
    return await this.studentTopicRepository.getTopicsByLessonId(id);
  }
}
