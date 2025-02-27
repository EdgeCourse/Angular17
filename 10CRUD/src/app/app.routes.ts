// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BookInventoryComponent } from './book-inventory/book-inventory.component';
import { ContactComponent } from './contact/contact.component';

export const appRoutes: Routes = [
  // Redirect the empty path to '/book-inventory'
  { path: '', redirectTo: '/book-inventory', pathMatch: 'full' },
  { path: 'book-inventory', component: BookInventoryComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminComponent },
  // Wildcard route: any unmatched URL will redirect to '/app'
  { path: '**', redirectTo: '/book-inventory', pathMatch: 'full' }
];
