import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HoverHighlightDirective } from './hover-highlight.directive';
import { BookFilterPipe } from '../book-filter.pipe';
import { BookInventoryService } from '../book-inventory.service';

@Component({
  selector: 'app-book-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, HoverHighlightDirective, BookFilterPipe],
  templateUrl: './book-inventory.component.html',
  styleUrls: ['./book-inventory.component.css']
})
export class BookInventoryComponent implements OnInit {
  currentDate: Date = new Date();
  searchTerm: string = '';
  inventory: Book[] = [];

  constructor(private bookService: BookInventoryService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  // Retrieve the inventory from the service
  getBooks(): void {
    this.bookService.getInventory().subscribe({
      next: (books: Book[]) => this.inventory = books,
      error: (err: any) => console.error('Error fetching inventory', err)
    });
  }

  trackByISBN(index: number, book: Book): string {
    return book.ISBN;
  }

 
}
