// src/app/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Book } from '../book';
import { BookInventoryService } from '../book-inventory.service';
import { BookFilterPipe } from '../book-filter.pipe';
import { HoverHighlightDirective } from '../book-inventory/hover-highlight.directive';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, BookFilterPipe, HoverHighlightDirective],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  inventory: Book[] = [];
  searchTerm: string = '';
  // For form editing/adding
  currentBook: Book = this.initializeBook();
  isEditMode: boolean = false;

  constructor(private bookService: BookInventoryService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  // Initialize an empty Book object for the form
  initializeBook(): Book {
    return {
      id: '',
      ISBN: '',
      title: '',
      author: '',
      year: new Date().getFullYear(),
      price: 0,
      featured: false,
      coverImages: [],
      description: ''
    } as Book;
  }

  // Retrieve books from the API
  getBooks(): void {
    this.bookService.getInventory().subscribe({
      next: (books: Book[]) => this.inventory = books,
      error: (err: any) => console.error('Error fetching inventory', err)
    });
  }

  // Save a book (create new or update existing)
  saveBook(): void {
    if (this.isEditMode) {
      this.bookService.updateBook(this.currentBook).subscribe({
        next: (updatedBook: Book) => {
          this.getBooks();
          this.resetForm();
        },
        error: (err) => console.error('Error updating book', err)
      });
    } else {
      this.bookService.createBook(this.currentBook).subscribe({
        next: (newBook: Book) => {
          this.getBooks();
          this.resetForm();
        },
        error: (err: any) => console.error('Error creating book', err)
      });
    }
  }

  // Load a book into the form for editing
  editBook(book: Book): void {
    this.currentBook = { ...book }; // Clone the book
    this.isEditMode = true;
  }

  // Delete a book
  deleteBook(book: Book): void {
    this.bookService.deleteBook(book).subscribe({
      next: () => this.getBooks(),
      error: (err: any) => console.error('Error deleting book', err)
    });
  }

  // Reset the form fields
  resetForm(): void {
    this.currentBook = this.initializeBook();
    this.isEditMode = false;
  }

  // TrackBy function for ngFor
  trackByISBN(index: number, book: Book): string {
    return book.ISBN;
  }
}
