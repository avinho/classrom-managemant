import { Injectable, inject } from '@angular/core';
import { Class } from 'src/app/models';
import { StorageService } from '../database/storage.service';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root',
})
export class ClassesRepository extends Repository<Class> {
  private _db = inject(StorageService).retrieveDb();

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
      await this._db.query(`SELECT * FROM Class WHERE id=${id}`)
    ).values?.[0];

    return result ? result : null;
  }
}
