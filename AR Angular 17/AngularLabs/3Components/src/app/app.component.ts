// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookInventoryComponent } from './book-inventory/book-inventory.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BookInventoryComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
