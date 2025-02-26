// src/app/book-inventory/book-inventory.component.ts
import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HoverHighlightDirective } from './hover-highlight.directive';

import { BookFilterPipe } from '../book-filter.pipe';


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
  // Create a hard-coded list of Angular and JavaScript books
  inventory: Book[] = [
    {
      ISBN: "978-1492056205",
      title: "Angular Up & Running",
      author: "Shyam Seshadri",
      year: 2018,
      price: 39,
      featured: true,
      coverImages: ["/assets/angular-up-and-running.png"]
    },
    {
      ISBN: "978-1593279509",
      title: "Eloquent JavaScript, 3rd Edition",
      author: "Marijn Haverbeke",
      year: 2018,
      price: 29.99,
      featured: false,
      coverImages: ["/assets/eloquent-javascript.jpg"]
    },
    {
      ISBN: "978-1491904244",
      title: "You Don't Know JS Yet: Get Started",
      author: "Kyle Simpson",
      year: 2020,
      price: 34.99,
      featured: false,
      coverImages: ["/assets/ydkjs-cover.jpg"]
    },
    {
      ISBN: "978-1449331818",
      title: "Learning JavaScript Design Patterns",
      author: "Addy Osmani",
      year: 2012,
      price: 25.99,
      featured: true,
      coverImages: ["/assets/js-design-patterns.png"]
    }
  ];

  ngOnInit(): void {
    // Add any initialization logic here if needed.
  }

  // Use trackBy to help Angular identify items uniquely (using ISBN)
  trackByISBN(index: number, book: Book): string {
    return book.ISBN;
  }

  // Delete a book from the inventory by filtering it out based on ISBN
  deleteBook(book: Book): void {
    this.inventory = this.inventory.filter(b => b.ISBN !== book.ISBN);
  }
}
