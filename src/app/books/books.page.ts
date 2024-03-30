import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Book } from '../models';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class BooksPage {
  books?: Book[];
  constructor(private store: StorageService) {
    this.loadBooks();
  }

  async loadBooks() {
    this.books = await this.store.loadBooks();
  }
}
