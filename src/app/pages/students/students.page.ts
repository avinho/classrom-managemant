import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, viewChild } from '@angular/core';
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
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { StudentProfileComponent } from 'src/app/components/student-profile/student-profile.component';
import { Student } from '../../models';
import { StorageService } from '../../storage.service';

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
  private readonly store = inject(StorageService);
  students$?: Promise<Student[]>;
  selectedStudent!: Student;
  searchTerm = '';

  searchInput = viewChild<IonInput>('searchInput');
  modalRef = viewChild<IonModal>('modal');

  constructor() {}

  ngOnInit() {
    this.loadStudents();
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
    this.students$ = this.store.loadStudents().then((students) => {
      students.sort((a, b) => (a.name > b.name ? 1 : -1));
      return this.filterStudents(students);
    });
    console.log(await this.students$);
  }

  filterStudents(students: Student[]): Student[] {
    return students.filter((student) =>
      student.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async filter(query: any) {
    this.searchTerm = query;
    await this.loadStudents();
  }

  async deleteStudent(student: Student) {
    await this.store.deleteStudent(student);
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

    await this.store.addStudent(newStudent);
    this.loadStudents();
    modal.dismiss();
  }
}
