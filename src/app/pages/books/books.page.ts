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
  IonInput,
  IonChip,
} from '@ionic/angular/standalone';
import { BookComponent } from 'src/app/components/book-component/book-component.component';
import { BookService } from 'src/app/services/book.service';
import { Book } from '../../models';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
  standalone: true,
  imports: [
    IonChip,
    IonInput,
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
    BookComponent,
    IonModal,
  ],
})
export class BooksPage {
  private readonly bookService = inject(BookService);
  books?: Book[];
  selectedBook!: Book;
  modalRef = viewChild<IonModal>('modal');
  searchTerm?: string;

  constructor() {
    this.loadBooks();
  }

  openProfile(book: Book) {
    this.selectedBook = book;
    this.modalRef()?.present();
    console.log('clicou', book.name);
  }

  dismissModal(modal: IonModal) {
    this.loadBooks();
    modal.dismiss();
  }

  handleRefresh(event: any) {
    setTimeout(async () => {
      await this.loadBooks();
      event.target.complete();
    }, 1000);
  }

  async loadBooks() {
    try {
      let loadedBooks = await this.bookService.loadBooks();
      if (this.searchTerm) {
        loadedBooks = [...loadedBooks].filter((book) =>
          book.name.toLowerCase().includes(this.searchTerm!.toLowerCase())
        );
      }
      this.books = loadedBooks;
    } catch (error) {
      console.error(error);
    }
  }

  /** TODO
   *  1. Melhorar filtragem para filtrar somente os dados carregado ao iniciar o componente.
   */
  async filter(query: any) {
    this.searchTerm = query;
    await this.loadBooks();
  }

  async addBook() {
    let newBook: Book = {
      name: 'Novo Livro',
    };

    await this.bookService.save(newBook);
    await this.loadBooks();
  }
}
