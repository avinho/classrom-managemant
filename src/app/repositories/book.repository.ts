import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { BookEntity } from '../interfaces/entities/book.entity';

@Injectable({
  providedIn: 'root',
})
export class BookRepository extends Repository<BookEntity> {
  get tableName(): string {
    return 'Book';
  }

  mapToDbFields(entity: BookEntity): any {
    return entity;
  }
}
