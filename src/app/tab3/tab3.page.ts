import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonNote,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
  IonicSlides,
} from '@ionic/angular/standalone';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ScrollingModule,
    IonListHeader,
    IonToggle,
    IonNote,
    IonItem,
    IonButton,
    IonIcon,
    IonList,
    IonLabel,
    IonSegmentButton,
    IonSegment,
    IonItemDivider,
    IonCard,
    IonCardContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSelect,
    IonSelectOption,
    CommonModule,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
  ],
})
export class Tab3Page implements OnInit {
  swiperModules = [IonicSlides];
  books?: Book[];
  students?: Student[];
  selectedBook?: Book;
  selectedStudent?: Student;

  $book: any;
  $students: any;

  constructor(private dbService: StorageService) {
    this.loadBooks().then(() => {
      console.log('books loaded from DB:', this.books);
    });
    this.loadStudents().then(() => {
      console.log('students loaded from DB:', this.students);
      this.selectedStudent = this.students![0];
      this.selectedBook = this.selectedStudent?.currentBook;
      console.log('Current student:', this.selectedStudent);
    });
  }

  ngOnInit() {
    return;
  }

  async loadBooks() {
    this.books = await this.dbService.loadBooks();
  }

  async loadStudents() {
    this.students = await this.dbService.loadStudents();
  }

  addBookForStudent() {
    this.students?.forEach((student) => {
      student.currentBook =
        this.books![Math.floor(Math.random() * this.books!.length)];
    });
  }

  converteDate(date: string) {
    return new Date(date).toISOString();
  }

  onSlideChange(data: any) {
    const activeIndex = data.detail[0].activeIndex;
    if (activeIndex >= 0 && activeIndex < this.students!.length) {
      this.selectedStudent = this.students![activeIndex];
      this.selectedBook = this.selectedStudent.currentBook;
      console.log('Selected student:', this.selectedStudent);
      console.log('Selected book:', this.selectedBook);
    } else {
      console.warn('Invalid slide index:', activeIndex);
    }
  }

  onBookChange(book: Book) {
    this.selectedBook = book;
    this.selectedStudent!.currentBook = book;
    this.dbService.set('students', this.students);
    console.log(this.selectedStudent!.currentBook);
  }

  onTopicChange(topic: Topic) {
    topic.done = !topic.done;
    topic.done
      ? (topic.conclusion = new Date().toISOString())
      : (topic.conclusion = null);
    this.dbService.set('students', this.students);
    console.log(topic);
  }

  onDateChange(topic: Topic, date: any) {
    topic.conclusion = date;
    this.dbService.set('students', this.students);
    console.log(topic);
  }

  compareWith(o1: Book, o2: Book) {
    return o1 && o2 ? o1.name === o2.name : o1 === o2;
  }
}

export interface Book {
  name: string;
  lessons?: Lesson[];
}

interface Lesson {
  name: string;
  topics: Topic[];
}

interface Topic {
  name: string;
  done: boolean;
  conclusion: null | string;
}

export interface Student {
  name: string;
  age: string;
  class: string;
  currentBook: Book;
}
