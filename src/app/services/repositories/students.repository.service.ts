import { Injectable, inject } from '@angular/core';
import { StorageService } from '../storage.service';
import { Student } from 'src/app/models';
import { BookRepository } from './book.repository.service';
import { ClassesRepository } from './classes.repository.service';

@Injectable({
  providedIn: 'root',
})
export class StudentsRepository {
  private db = inject(StorageService).retrieveDb();
  private classRepository = inject(ClassesRepository);
  private bookRepository = inject(BookRepository);
  constructor() {}

  async getStudents() {
    let result = (await this.db.query('SELECT * FROM Student;')).values;
    let students: Student[] = [];

    result?.forEach(async (data) => {
      let student: Student = {
        id: data.id,
        name: data.name,
        birthdate: data.birthdate,
        class: await this.classRepository.loadClassById(data.class_id),
        currentBook: await this.bookRepository.loadBookById(
          data.current_book_id
        ),
      };
      students.push(student);
      return student;
    });
    return students;
  }

  async addStudent(student: Student) {
    try {
      const sql = `
      INSERT INTO Student (name, birthdate, class_id, current_book_id)
      VALUES (?, ?, ?, ?);
      `;
      const result = await this.db.run(sql, [
        student.name,
        student.birthdate,
        student.class?.id,
        student.currentBook?.id,
      ]);

      if (result.changes) {
        const insertedStudentId = result.changes?.lastId!;
        const insertedStudent = await this.loadStudentById(insertedStudentId);
        return insertedStudent;
      }
      return null;
    } catch (error: any) {
      return Error(error.message);
    }
  }

  async deleteStudentById(id: number) {
    try {
      const sql = `DELETE FROM Student WHERE id = ?;`;
      await this.db.run(sql, [id]);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async updateStudentById(id: number, student: Student) {
    try {
      const sql = `UPDATE Student SET (name, birthdate, class_id, current_book_id) = (?, ?, ?, ?) WHERE id = ?;`;
      const result = await this.db.run(sql, [
        student.name,
        student.birthdate,
        student.class?.id,
        student.currentBook?.id,
        id,
      ]);

      if (result.changes) {
        const updatedStudentId = result.changes.lastId!;
        const updatedStudent = await this.loadStudentById(updatedStudentId);
        return updatedStudent;
      }
      return null;
    } catch (error: any) {
      return Error(error.message);
    }
  }

  async loadStudentById(id: number) {
    const result = (await this.db.query(`SELECT * FROM Student WHERE id=${id}`))
      .values?.[0];

    let student: Student = {
      id: result.id,
      name: result.name,
      birthdate: result.birthdate,
      class: await this.classRepository.loadClassById(result.class_id),
      currentBook: await this.bookRepository.loadBookById(
        result.current_book_id
      ),
    };
    return result ? student : null;
  }
}
