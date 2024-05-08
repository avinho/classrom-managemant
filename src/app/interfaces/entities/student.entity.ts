export interface StudentEntity {
  id?: number;
  name: string;
  birthdate: string;
  class_id: number | null;
  current_book_id: number | null;
}
