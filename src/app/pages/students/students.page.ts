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
import { Student } from '../../interfaces/models/student.model';

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
  students?: Student[];
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

  async openProfile(student: Student) {
    this.selectedStudent = (await this.studentService.loadStudentById(
      student.id!
    )) as Student;
    this.modalRef()?.present();
    console.log('clicou', student);
  }

  async loadStudents() {
    try {
      let loadedStudents = await this.studentService.loadStudents();
      if (this.searchTerm) {
        loadedStudents = [...loadedStudents].filter((student) =>
          student.name.toLowerCase().includes(this.searchTerm!.toLowerCase())
        );
      }
      console.log(loadedStudents);
      this.students = this.sortStudents(loadedStudents);
    } catch (error) {
      console.error(error);
    }
  }

  private sortStudents(students: Student[]) {
    return [...students].sort((a, b) => a.name.localeCompare(b.name));
  }

  private filterStudents(students: Student[]): Student[] {
    return [...students].filter((student) =>
      student.name.toLowerCase().includes(this.searchTerm!.toLowerCase())
    );
  }

  /** TODO
   *  1. Melhorar filtragem para filtrar somente os dados carregado ao iniciar o componente.
   */
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
      name: name,
      birthdate: new Date(birthdate).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }),
      currentClass: null,
      currentBook: null,
    };

    await this.studentService.save(newStudent);
    this.loadStudents();
    modal.dismiss();
  }
}
