import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EnvironmentInjector,
  inject,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StorageService } from './database/storage.service';
import { Lesson, Topic } from './models';
import { BookService } from './services/book.service';
import { ClassService } from './services/class.service';
import { LessonService } from './services/lesson.service';
import { StudentService } from './services/student.service';
import { TopicService } from './services/topic.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);
  private lessonService = inject(LessonService);
  private classService = inject(ClassService);
  private studentService = inject(StudentService);
  private bookService = inject(BookService);
  private topicService = inject(TopicService);

  private db = inject(StorageService).retrieveDb();
  constructor() {
    this.init();
  }

  async init() {
    const student = await this.studentService.loadStudentById(1);
    console.log(student);
  }
}
