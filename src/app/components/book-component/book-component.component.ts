import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Book } from 'src/app/models';
import { BookRepository } from 'src/app/repositories/book.repository';
import { TopicRepository } from 'src/app/repositories/topic.repository';
import { Lesson, Topic } from './../../models';
import { LessonRepository } from '../../repositories/lesson.repository';
import { TopicService } from 'src/app/services/topic.service';
import { BookService } from 'src/app/services/book.service';
import { StudentService } from 'src/app/services/student.service';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-book-component',
  templateUrl: './book-component.component.html',
  styleUrls: ['./book-component.component.scss'],
  standalone: true,
  imports: [
    IonCardTitle,
    IonInput,
    IonLabel,
    IonItem,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonList,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonHeader,
    IonContent,
    IonButton,
    IonButtons,
    IonPopover,
    CommonModule,
  ],
})
export class BookComponent implements OnInit {
  private readonly lessonService = inject(LessonService);
  private readonly bookService = inject(BookService);
  private readonly topicService = inject(TopicService);
  closeModal = output<boolean>();
  deleteBook = output<Book>();
  book = input.required<Book>();
  lessons: WritableSignal<Lesson[]> = signal([]);
  edit: boolean = true;

  constructor() {}

  async ngOnInit() {
    await this.loadLessons();
  }

  onCloseModal() {
    this.closeModal.emit(false);
  }

  async loadLessons() {
    this.lessons.set(
      await this.lessonService.loadLessonsByBookId(this.book().id!)
    );
  }

  async addLesson(book: Book) {
    let newLesson: Lesson = {
      name: 'New Lesson',
      topics: [],
      book: book,
    };

    await this.lessonService.save(newLesson);
    await this.loadLessons();
  }

  onEditTopic(topic: Topic, value: any) {
    topic.name = value;
    this.topicService.save(topic);
  }

  onEditLesson(lesson: Lesson, value: any) {
    lesson.name = value;
    this.lessonService.save(lesson);
  }

  async addTopic(lesson: Lesson) {
    let newTopic: Topic = {
      name: 'New Topic',
      lesson_id: lesson.id,
    };
    await this.topicService.save(newTopic);
    lesson.topics = (await this.topicService.loadTopicsByLessonId(
      lesson.id!
    )) as Topic[];
  }
}
