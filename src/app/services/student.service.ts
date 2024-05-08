import { StudentTopicService } from './student-topic.service';
import { Injectable, inject } from '@angular/core';
import { StudentsRepository } from '../repositories/students.repository';
import { BookService } from './book.service';
import { ClassService } from './class.service';
import { Student } from '../interfaces/models/student.model';
import { StudentMapper } from '../interfaces/mappers/studentMapper';
import { StudentEntity } from '../interfaces/entities/student.entity';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly studentRepository = inject(StudentsRepository);
  private readonly bookService = inject(BookService);
  private readonly classService = inject(ClassService);
  private readonly studentTopicService = inject(StudentTopicService);

  async save(student: Student) {
    const std = StudentMapper.toEntity(student);
    if (std.id) {
      await this.studentRepository.update(std.id, std);
    } else {
      await this.studentRepository.add(std);
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
    for (const student of foundStudents) {
      students.push(await this.loadStudentBookAndClass(student));
    }
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
    let students: Student[] = [];
    const foundStudents = await this.studentRepository.getStudentsByClassId(id);
    for (const student of foundStudents) {
      students.push(await this.loadStudentBookAndClass(student));
    }
    return students;
  }

  async loadStudentBookProgress(student: Student) {
    const studentTopics = await this.studentTopicService.loadTopicsByStudentId(
      student.id!
    );
    const topicMap = new Map(studentTopics.map((topic) => [topic.id, topic]));
    student.currentBook?.lessons?.forEach((lesson) => {
      lesson.topics?.forEach((topic) => {
        const _topic = topicMap.get(topic.id);
        if (_topic) {
          topic.done = _topic.done == 1 ? true : false;
          topic.conclusion = _topic.conclusion;
        }
      });
    });
    return student.currentBook;
  }

  private async loadStudentBookAndClass(
    student: StudentEntity
  ): Promise<Student> {
    const [studentBook, studentTopics, studentClass] = await Promise.all([
      this.bookService.loadBookById(student.current_book_id!),
      this.studentTopicService.loadTopicsByStudentId(student.id!),
      this.classService.loadClassById(student.class_id!),
    ]);

    const std = StudentMapper.toModel(student);
    std.currentClass = studentClass;
    console.log(std);
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
    std.currentBook = studentBook;
    return std;
  }
}
