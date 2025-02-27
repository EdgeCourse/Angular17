// src/app/book-inventory/book-inventory.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookInventoryService {
  // The json-server endpoint for books
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  // GET: Retrieve all books as an Observable stream
  getInventory(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(
      tap(() => console.log('Fetched book inventory')),
      catchError(this.handleError<Book[]>('getInventory', []))
    );
  }

  // GET: Retrieve a specific book by ISBN
  getBook(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${isbn}`).pipe(
      tap((book) => console.log(`Fetched book with ISBN: ${isbn}`, book)),
      catchError(this.handleError<Book>(`getBook ISBN=${isbn}`))
    );
  }

  // POST: Create a new book
  createBook(book: Book): Observable<Book> {
    if (!book.id) {
      book.id = book.ISBN;
    }
    return this.http.post<Book>(this.apiUrl, book).pipe(
      tap((newBook) => console.log('Created book:', newBook)),
      catchError(this.handleError<Book>('createBook'))
    );
  }

  // PUT: Update an existing book
  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${book.ISBN}`, book).pipe(
      tap(() => console.log(`Updated book with ISBN: ${book.ISBN}`)),
      catchError(this.handleError<Book>('updateBook'))
    );
  }

  // DELETE: Remove a book from inventory
  deleteBook(book: Book): Observable<Book> {
    return this.http.delete<Book>(`${this.apiUrl}/${book.id}`).pipe(
      tap(() => console.log(`Deleted book with ID: ${book.id}`)),
      catchError(this.handleError<Book>('deleteBook'))
    );
  }

  // Centralized error handling using RxJS
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }
}
