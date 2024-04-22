import { CommonModule } from '@angular/common';
import { Component, OnInit, input, output } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonButton,
  IonButtons,
  IonPopover,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { Book } from 'src/app/models';

@Component({
  selector: 'app-book-component',
  templateUrl: './book-component.component.html',
  styleUrls: ['./book-component.component.scss'],
  standalone: true,
  imports: [
    IonCardTitle,
    IonInput,
    IonLabel,
    IonItem,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonList,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonHeader,
    IonContent,
    IonButton,
    IonButtons,
    IonPopover,
    CommonModule,
  ],
})
export class BookComponentComponent {
  closeModal = output<boolean>();
  deleteBook = output<Book>();
  book = input.required<Book>();
  edit: boolean = true;

  constructor() {}

  onCloseModal() {
    this.closeModal.emit(false);
  }
}
