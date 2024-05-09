import { Injectable, inject } from '@angular/core';
import { LessonRepository } from '../repositories/lesson.repository';
import { TopicService } from './topic.service';
import { Lesson } from '../interfaces/models/lesson.model';
import { LessonMapper } from '../mappers/lessonMapper';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private readonly lessonRepository = inject(LessonRepository);
  private readonly topicService = inject(TopicService);

  constructor() {}

  async save(source: Lesson) {
    const lesson = LessonMapper.toEntity(source);
    if (lesson.id) {
      await this.lessonRepository.update(lesson.id, lesson);
    } else {
      await this.lessonRepository.add(lesson);
    }
  }

  async delete(id: number) {
    await this.lessonRepository.remove(id);
  }

  async exists(id: number) {
    return await this.lessonRepository.exists(id);
  }

  async loadLessons() {
    const foundLessons = (await this.lessonRepository.getAll()).map(
      LessonMapper.toModel
    );
    let lessons: Lesson[] = [];
    for (const lesson of foundLessons) {
      lessons.push(await this.loadTopicsLesson(lesson));
    }
    return lessons;
  }

  async loadLessonsByBookId(id: number) {
    const foundLessons = (
      await this.lessonRepository.getLessonsByBookId(id)
    ).map(LessonMapper.toModel);

    let lessons: Lesson[] = [];
    for (const lesson of foundLessons) {
      lessons.push(await this.loadTopicsLesson(lesson));
    }
    return lessons;
  }

  async loadLessonById(id: number) {
    let foudLesson = await this.lessonRepository.getById(id);
    if (!foudLesson) {
      return null;
    }
    return await this.loadTopicsLesson(LessonMapper.toModel(foudLesson));
  }

  private async loadTopicsLesson(lesson: Lesson): Promise<Lesson> {
    let topics = await this.topicService.loadTopicsByLessonId(lesson.id!);
    return {
      id: lesson.id,
      name: lesson.name,
      topics: topics?.length ? topics : [],
      book_id: lesson.book_id,
    };
  }
}
