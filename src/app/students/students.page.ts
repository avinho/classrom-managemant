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
} from '@ionic/angular/standalone';
import { StorageService } from '../storage.service';
import { Student } from '../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students-page',
  templateUrl: 'students.page.html',
  styleUrls: ['students.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class StudentsPage implements AfterViewInit {
  students?: Student[];
  constructor(private store: StorageService) {
    this.loadStudents();
  }
  ngAfterViewInit(): void {
    console.log('teste');
  }

  async loadStudents() {
    this.students = await this.store.loadStudents();
    this.students.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
}
