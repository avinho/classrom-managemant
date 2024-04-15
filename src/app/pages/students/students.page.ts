import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonAvatar,
  IonItem,
  IonCardHeader,
  IonNote,
  IonLabel,
  IonRow,
  IonGrid,
  IonCol,
  IonChip,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSpinner,
  IonButtons,
  IonButton,
  IonInput,
  IonFabList,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { StorageService } from '../../storage.service';
import { Student } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students-page',
  templateUrl: 'students.page.html',
  styleUrls: ['students.page.scss'],
  standalone: true,
  imports: [
    IonFabList,
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
  ],
})
export class StudentsPage {
  students?: Student[];
  constructor(private store: StorageService) {
    this.loadStudents();
  }

  clicou(student: Student) {
    console.log('clicou', student.name);
  }

  async loadStudents() {
    this.students = await this.store.loadStudents();
    this.students.sort((a, b) => (a.name > b.name ? 1 : -1));
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
    };

    this.students?.push(newStudent);
    await this.store.addStudent(newStudent);
    modal.dismiss();
  }
}
