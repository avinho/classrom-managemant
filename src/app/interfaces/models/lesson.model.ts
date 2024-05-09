import { Topic } from './topic.model';

export interface Lesson {
  id?: number;
  name: string;
  topics: Topic[];
  book_id?: number;
}
