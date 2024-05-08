import { Class } from '../models/class.model';
import { ClassEntity } from '../entities/class.entity';

export class ClassMapper {
  static toModel({ id, name }: ClassEntity): Class {
    return {
      id,
      name,
      students: [],
    };
  }
  static toEntity({ id, name }: Class): ClassEntity {
    return {
      id,
      name,
    };
  }
}
