// src/app/pipes/filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book';

@Pipe({
  name: 'bookFilter',
  standalone: true,
  pure: false  // pure: false if you need it to update dynamically; use with care
})
export class BookFilterPipe implements PipeTransform {
  transform(books: Book[], searchTerm: string): Book[] {
    if (!books || !searchTerm) {
      return books;
    }
    searchTerm = searchTerm.toLowerCase();
    return books.filter(book =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.ISBN.toLowerCase().includes(searchTerm)
    );
  }
}
