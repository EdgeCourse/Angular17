// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BookInventoryComponent } from './book-inventory/book-inventory.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { adminGuard } from './admin.guard';

export const appRoutes: Routes = [
  {
    path: 'book-inventory',
        component: BookInventoryComponent
        // Optionally, you can create a separate BookDetailComponent for details.
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [adminGuard] // Protect the admin route using a function-based guard
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  // Default route: Redirect to 'book-inventory'
  {
    path: '',
    redirectTo: 'book-inventory',
    pathMatch: 'full'
  },
  // Wildcard route: Redirect any unknown paths to 'book-inventory'
  {
    path: '**',
    redirectTo: 'book-inventory'
  }
];
