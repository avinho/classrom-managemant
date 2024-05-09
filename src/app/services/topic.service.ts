import { Injectable, inject } from '@angular/core';
import { Topic } from '../interfaces/models/topic.model';
import { TopicRepository } from '../repositories/topic.repository';
import { TopicMapper } from '../mappers/topicMapper';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private readonly topicRepository = inject(TopicRepository);

  async save(source: Topic) {
    const topic = TopicMapper.toEntity(source);
    if (topic.id) {
      return await this.topicRepository.update(topic.id, topic);
    } else {
      return await this.topicRepository.add(topic);
    }
  }

  async delete(topicId: number) {
    return await this.topicRepository.remove(topicId);
  }

  async exists(topicId: number) {
    return await this.topicRepository.exists(topicId);
  }

  async loadTopicById(topicId: number) {
    const topic = await this.topicRepository.getById(topicId);
    return topic ? TopicMapper.toModel(topic) : null;
  }

  async loadTopics() {
    return (await this.topicRepository.getAll()).map(TopicMapper.toModel);
  }

  async loadTopicsByLessonId(lessonId: number) {
    return (await this.topicRepository.getTopicsByLessonId(lessonId)).map(
      TopicMapper.toModel
    );
  }
}
