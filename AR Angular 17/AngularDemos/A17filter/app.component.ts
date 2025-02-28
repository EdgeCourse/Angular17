import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p *ngFor="let book of filteredBooks">{{ book }}</p>
  `,
})
export class AppComponent {
  books = ['The Hobbit', 'A Game of Thrones', 'The Lord of the Rings', 'Harry Potter'];
  filteredBooks: string[] = [];

  constructor() {
    of(...this.books)
      .pipe(
        filter((book) => book.includes('The')),
        map((book) => book.toUpperCase())
      )
      .subscribe((book) => this.filteredBooks.push(book));
  }
}