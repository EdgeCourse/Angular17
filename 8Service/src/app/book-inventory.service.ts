// src/app/book-inventory.service.ts
import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookInventoryService {
  // Hard-coded inventory (you might fetch this data from an API)
  private inventory: Book[] = [
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

  // Return the current inventory
  getInventory(): Book[] {
    return [...this.inventory]; // return a copy
  }

  // Delete a book by ISBN
  deleteBook(book: Book): void {
    this.inventory = this.inventory.filter(b => b.ISBN !== book.ISBN);
  }
}
