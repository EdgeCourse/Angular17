import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BookInventoryService } from '../book-inventory.service';
import { Book } from '../book';
import { NgIf, NgFor, CurrencyPipe, CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, CurrencyPipe, CommonModule],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  authService = inject(AuthService);
  private bookService = inject(BookInventoryService);
  inventory: Book[] = [];

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getInventory().subscribe({
      next: (books: Book[]) => (this.inventory = books),
      error: (err: any) => console.error('Error fetching inventory', err),
    });
  }
}
