// src/app/book-inventory/book-inventory.component.ts
import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HoverHighlightDirective } from './hover-highlight.directive';
import { BookFilterPipe } from '../book-filter.pipe';
import { BookInventoryService } from '../book-inventory.service';

@Component({
  selector: 'app-book-inventory',
  standalone: true,
  imports: [CommonModule, HoverHighlightDirective, FormsModule, BookFilterPipe],
  templateUrl: './book-inventory.component.html',
  styleUrls: ['./book-inventory.component.css']
})
export class BookInventoryComponent implements OnInit {
  currentDate: Date = new Date();
  searchTerm: string = '';
  inventory: Book[] = [];

  constructor(private bookService: BookInventoryService) {}

  ngOnInit(): void {
    // Get the inventory from the service
    this.inventory = this.bookService.getInventory();
  }

  trackByISBN(index: number, book: Book): string {
    return book.ISBN;
  }

  deleteBook(book: Book): void {
    // Use the service to delete the book
    this.bookService.deleteBook(book);
    // Update local inventory after deletion
    this.inventory = this.bookService.getInventory();
  }
}
