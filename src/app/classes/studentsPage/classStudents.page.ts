import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
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
  books?: Book[];
  students?: Student[];
  @Input() class?: Class;
  selectedBook?: Book;
  selectedStudent?: Student;
  @Output() closeModal = new EventEmitter(false);
  @Output() deleteClass = new EventEmitter(false);
  @ViewChild('mySelect', { static: false }) selectRef?: IonSelect;

  $students?: Student[];

  AllStudents?: Student[];

  constructor(private dbService: StorageService) {}

  ngOnInit() {
    this.loadBooks();
    this.loadStudents(this.class?.id!).then(() => {
      this.selectedStudent = this.students![0];
      console.log('Current student:', this.selectedStudent);
      this.selectedBook = this.selectedStudent?.currentBook;
    });
    console.log(this.class?.id);
    this.loadOthersStudents(this.class?.id!).then((data) => {
      this.$students = data;
    });
    this.loadAllStudents();
  }

  openSelect() {
    this.selectRef!.open();
  }

  onAddStudents(e: Student[]) {
    e.forEach(async (value) => {
      value.class = this.class!;
      this.students?.push(value);
      this.selectedStudent = this.students![0];
      this.AllStudents?.map((student) => {
        this.students?.forEach((data) => {
          if (student.id === data.id) {
            student.currentBook = data.currentBook;
            student.class = this.class!;
          }
        });
      });
      console.log(this.AllStudents);
      await this.dbService.set('students', this.AllStudents!);
    });
  }

  onDeleteClass(data: Class) {
    this.deleteClass.emit(data);
    this.onCloseModal();
  }

  async loadBooks() {
    this.books = await this.dbService.loadBooks();
  }

  async loadStudents(classId: number) {
    this.students = (await this.dbService.loadStudents()).filter((student) => {
      return student.class.id === classId;
    });
  }

  async loadOthersStudents(classId: number) {
    return (await this.dbService.loadStudents()).filter((student) => {
      return student.class.id !== classId;
    });
  }

  async loadAllStudents() {
    this.AllStudents = await this.dbService.loadStudents();
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

  async onBookChange(book: Book) {
    this.selectedBook = book;
    this.selectedStudent!.currentBook = book;
    this.AllStudents?.map((student) => {
      if (student.id === this.selectedStudent?.id) {
        student.currentBook = book;
      }
    });
    await this.dbService.set('students', this.AllStudents);
  }

  onTopicChange(lesson: Lesson, topic: Topic, event: any) {
    topic.done = event;
    topic.done
      ? (topic.conclusion = new Date().toISOString())
      : (topic.conclusion = null);
    this.AllStudents?.map((student) => {
      if (student.id === this.selectedStudent?.id) {
        student.currentBook.lessons?.map((data) => {
          if (data.id === lesson.id) {
            data.topics.map(async (topic) => {
              if (topic.id === topic.id) {
                topic.done = event;
                topic.done
                  ? (topic.conclusion = new Date().toISOString())
                  : (topic.conclusion = null);
                await this.dbService.set('students', this.AllStudents);
              }
            });
          }
        });
      }
    });

    console.log(topic);
  }

  doneLesson(lesson: Lesson, event: any) {
    lesson.topics.forEach((topic) => {
      if (!topic.done) {
        return this.onTopicChange(lesson, topic, event);
      }
      return this.onTopicChange(lesson, topic, event);
    });
  }

  isLessonDone(topics: Topic[]) {
    return topics.every((topic) => topic.done);
  }

  async onDateChange(topic: Topic, date: any) {
    topic.done = true;
    topic.conclusion = date;
    await this.dbService.set('students', this.AllStudents);
  }

  compareWith(o1: Book, o2: Book) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  compareWithStudents(o1: Student, o2: Student) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
