import { Topic } from '../models/topic.model';
import { TopicEntity } from '../entities/topic.entity';

export class LessonMapper {
  static toModel({
    id,
    name,
    done,
    conclusion,
    lesson_id,
  }: TopicEntity): Topic {
    return {
      id,
      name,
      done: done == 1 ? true : false,
      conclusion,
      lesson_id,
    };
  }
  static toEntity({
    id,
    name,
    done,
    conclusion,
    lesson_id,
  }: Topic): TopicEntity {
    return {
      id,
      name,
      done: done ? 1 : 0,
      conclusion,
      lesson_id: lesson_id!,
    };
  }
}
