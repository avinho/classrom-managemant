import { Injectable, inject } from '@angular/core';
import { Class, Student } from 'src/app/models';
import { StorageService } from '../storage.service';
import { BookRepository } from './book.repository.service';

@Injectable({
  providedIn: 'root',
})
export class ClassesRepository {
  private db = inject(StorageService).retrieveDb();
  private bookRepository = inject(BookRepository);
  constructor() {}

  async getClasses() {
    return (await this.db.query('SELECT * FROM Class;')).values as Class[];
  }

  async getStudentsByClassId(id: number) {
    const sql = `SELECT * FROM Student WHERE class_id = ${id};`;
    const result = (await this.db.query(sql)).values;
    let students: Student[] = [];

    result?.forEach(async (data) => {
      let student: Student = {
        id: data.id,
        name: data.name,
        birthdate: data.birthdate,
        class: await this.loadClassById(data.class_id),
        currentBook: await this.bookRepository.loadBookById(
          data.current_book_id
        ),
      };
      students.push(student);
      return student;
    });
    return students;
  }

  async addClass(name: string) {
    try {
      const sql = `INSERT INTO Class (name) VALUES (?);`;
      const result = await this.db.run(sql, [name]);
      if (result.changes) {
        const insertedClassId = result.changes.lastId!;
        const insertedClass = await this.loadClassById(insertedClassId);
        return insertedClass!;
      }
      throw new Error('Não foi possível adicionar a turma');
    } catch (error: any) {
      return Error(error.message);
    }
  }

  async deleteClassById(id: number) {
    try {
      const sql = `DELETE FROM Class WHERE id = ?;`;
      await this.db.run(sql, [id]);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async updateClassById(id: number, name: string) {
    try {
      const sql = `UPDATE Class SET name = ? WHERE id = ?;`;
      await this.db.run(sql, [name, id]);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async loadClassById(id: number) {
    const result: Class = (
      await this.db.query(`SELECT * FROM Class WHERE id=${id}`)
    ).values?.[0];

    return result ? result : null;
  }
}
