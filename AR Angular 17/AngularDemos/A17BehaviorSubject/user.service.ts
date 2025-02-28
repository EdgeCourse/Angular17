import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<string | null>(null);
  user$ = this.userSubject.asObservable(); // Expose as observable

  login(username: string) {
    this.userSubject.next(username); // Update BehaviorSubject value
  }

  logout() {
    this.userSubject.next(null);
  }
}
