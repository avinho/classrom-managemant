export interface Topic {
  id?: number;
  name: string;
  done: boolean;
  conclusion: string | null;
  lesson_id?: number;
}
