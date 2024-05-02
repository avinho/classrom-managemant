import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  WritableSignal,
  effect,
  inject,
  input,
  signal,
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
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
} from '@ionic/angular/standalone';
import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';
import { Book, Class, Lesson, Student, Topic } from '../../models';
import { StorageService } from '../../services/_storagee.service';
import { MaskitoDirective } from '@maskito/angular';
import { ClassesRepository } from 'src/app/services/repositories/classes.repository.service';
import { StudentsRepository } from 'src/app/services/repositories/students.repository.service';
import { BookRepository } from 'src/app/services/repositories/book.repository.service';

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
    MaskitoDirective,
  ],
})
export class StudentDataComponent implements OnInit {
  private readonly classRepository = inject(ClassesRepository);
  private readonly studentRepository = inject(StudentsRepository);
  private readonly bookRepository = inject(BookRepository);
  student = input.required<Student>();
  books: WritableSignal<Book[]> = signal<Book[]>([]);
  classes: WritableSignal<Class[]> = signal<Class[]>([]);
  selectedBook?: Book;
  edit: boolean = true;

  constructor() {}

  readonly birthdateMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  async ngOnInit() {
    await this.loadBooks();
    await this.loadClasses();
    console.log(this.student());
    this.selectedBook = this.student().currentBook!;
  }

  editStudentName(name: any) {
    this.student().name = name;
    this.studentRepository.updateStudentById(
      this.student().id!,
      this.student()
    );
  }

  editStudentBirthdate(birthdate: any) {
    this.student().birthdate = birthdate;
    this.studentRepository.updateStudentById(
      this.student().id!,
      this.student()
    );
  }

  editStudentClass(newClass: Class) {
    this.student().class = newClass;
    this.studentRepository.updateStudentById(
      this.student().id!,
      this.student()
    );
  }

  async loadBooks() {
    this.books.set(await this.bookRepository.getBooks());
  }

  async loadClasses() {
    this.classes.set(await this.classRepository.getClasses());
  }

  async onBookChange(book: Book) {
    this.selectedBook = book;
    this.student().currentBook = book;
    await this.studentRepository.updateStudentById(
      this.student().id!,
      this.student()
    );
  }

  isLessonDone(topics: Topic[]) {
    return topics.every((topic) => topic.done);
  }

  async onTopicChange(topic: Topic, event: boolean) {
    topic.done = event;
    topic.done
      ? (topic.conclusion = new Date().toISOString())
      : (topic.conclusion = null);
    await this.studentRepository.updateStudentById(
      this.student().id!,
      this.student()
    );
  }

  doneLesson(lesson: Lesson, event: any) {
    lesson.topics?.forEach((topic) => {
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
