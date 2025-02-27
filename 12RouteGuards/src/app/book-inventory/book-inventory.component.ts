// src/app/book-inventory/book-inventory.component.ts
import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';
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
  selectedBookId: string | null = null;

  constructor(private bookService: BookInventoryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Fetch all books
    this.getBooks();

    // Subscribe to route parameters to check if an id is provided
    this.route.paramMap.subscribe(params => {
      this.selectedBookId = params.get('id');
      if (this.selectedBookId) {
        // Optionally, you might fetch specific book details using this ID
        console.log("Selected Book ID:", this.selectedBookId);
        // e.g., this.getBookDetails(this.selectedBookId);
      }
    });
  }

  // Retrieve the inventory from the service
  getBooks(): void {
    this.bookService.getInventory().subscribe({
      next: (books: Book[]) => this.inventory = books,
      error: (err: any) => console.error('Error fetching inventory', err)
    });
  }

  // TrackBy function for efficient ngFor rendering
  trackByISBN(index: number, book: Book): string {
    return book.ISBN;
  }
}
