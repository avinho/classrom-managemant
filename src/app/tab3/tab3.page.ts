import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
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
import { first } from 'rxjs';
import { StorageServiceService } from '../storage-service.service';

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
export class Tab3Page implements OnInit {
  swiperModules = [IonicSlides];
  books: Book[] = [];
  students: Student[] = [];
  selectedBook?: Book;
  selectedStudent?: Student;

  test: any;

  constructor(
    private http: HttpClient,
    private dbService: StorageServiceService
  ) {}

  ngOnInit(): void {
    this.http
      .get<Book[]>('assets/books.json')
      .pipe(first())
      .subscribe((books: Book[]) => {
        this.books = books;
        this.dbService.set('books', this.books);
        this.dbService.get('books').then((x) => console.log(x));
      });

    this.http
      .get<Student[]>('assets/students.json')
      .pipe(first())
      .subscribe((students: Student[]) => {
        this.students = students;
        this.dbService.set('students', this.students);
        this.dbService.get('students').then((x) => console.log(x));
        //this.addBookForStudent();
        this.selectedStudent = this.students[0];
        this.selectedStudent!.currentBook = this.books[0];
        this.selectedBook = this.selectedStudent?.currentBook;
        console.log('students loaded: ', this.students);
        console.log('selected student: ', this.selectedStudent);
        console.log('selected book: ', this.selectedBook);
      });
  }

  addBookForStudent() {
    this.students.forEach((student) => {
      student.currentBook =
        this.books[Math.floor(Math.random() * this.books.length)];
    });
  }

  onSlideChange(data: any) {
    const activeIndex = data.detail[0].activeIndex;
    if (activeIndex >= 0 && activeIndex < this.students.length) {
      this.selectedStudent = this.students[activeIndex];
      this.selectedBook = this.selectedStudent?.currentBook;
      console.log('Selected student:', this.selectedStudent);
    } else {
      console.warn('Invalid slide index:', activeIndex);
    }
  }

  onBookChange(book: Book) {
    this.selectedBook = book;
    this.selectedStudent!.currentBook = book;
    this.dbService.set('students', this.students);
    console.log('Selected book:', this.dbService.get('students'));
    console.log(this.selectedStudent!.currentBook);
  }

  onTopicChange(topic: Topic) {
    topic.done = !topic.done;
    topic.done
      ? (topic.conclusion = new Date().toISOString())
      : (topic.conclusion = null);
    //this.dbService.set('students', this.students)

    this.dbService.get('students').then((x) => console.log(x));

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
  age: string;
  class: string;
  currentBook: Book;
}
