import { Class } from '../interfaces/models/class.model';
import { ClassEntity } from '../interfaces/entities/class.entity';

export class ClassMapper {
  static toModel({ id, name }: ClassEntity): Class {
    return {
      id,
      name,
    };
  }
  static toEntity({ id, name }: Class): ClassEntity {
    return {
      id,
      name,
    };
  }
}
