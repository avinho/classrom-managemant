import { Injectable } from '@angular/core';
import { Class } from 'src/app/models';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root',
})
export class ClassesRepository extends Repository<Class> {
  get tableName(): string {
    return 'Class';
  }

  mapToDbFields(entity: Class) {
    return {
      id: entity.id,
      name: entity.name,
    };
  }

  async loadClassById(id: number) {
    const result: Class = (
      await this.db.query(`SELECT * FROM Class WHERE id=${id}`)
    ).values?.[0];

    return result ? result : null;
  }
}
