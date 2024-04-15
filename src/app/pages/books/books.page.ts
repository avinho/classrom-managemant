import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Book } from '../../models';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule] /*  */,
})
export class BooksPage {
  books?: Book[];

  constructor(private store: StorageService) {
    this.loadBooks();
  }

  async loadBooks() {
    this.books = await this.store.loadBooks();
  }

  async addBook() {
    let newBook: Book = {
      id: Math.floor(Math.random() * 1000),
      name: 'Novo Livro',
    };

    this.books?.push(newBook);
    await this.store.addBook(newBook);
  }
}
