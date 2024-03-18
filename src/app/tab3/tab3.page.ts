import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
} from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
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
    IonSelect,
    IonSelectOption,
    HttpClientModule,
    CommonModule,
  ],
})
export class Tab3Page implements AfterViewInit {
  swiperModules = [IonicSlides];
  selectedBook!: Book;
  selectedStudent!: Student;
  index = 0;

  books: any = [];
  students: any = [];

  constructor(private http: HttpClient) {
    this.http.get<Book>('assets/books.json').subscribe((data) => {
      this.books = data;
    });
    this.http.get<Student>('assets/students.json').subscribe((data) => {
      this.students = data;
      this.selectedStudent = this.students[0];
      console.log(this.selectedStudent);
    });
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  onSlideChange(data: any) {
    this.selectedStudent = this.students[data.detail[0].activeIndex];
    console.log(this.selectedStudent);
  }

  onChange(data: any) {
    this.selectedStudent = data;
    console.log(this.selectedStudent);
  }

  onBookChange(book: Book) {
    this.selectedBook = book;
  }

  onTopicChange(topic: Topic) {
    topic.done = !topic.done;
    topic.done
      ? (topic.conclusion = new Date().toISOString())
      : (topic.conclusion = null);
    console.log(topic);
  }
}

interface Book {
  book: string;
  lessons: Lesson[];
}

interface Lesson {
  lesson: string;
  topics: Topic[];
}

interface Topic {
  topic: string;
  done: boolean;
  conclusion: null | string;
}

interface Student {
  name: string;
  age: number;
  class: string;
  currentBook: Book;
}
