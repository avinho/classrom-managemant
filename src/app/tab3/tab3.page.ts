import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
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
} from '@ionic/angular/standalone';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScrollContent,
    ScrollingModule,
    IonInfiniteScroll,
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
export class Tab3Page {
  selectedBook!: Book;
  selectedStudent!: Student;

  books: any = [];
  students: any = [];

  constructor(private http: HttpClient) {
    this.http.get<Book>('assets/books.json').subscribe((data) => {
      this.books = data;
    });
    this.http.get<Student>('assets/students.json').subscribe((data) => {
      this.students = data;
    });
  }

  onBookChange(book: Book) {
    this.selectedBook = book;
    console.log(this.selectedBook);
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
