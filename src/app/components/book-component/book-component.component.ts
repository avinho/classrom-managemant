import { LessonRepository } from './../../services/repositories/lesson.repository.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  WritableSignal,
  computed,
  effect,
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
import { StorageService } from 'src/app/services/_storagee.service';
import { Lesson, Topic } from './../../models';
import { BookRepository } from 'src/app/services/repositories/book.repository.service';
import { TopicRepository } from 'src/app/services/repositories/topic.repository.service';
import { ITopic } from 'src/app/services/repositories/Interfaces';
import { TestBed } from '@angular/core/testing';

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
export class BookComponentComponent implements OnInit {
  private readonly bookRepository = inject(BookRepository);
  private readonly lessonRepository = inject(LessonRepository);
  private readonly topicRepository = inject(TopicRepository);
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
      await this.bookRepository.loadLessonsByBookId(this.book().id)
    );
  }

  async addLesson(book: Book) {
    let newLesson: Lesson = {
      name: 'New Lesson',
      topics: [],
      book: book,
    };

    await this.lessonRepository.add(newLesson);
    await this.loadLessons();
  }

  onEditTopic(topic: Topic, value: any) {
    topic.name = value;
    this.bookRepository.updateBookById(this.book().id, this.book().name);
  }

  onEditLesson(lesson: Lesson, value: any) {
    lesson.name = value;
    this.bookRepository.updateBookById(this.book().id, this.book().name);
  }

  async addTopic(lesson: Lesson) {
    let newTopic: Topic = {
      name: 'New Topic',
      lesson_id: lesson.id,
    };
    await this.topicRepository.add(newTopic);
    lesson.topics = await this.topicRepository.getTopicsByLessonId(lesson.id!);
  }
}
