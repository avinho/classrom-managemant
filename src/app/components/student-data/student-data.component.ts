import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ViewChild,
  inject,
  input,
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
  IonInput,
  IonToggle,
} from '@ionic/angular/standalone';
import { Book, Class, Lesson, Student, Topic } from '../../models';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent,
    IonDatetime,
    IonPopover,
    IonButton,
    IonToggle,
    IonAccordion,
    IonTitle,
    IonAccordionGroup,
    IonBadge,
    IonLabel,
    IonIcon,
    IonInput,
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
export class StudentDataComponent implements OnInit {
  private readonly dbService = inject(StorageService);
  student = input.required<Student>();
  books?: Book[];
  classes?: Class[];
  selectedBook?: Book;
  edit: boolean = true;

  constructor() {}
  ngOnInit(): void {
    this.loadBooks();
    this.loadClasses();
  }

  editStudentName(name: any) {
    this.student().name = name;
    this.dbService.updateStudent(this.student());
  }

  editStudentClass(newClass: Class) {
    this.student().class = newClass;
    this.dbService.updateStudent(this.student());
  }

  async loadBooks() {
    this.books = await this.dbService.loadBooks();
  }

  async loadClasses() {
    this.classes = await this.dbService.loadClasses();
  }

  async onBookChange(book: Book) {
    this.selectedBook = book;
    this.student().currentBook = book;
    await this.dbService.updateStudent(this.student());
  }

  isLessonDone(topics: Topic[]) {
    return topics.every((topic) => topic.done);
  }

  async onTopicChange(topic: Topic, event: boolean) {
    topic.done = event;
    topic.done
      ? (topic.conclusion = new Date().toISOString())
      : (topic.conclusion = null);
    await this.dbService.updateStudent(this.student());
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
    await this.onTopicChange(topic, true);
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

  compareWithClasses(o1: Class, o2: Class) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
