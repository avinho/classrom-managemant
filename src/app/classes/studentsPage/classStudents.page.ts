import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  IonPopover,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
  IonicSlides,
} from '@ionic/angular/standalone';
import { Book, Class, Lesson, Student, Topic } from '../../models';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-class-students',
  templateUrl: 'classStudents.page.html',
  styleUrls: ['classStudents.page.scss'],
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
    IonPopover,
  ],
})
export class ClassStudentsPage implements OnInit {
  swiperModules = [IonicSlides];
  @Input() books?: Book[];
  @Input() students?: Student[];
  @Input() class?: Class;
  selectedBook?: Book;
  selectedStudent?: Student;
  @Output() closeModal = new EventEmitter(false);
  @Output() deleteClass = new EventEmitter(false);

  $students?: Student[];

  constructor(private dbService: StorageService) {
    this.loadStudents();
  }

  ngOnInit() {
    this.selectedStudent = this.students![0];
    console.log('Current student:', this.selectedStudent);
    this.selectedBook = this.selectedStudent?.currentBook;
    /*     this.loadBooks().then(() => {
      console.log('books loaded from DB:', this.books);
    }); */
  }

  onAddStudents(e: Student[]) {
    e.forEach((value) => {
      value.class = this.class!;
      this.students?.push(value);
      this.selectedStudent = this.students![0];
    });
  }

  onDeleteClass(data: Class) {
    this.deleteClass.emit(data);
    this.onCloseModal();
  }

  async loadBooks() {
    this.books = await this.dbService.loadBooks();
  }

  async loadStudents() {
    this.$students = await this.dbService.loadStudents();
  }

  addBookForStudent() {
    this.students?.forEach((student) => {
      student.currentBook =
        this.books![Math.floor(Math.random() * this.books!.length)];
    });
  }

  onCloseModal() {
    this.closeModal.emit(false);
  }

  converteDate(date: any) {
    return new Date(date!).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
  }

  onTopicChange(topic: Topic, event: any) {
    topic.done = event;
    topic.done
      ? (topic.conclusion = new Date().toISOString())
      : (topic.conclusion = null);
    this.dbService.set('students', this.students);
    console.log(topic);
  }

  doneLesson(lesson: Lesson, event: any) {
    lesson.topics.forEach((topic) => {
      if (!topic.done) {
        return this.onTopicChange(topic, event);
      }
      return this.onTopicChange(topic, event);
    });
  }

  isLessonDone(topics: Topic[]) {
    return topics.every((topic) => topic.done);
  }

  onDateChange(topic: Topic, date: any) {
    topic.done = true;
    topic.conclusion = date;
    this.dbService.set('students', this.students);
  }

  compareWith(o1: Book, o2: Book) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
