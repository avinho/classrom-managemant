import { Lesson } from './../../models';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, input, output } from '@angular/core';
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
import { StorageService } from 'src/app/storage.service';

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
  private readonly store = inject(StorageService);
  closeModal = output<boolean>();
  deleteBook = output<Book>();
  book = input.required<Book>();
  edit: boolean = true;

  constructor() {}

  onCloseModal() {
    this.closeModal.emit(false);
  }

  async addLesson() {
    let newLesson: Lesson = {
      id: Math.floor(Math.random() * 1000),
      name: 'New Lesson',
      topics: [],
    };

    this.book().lessons?.push(newLesson);
    await this.store.updateBook(this.book());
  }

  async addTopic(lesson: Lesson) {
    let newTopic = {
      id: Math.floor(Math.random() * 1000),
      name: 'New Topic',
      done: false,
      conclusion: null,
    };
    lesson.topics?.push(newTopic);
    await this.store.updateBook(this.book());
  }
}
