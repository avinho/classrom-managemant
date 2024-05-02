import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { BookRepository } from 'src/app/services/repositories/book.repository.service';
import { Lesson, Topic } from './models';
import { ClassesRepository } from './services/repositories/classes.repository.service';
import { LessonRepository } from './services/repositories/lesson.repository.service';
import { StudentsRepository } from './services/repositories/students.repository.service';
import { TopicRepository } from './services/repositories/topic.repository.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonApp, IonRouterOutlet, CommonModule],
})
export class AppComponent {
  private bookRepository = inject(BookRepository);
  private studentsRepository = inject(StudentsRepository);
  private classRepository = inject(ClassesRepository);
  private lessonRepository = inject(LessonRepository);
  private topicRepository = inject(TopicRepository);
  private db = inject(StorageService).retrieveDb();
  constructor() {
    this.init();
  }

  async init() {
    console.log(await this.db.exportToJson('full', false));
    let lesson: Lesson = {
      name: 'Teste',
      topics: [],
      book: await this.bookRepository.loadBookById(1),
    };
    let topic: Topic = {
      name: 'Teste',
      lesson_id: lesson.id,
    };
    console.log(await this.lessonRepository.add(lesson));
    console.log(await this.topicRepository.add(topic));
  }
}
