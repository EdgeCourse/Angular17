import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookInventoryService {
  private apiUrl = 'http://localhost:3000/books'; // URL to json-server

  constructor(private http: HttpClient) { }

  // Retrieve the inventory as an observable
  getInventory(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }


}
