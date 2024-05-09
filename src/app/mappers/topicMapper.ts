import { TopicEntity } from '../interfaces/entities/topic.entity';
import { Topic } from '../interfaces/models/topic.model';

export class TopicMapper {
  static toModel({ id, name, lesson_id }: TopicEntity): Topic {
    return {
      id,
      name,
      done: false,
      conclusion: null,
      lesson_id,
    };
  }
  static toEntity({ id, name, lesson_id }: Topic): TopicEntity {
    return {
      id,
      name,
      lesson_id: lesson_id!,
    };
  }
}
