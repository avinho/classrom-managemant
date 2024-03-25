import { Component } from '@angular/core';
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
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-students-page',
  templateUrl: 'students.page.html',
  styleUrls: ['students.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class StudentsPage {
  constructor() {}
}
