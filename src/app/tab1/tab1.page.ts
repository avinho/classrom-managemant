import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonCardContent,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonThumbnail,
  IonAvatar,
  IonIcon,
  IonNote,
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class Tab1Page {
  constructor() {}
}
