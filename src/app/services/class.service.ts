import { Injectable, inject } from '@angular/core';
import { ClassesRepository } from '../repositories/classes.repository';
import { ClassMapper } from '../mappers/classMapper';
import { Class } from '../interfaces/models/class.model';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private readonly classRepository = inject(ClassesRepository);

  async save(source: Class) {
    const cls = ClassMapper.toEntity(source);
    if (cls.id) {
      await this.classRepository.update(cls.id, cls);
    } else {
      await this.classRepository.add(cls);
    }
  }

  async delete(classId: number) {
    await this.classRepository.remove(classId);
  }

  async exists(id: number) {
    return await this.classRepository.exists(id);
  }

  async loadClasses() {
    return (await this.classRepository.getAll()).map(ClassMapper.toModel);
  }

  async loadClassById(id: number) {
    let foundClass = await this.classRepository.getById(id);
    if (!foundClass) {
      return null;
    }
    return ClassMapper.toModel(foundClass);
  }
}
