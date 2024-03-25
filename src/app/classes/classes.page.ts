import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonRow,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Class, Student } from '../models';
import { StorageService } from '../storage.service';
import { ClassStudentsPage } from './studentsPage/classStudents.page';

@Component({
  selector: 'app-classes',
  templateUrl: 'classes.page.html',
  styleUrls: ['classes.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonModal,
    IonFabButton,
    IonFab,
    IonCol,
    IonRow,
    IonGrid,
    IonNote,
    IonIcon,
    IonAvatar,
    IonList,
    IonCardSubtitle,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonThumbnail,
    CommonModule,
    ClassStudentsPage,
  ],
})
export class ClassesPage {
  classes?: Class[];
  students?: Student[];

  constructor(private storage: StorageService) {
    this.loadStudents();
    this.loadClasses();
  }

  async loadClasses() {
    this.classes = await this.storage.loadClasses();
    this.classes.forEach(async (classItem) => {
      classItem.students = (await this.storage.loadStudents()).filter(
        (student) => {
          return student.class.id === classItem.id;
        }
      );
      console.log(classItem);
    });
  }

  closeModal(modal: IonModal) {
    modal.dismiss();
  }

  async loadStudents() {
    this.students = await this.storage.loadStudents();
  }
}
