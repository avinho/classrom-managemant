import { StudentTopicService } from './../../services/student-topic.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  InputSignal,
  OnInit,
  WritableSignal,
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
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';
import { BookRepository } from 'src/app/repositories/book.repository';
import { ClassesRepository } from 'src/app/repositories/classes.repository';
import { StudentsRepository } from 'src/app/repositories/students.repository';
import {
  Book,
  Class,
  Lesson,
  Student,
  StudentTopic,
  Topic,
} from '../../models';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import { BookService } from 'src/app/services/book.service';

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
export class StudentDataComponent implements OnInit, AfterContentInit {
  private readonly classService = inject(ClassService);
  private readonly studentService = inject(StudentService);
  private readonly bookService = inject(BookService);
  private readonly studentTopicService = inject(StudentTopicService);
  student = input.required<Student>();
  books: WritableSignal<Book[]> = signal<Book[]>([]);
  classes: WritableSignal<Class[]> = signal<Class[]>([]);
  selectedBook?: Book;
  edit: boolean = true;
  loading: boolean = true;

  async ngAfterContentInit(): Promise<void> {
    // this.studentEdit()
    return;
  }

  readonly birthdateMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  ngOnInit() {
    this.loadBooks().then(() => (this.loading = false));
    this.loadClasses();
    this.selectedBook = this.student().currentBook!;
  }

  async studentEdit() {
    /* this.student().currentBook?.lessons?.forEach((lesson) => {
      lesson.topics?.forEach(async (topic) => {
        let topicProgres = await this.studentTopicService.loadByTopicId(
          topic.id!
        );
        topic.done = topicProgres?.done == 1 ? true : false;
        topic.conclusion = topicProgres?.conclusion;
      });
      console.log(lesson.topics);
    }); */
  }

  editStudentName(name: any) {
    this.student().name = name;
    this.studentService.save(this.student());
  }

  editStudentBirthdate(birthdate: any) {
    this.student().birthdate = birthdate;
    this.studentService.save(this.student());
  }

  editStudentClass(newClass: Class) {
    this.student().class = newClass;
    this.studentService.save(this.student());
  }

  async loadBooks() {
    this.books.set(await this.bookService.loadBooks());
  }

  async loadClasses() {
    this.classes.set(await this.classService.loadClasses());
  }

  async onBookChange(book: Book) {
    this.selectedBook = book;
    this.student().currentBook = book;
    await this.studentService.save(this.student());
    this.student().currentBook =
      await this.studentService.loadStudentBookProgress(this.student());
  }

  /*
   *  TODO
   *  Torna metodo assincrono para não ter concorrencia na database
   */
  isLessonDone(topics: Topic[]) {
    return topics.every((topic) => topic.done);
  }

  async onTopicChange(topic: Topic, event: boolean) {
    topic.done = event;
    topic.done
      ? (topic.conclusion = new Date().toISOString())
      : (topic.conclusion = null);
    let findTopic = await this.studentTopicService.loadByTopicId(topic.id!);

    findTopic = {
      id: findTopic?.id,
      done: topic.done ? 1 : 0,
      student_id: this.student().id!,
      topic_id: topic.id!,
      conclusion: topic.conclusion,
    };
    await this.studentTopicService.save(findTopic);
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
