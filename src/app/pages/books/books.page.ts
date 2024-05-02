import { CommonModule } from '@angular/common';
import { Component, inject, viewChild } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { BookComponentComponent } from 'src/app/components/book-component/book-component.component';
import { BookRepository } from 'src/app/services/repositories/book.repository.service';
import { Book } from '../../models';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonRefresher,
    IonFabButton,
    IonFab,
    IonLabel,
    IonItem,
    IonCardContent,
    IonList,
    IonCard,
    IonRefresherContent,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    BookComponentComponent,
    IonModal,
  ],
})
export class BooksPage {
  private readonly store = inject(BookRepository);
  books?: Book[];
  selectedBook!: Book;
  modalRef = viewChild<IonModal>('modal');

  constructor() {
    this.loadBooks();
  }

  openProfile(book: Book) {
    this.selectedBook = book;
    this.modalRef()?.present();
    console.log('clicou', book.name);
  }

  dismissModal(modal: IonModal) {
    modal.dismiss();
  }

  handleRefresh(event: any) {
    setTimeout(async () => {
      await this.loadBooks();
      event.target.complete();
    }, 1000);
  }

  async loadBooks() {
    this.books = await this.store.getBooks();
  }

  async addBook() {
    let newBook: Book = {
      id: Math.floor(Math.random() * 1000),
      name: 'Novo Livro',
    };

    this.books?.push(newBook);
    await this.store.addBook(newBook.name);
  }
}
