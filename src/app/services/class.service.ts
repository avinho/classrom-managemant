import { Injectable, inject } from '@angular/core';
import { ClassesRepository } from '../repositories/classes.repository';
import { Class } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private readonly classRepository = inject(ClassesRepository);

  async save(_class: Class) {
    if (_class.id) {
      await this.classRepository.update(_class.id, _class);
    } else {
      await this.classRepository.add(_class);
    }
  }

  async delete(_class: Class) {
    await this.classRepository.remove(_class.id!);
  }

  async exists(id: number) {
    return await this.classRepository.exists(id);
  }

  async loadClasses() {
    return await this.classRepository.getAll();
  }

  async loadClassById(id: number) {
    let foundClass = await this.classRepository.loadClassById(id);
    if (!foundClass) {
      return null;
    }
    return foundClass;
  }
}
