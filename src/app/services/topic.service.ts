import { Injectable, inject } from '@angular/core';
import { Topic } from '../models';
import { TopicRepository } from '../repositories/topic.repository';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private readonly topicRepository = inject(TopicRepository);

  constructor() {}

  async save(topic: Topic) {
    if (topic.id) {
      return await this.topicRepository.update(topic.id, topic);
    } else {
      return await this.topicRepository.add(topic);
    }
  }

  async delete(id: number) {
    return await this.topicRepository.remove(id);
  }

  async exists(id: number) {
    return await this.topicRepository.exists(id);
  }

  async loadTopicById(id: number) {
    const topic = await this.topicRepository.getById(id);
    return topic ? topic : null;
  }

  async loadTopics() {
    return await this.topicRepository.getAll();
  }

  async loadTopicsByLessonId(id: number) {
    return await this.topicRepository.getTopicsByLessonId(id);
  }
}
