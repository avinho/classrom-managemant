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
import { BookRepository } from 'src/app/repositories/book.repository';
import { Book } from '../../models';
import { BookService } from 'src/app/services/book.service';

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
  private readonly bookService = inject(BookService);
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
    this.books = await this.bookService.loadBooks();
  }

  async addBook() {
    let newBook: Book = {
      name: 'Novo Livro',
    };

    await this.bookService.save(newBook);
    await this.loadBooks();
  }
}
