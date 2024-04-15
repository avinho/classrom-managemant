import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonDatetime,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
} from '@ionic/angular/standalone';
import { Book, Lesson, Student, Topic } from '../../models';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent,
    IonDatetime /*  */,
    IonPopover,
    IonButton,
    IonToggle,
    IonAccordion,
    IonTitle,
    IonAccordionGroup,
    IonBadge,
    IonLabel,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonList,
    IonCardContent,
    IonItem,
    IonCard,
    ScrollingModule,
    CommonModule,
  ],
})
export class StudentProfileComponent implements OnInit {
  @Input() student!: Student;
  books?: Book[];
  selectedBook?: Book;
  selectedStudent?: Student;

  constructor(private dbService: StorageService) {}
  ngOnInit(): void {
    this.loadBooks();
  }

  async loadBooks() {
    this.books = await this.dbService.loadBooks();
  }

  async onBookChange(book: Book) {
    this.selectedBook = book;
    this.student.currentBook = book;
    await this.dbService.updateStudent(this.student);
  }

  isLessonDone(topics: Topic[]) {
    return topics.every((topic) => topic.done);
  }

  async onTopicChange(topic: Topic, event: any, teste?: any) {
    topic.done = event;
    topic.done
      ? (topic.conclusion = new Date().toISOString())
      : (topic.conclusion = null);
    await this.dbService.updateStudent(this.student);
  }

  doneLesson(lesson: Lesson, event: any) {
    lesson.topics.forEach((topic) => {
      if (!topic.done) {
        return this.onTopicChange(topic, event);
      }
      return this.onTopicChange(topic, event);
    });
  }

  async onDateChange(topic: Topic, date: any) {
    topic.done = true;
    topic.conclusion = date;
    //await this.dbService.set('students', this.AllStudents);
  }

  converteDate(date: any) {
    return new Date(date!).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  compareWith(o1: Book, o2: Book) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
