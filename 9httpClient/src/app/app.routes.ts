// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BookInventoryComponent } from './book-inventory/book-inventory.component';
import { ContactComponent } from './contact/contact.component';

export const appRoutes: Routes = [
  // Redirect the empty path to '/book-inventory'
  { path: '', redirectTo: '/book-inventory', pathMatch: 'full' },
  { path: 'book-inventory', component: BookInventoryComponent },
  { path: 'contact', component: ContactComponent },
  // Wildcard route: any unmatched URL will redirect to '/app'
  { path: '**', redirectTo: '/book-inventory', pathMatch: 'full' }
];
