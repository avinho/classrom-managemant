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
  IonListHeader /*  */,
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
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';
import { StudentDataComponent } from 'src/app/components/student-data/student-data.component';
import { Book, Class, Student } from '../../models';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-class-students',
  templateUrl: 'class-students.component.html',
  styleUrls: ['class-students.component.scss'],
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
    MaskitoDirective,
    StudentDataComponent,
  ],
})
export class ClassStudentsComponent implements OnInit {
  students?: Student[];
  @Input() class?: Class;
  selectedBook?: Book;
  selectedStudent?: Student;
  @Output() closeModal = new EventEmitter(false);
  @Output() deleteClass = new EventEmitter(false);
  @ViewChild('mySelect', { static: false }) selectRef?: IonSelect;
  swiperModules = [IonicSlides];

  teste: boolean = false;

  readonly birthdateMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  $students?: Student[];

  AllStudents?: Student[];

  constructor(private dbService: StorageService) {}

  ngOnInit() {
    this.loadStudents(this.class?.id!).then(() => {
      this.selectedStudent = this.students![0];
      console.log('Current student:', this.selectedStudent);
      this.selectedBook = this.selectedStudent?.currentBook;
    });
    this.loadAllStudents();
    this.loadOthersStudents(this.class?.id!).then((data) => {
      this.$students = data;
    });
  }

  async openSelect() {
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

  async loadStudents(classId: number) {
    let start = performance.now();
    this.students = (await this.dbService.loadStudents()).filter((student) => {
      return student.class?.id === classId;
    });
    let end = performance.now();
    console.log(end - start);
  }

  async loadOthersStudents(classId: number) {
    return (await this.dbService.loadStudents()).filter((student) => {
      return student.class?.id !== classId;
    });
  }

  async loadAllStudents() {
    this.AllStudents = await this.dbService.loadStudents();
  }

  onCloseModal() {
    this.closeModal.emit(false);
  }

  onSlideChange(data: any) {
    const activeIndex = data.detail[0].activeIndex;
    if (activeIndex >= 0 && activeIndex < this.students!.length) {
      this.selectedStudent = this.students![activeIndex];
      this.selectedBook = this.selectedStudent.currentBook;
    } else {
      console.warn('Invalid slide index:', activeIndex);
    }
  }

  async newStudent(modal: IonModal, name: any, birthdate: any) {
    const student: Student = {
      id: Math.floor(Math.random() * 1000),
      name: name,
      birthdate: new Date(birthdate).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }),
      class: null,
    };

    await this.dbService.addStudent(student);
    modal.dismiss();
    console.log(student);
  }

  dismissModal(modal: IonModal) {
    modal.dismiss();
  }

  compareWithStudents(o1: Student, o2: Student) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
