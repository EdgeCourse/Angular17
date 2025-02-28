// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BookInventoryComponent } from './book-inventory/book-inventory.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { AdminGuard } from './admin.guard';
import {LoginComponent} from './login/login.component';

export const appRoutes: Routes = [
  {
    path: 'book-inventory',
        component: BookInventoryComponent
        // Optionally, you can create a separate BookDetailComponent for details.
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
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: '/login' }
];
