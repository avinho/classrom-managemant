import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { StudentProfileComponent } from 'src/app/components/student-profile/student-profile.component';
import { StudentService } from 'src/app/services/student.service';
import { Student } from '../../models';

@Component({
  selector: 'app-students-page',
  templateUrl: 'students.page.html',
  styleUrls: ['students.page.scss'],
  standalone: true,
  imports: [
    IonRefresherContent,
    IonRefresher,
    IonInput,
    IonButton,
    IonButtons,
    IonSpinner,
    IonIcon,
    IonFabButton,
    IonFab,
    IonDatetime,
    IonModal,
    IonDatetimeButton,
    IonChip,
    IonCol,
    IonGrid,
    IonRow,
    IonLabel,
    IonNote,
    IonCardHeader,
    IonItem,
    IonAvatar,
    IonList,
    IonCardContent,
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    IonSelect,
    IonSelectOption,
    StudentProfileComponent,
  ],
})
export class StudentsPage implements OnInit {
  private readonly studentService = inject(StudentService);
  students: WritableSignal<Student[]> = signal<Student[]>([]);
  selectedStudent!: Student;
  searchTerm?: string;

  searchInput = viewChild<IonInput>('searchInput');
  modalRef = viewChild<IonModal>('modal');

  constructor() {}

  async ngOnInit() {
    await this.loadStudents();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadStudents();
      event.target.complete();
    }, 1000);
  }

  openProfile(student: Student) {
    this.selectedStudent = student;
    this.modalRef()?.present();
    console.log('clicou', student.name);
  }

  async loadStudents() {
    try {
      const students = await this.studentService.loadStudents();

      let filterStudents = students;
      if (this.searchTerm) {
        console.log('chegou aqui', students);
        filterStudents = this.filterStudents(students);
      }
      this.students.set(this.sortStudents(filterStudents));
    } catch (error) {
      console.error(error);
    }
  }

  private sortStudents(students: Student[]): Student[] {
    console.log('students', students);
    let std = [...students];
    console.log('std', std);
    let sortedStudents = std.sort((a, b) => a.name.localeCompare(b.name));
    /* let sortedStudents = [...students].sort((a, b) =>
      a.name > b.name ? 1 : -1
    ); */
    console.log('sortedStudents', sortedStudents);
    return sortedStudents;
  }

  filterStudents(students: Student[]): Student[] {
    return students.filter((student) =>
      student.name.toLowerCase().includes(this.searchTerm!.toLowerCase())
    );
  }

  async filter(query: any) {
    this.searchTerm = query;
    await this.loadStudents();
  }

  async deleteStudent(student: Student) {
    await this.studentService.delete(student);
    await this.loadStudents();
  }

  dismissModal(modal: IonModal) {
    modal.dismiss();
  }

  compareWithStudents(o1: Student, o2: Student) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  async newStudent(modal: IonModal, name: any, birthdate: any) {
    const newStudent: Student = {
      id: Math.floor(Math.random() * 1000),
      name: name,
      birthdate: new Date(birthdate).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }),
      class: null,
    };

    await this.studentService.save(newStudent);
    this.loadStudents();
    modal.dismiss();
  }
}
