import { Injectable } from '@angular/core';
import { Book } from 'src/app/models';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root',
})
export class BookRepository extends Repository<Book> {
  get tableName(): string {
    return 'Book';
  }

  mapToDbFields(entity: Book): any {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}
