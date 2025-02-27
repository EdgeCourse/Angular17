// src/app/book-inventory/book-inventory.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookInventoryService {
  // The json-server endpoint for books
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  // GET: Retrieve all books
  getInventory(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // GET: Retrieve a specific book (optional for editing)
  getBook(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${isbn}`);
  }


createBook(book: Book): Observable<Book> {
  // If the book doesn't have an id, assign it the ISBN value
  if (!book.id) {
    book.id = book.ISBN;
  }
  return this.http.post<Book>(this.apiUrl, book).pipe(
    tap(newBook => console.log('Created book:', newBook)),
    catchError(this.handleError<Book>('createBook'))
  );
}
  handleError<T>(arg0: string): (err: any, caught: Observable<Book>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }


  // PUT: Update an existing book
  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${book.ISBN}`, book);
  }

// book-inventory.service.ts
deleteBook(book: Book): Observable<Book> {
  const url = `${this.apiUrl}/${book.id}`;
  return this.http.delete<Book>(url);
}

}
