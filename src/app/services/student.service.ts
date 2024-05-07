import { StudentTopicService } from './student-topic.service';
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
  private readonly studentTopicService = inject(StudentTopicService);

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
    for (const student of foundStudents) {
      foundStudents[foundStudents.indexOf(student)] =
        await this.loadStudentBookAndClass(student);
    }
    return foundStudents;
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
    for (const student of foundStudents) {
      foundStudents[foundStudents.indexOf(student)] =
        await this.loadStudentBookAndClass(student);
    }
    return foundStudents;
  }

  async loadStudentBookProgress(student: Student) {
    student.currentBook?.lessons?.forEach((lesson) => {
      lesson.topics?.forEach(async (topic) => {
        let studentTopics =
          await this.studentTopicService.loadTopicsByStudentId(student.id!);
        studentTopics.forEach((_topic) => {
          if (topic.id == _topic.id) {
            topic.done = _topic.done == 1 ? true : false;
            topic.conclusion = _topic.conclusion;
          }
        });
      });
    });

    return student.currentBook;
  }

  private async loadStudentBookAndClass(student: Student): Promise<Student> {
    const [studentBook, studentClass, studentTopics] = await Promise.all([
      this.bookService.loadBookById(student.current_book_id!),
      this.classService.loadClassById(student.class_id!),
      this.studentTopicService.loadTopicsByStudentId(student.id!),
    ]);

    const topicMap = new Map(studentTopics.map((topic) => [topic.id, topic]));

    studentBook?.lessons?.forEach((lesson) => {
      lesson.topics?.forEach((topic) => {
        const _topic = topicMap.get(topic.id);
        if (_topic) {
          topic.done = _topic.done == 1 ? true : false;
          topic.conclusion = _topic.conclusion;
        }
      });
    });

    return {
      id: student.id,
      name: student.name,
      birthdate: student.birthdate,
      class: studentClass,
      currentBook: studentBook,
    };
  }
}
