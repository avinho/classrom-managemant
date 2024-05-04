import { Injectable, inject } from '@angular/core';
import { StudentsRepository } from '../repositories/students.repository';
import { BookService } from './book.service';
import { ClassService } from './class.service';
import { Student } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly studentRepository = inject(StudentsRepository);
  private readonly bookService = inject(BookService);
  private readonly classService = inject(ClassService);

  async save(student: Student) {
    if (student.id) {
      await this.studentRepository.update(student.id, student);
    } else {
      await this.studentRepository.add(student);
    }
  }

  async delete(student: Student) {
    await this.studentRepository.remove(student.id!);
  }

  async exists(id: number) {
    return await this.studentRepository.exists(id);
  }

  async loadStudents() {
    const foundStudents = await this.studentRepository.getAll();
    let students: Student[] = [];
    foundStudents.forEach(async (student) => {
      students.push(await this.loadStudentBookAndClass(student));
    });
    return students;
  }

  async loadStudentById(id: number) {
    let foundStudent = await this.studentRepository.getById(id);
    if (!foundStudent) {
      return null;
    }
    return await this.loadStudentBookAndClass(foundStudent);
  }

  async loadStudentsByClassId(id: number) {
    const foundStudents = await this.studentRepository.getStudentsByClassId(id);
    let students: Student[] = [];
    foundStudents.forEach(async (student) => {
      students.push(await this.loadStudentBookAndClass(student));
    });
    return students;
  }

  private async loadStudentBookAndClass(student: Student): Promise<Student> {
    let studentBook = await this.bookService.loadBookById(
      student.current_book_id!
    );
    let studentClass = await this.classService.loadClassById(student.class_id!);
    return {
      id: student.id,
      name: student.name,
      birthdate: student.birthdate,
      class: studentClass,
      currentBook: studentBook,
    };
  }
}
