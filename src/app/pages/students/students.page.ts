import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
  IonFabList,
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
} from '@ionic/angular/standalone';
import { Student } from '../../models';
import { StorageService } from '../../storage.service';
import { StudentProfileComponent } from 'src/app/components/student-profile/student-profile.component';

@Component({
  selector: 'app-students-page',
  templateUrl: 'students.page.html',
  styleUrls: ['students.page.scss'],
  standalone: true,
  imports: [
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
export class StudentsPage {
  students?: Student[];
  selectedStudent?: Student;

  @ViewChild('modal', { static: false }) modalRef?: IonModal;

  constructor(private store: StorageService) {
    this.loadStudents();
  }

  clicou(student: Student) {
    this.modalRef?.present();
    this.selectedStudent = student;
    console.log('clicou', student.name);
  }

  async loadStudents() {
    this.students = await this.store.loadStudents();
    this.sortStudents();
  }

  teste() {
    console.log('teste');
  }

  sortStudents() {
    this.students?.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  async deleteStudent(student: Student) {
    await this.store.deleteStudent(student);
    await this.loadStudents();
  }

  onAddStudents(e: Student[]) {}

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

    this.students?.push(newStudent);
    this.sortStudents();
    await this.store.addStudent(newStudent);
    modal.dismiss();
  }
}
