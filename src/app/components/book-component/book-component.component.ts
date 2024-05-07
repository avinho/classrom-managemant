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
import { BookService } from 'src/app/services/book.service';
import { LessonService } from 'src/app/services/lesson.service';
import { TopicService } from 'src/app/services/topic.service';
import { Lesson, Topic } from './../../models';

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
    console.log(this.lessons());
  }

  async addLesson(book: Book) {
    let newLesson: Lesson = {
      name: 'New Lesson',
      topics: [],
      book_id: book.id,
    };

    await this.lessonService.save(newLesson);
    await this.loadLessons();
  }

  async onEditTopic(topic: Topic, value: any) {
    let editTopic = {
      ...topic,
      name: value as string,
    };
    await this.topicService.save(editTopic);
    await this.loadLessons();
  }

  async onEditLesson(lesson: Lesson, value: any) {
    let editLesson = {
      ...lesson,
      name: value as string,
    };
    await this.lessonService.save(editLesson);
    await this.loadLessons();
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

  async deleteTopic(topicId: number) {
    await this.topicService.delete(topicId);
    await this.loadLessons();
  }

  async deleteLesson(lesosnId: Lesson) {
    console.log(lesosnId);
    await this.lessonService.delete(lesosnId.id!);
    await this.loadLessons();
  }
}
