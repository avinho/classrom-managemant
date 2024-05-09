import { Injectable } from '@angular/core';
import { ClassEntity } from './../interfaces/entities/class.entity';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root',
})
export class ClassesRepository extends Repository<ClassEntity> {
  get tableName(): string {
    return 'Class';
  }

  mapToDbFields(entity: ClassEntity) {
    return entity;
  }
}
