import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="user; else loggedOut">
      <p>Welcome, {{ user }}!</p>
      <button (click)="logout()">Logout</button>
    </div>
    <ng-template #loggedOut>
      <p>You are not logged in.</p>
      <button (click)="login()">Login</button>
    </ng-template>
  `
})
export class AppComponent {
  user: string | null = null;

  constructor(private userService: UserService) {
    this.userService.user$.subscribe(username => {
      this.user = username;
    });
  }

  login() {
    this.userService.login('JohnDoe'); // Simulate login
  }

  logout() {
    this.userService.logout();
  }
}
/* 
Explanation
BehaviorSubject stores the latest user state and emits it to new subscribers.
user$ (observable) is used in the component to reactively update the UI.
When the user logs in, login() updates the BehaviorSubject, and the component updates automatically.
logout() resets the state.
This is a simple yet effective way to manage reactive state using BehaviorSubject in Angular 17! 🚀






Using BehaviorSubject in Angular 17 provides several key benefits, especially for managing shared state reactively. Here’s why it’s a great choice:

Instant State Updates Across Components
BehaviorSubject stores the latest value and automatically updates all subscribed components when the value changes.
No need for manual event emitters or callbacks.
Benefit: Ensures that all parts of the application react to state changes immediately.

Stores the Last Emitted Value
Unlike Subject, which doesn’t store values, BehaviorSubject always holds the most recent value.
New subscribers immediately get the last emitted value without waiting for another emission.
Benefit: If a new component subscribes, it doesn’t start with undefined, making it ideal for things like user authentication state.

Centralized State Management
Acts as a lightweight state management solution without needing complex libraries like NgRx or Akita.
Can be used to share state between unrelated components without @Input or @Output.
Benefit: Simplifies communication between components without deep input/output chains.

Reactive and Asynchronous
Works well with RxJS operators (map, filter, switchMap, etc.), making state handling more declarative.
Allows components to react to changes dynamically rather than checking state manually.
Benefit: Reduces the need for imperative logic and makes the app more scalable.

Cleaner Code with Fewer Dependencies
Avoids relying on Angular services with EventEmitter, which can be harder to manage.
No need to poll or manually trigger updates—just subscribe and react.
Benefit: Reduces boilerplate and makes the code more maintainable.

Works with OnPush Change Detection
Since it emits new values reactively, it works perfectly with ChangeDetectionStrategy.OnPush.
Angular change detection only runs when there’s an actual update.
Benefit: Improves performance by reducing unnecessary change detection cycles.

When to Use BehaviorSubject?
User authentication state (logged-in user across the app)
Theme settings (dark/light mode)
Global notifications (toast messages, alerts)
Cart state (in e-commerce apps)
WebSocket/Real-time data streams (live chat, stock updates)
Key Takeaway
Using BehaviorSubject in Angular 17 is a simple yet powerful way to manage shared, reactive state without overcomplicating things. It keeps the app efficient, scalable, and easier to maintain. 
*/