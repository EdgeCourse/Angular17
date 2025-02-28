/* authorization with switchMap */
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <button (click)="login()">Login</button>
    <p *ngIf="loggedIn">Logged in!</p>
    <p *ngIf="error">{{ error }}</p>
  `,
})
export class AppComponent {
  loggedIn = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  login() {
    this.http
      .post('https://jsonplaceholder.typicode.com/posts', {
        /* normally user/pass, but jsonplaceholder is fake */
        userId: 1,
        title: 'foo',
        body: 'bar',
      })
      .pipe(
        switchMap((response) => {
          if (response) {
            this.loggedIn = true;
            return of(response); // proceed
          } else {
            return throwError('Login failed');
          }
        }),
        catchError((err) => {
          this.error = err;
          return of(null); // handle error gracefully
        })
      )
      .subscribe();
  }
}

/* 
switchMap is a powerful tool for handling asynchronous operations like API calls during the authentication process.

Typical Authorization Flow

User Initiates Login: The user enters their credentials (username/password) and submits the login form.
Authentication Request: The application sends an HTTP POST request to the authentication server with the user's credentials.
Token Retrieval: If the credentials are valid, the server returns an access token (and possibly a refresh token).
Protected Resource Request: The application uses the access token to make requests to protected resources.
How switchMap Fits In

switchMap is particularly useful when you need to perform a sequence of asynchronous operations where the result of one operation depends on the result of the previous one, and you want to ensure that only the latest operation's result is processed.

Example Scenario

Let's imagine you have a login process that involves:

Sending a login request.
Storing the access token in local storage (or a cookie).
Fetching user profile data using the access token.
TypeScript

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'your-api-url';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      switchMap((response: any) => {
        const accessToken = response.accessToken;
        localStorage.setItem('accessToken', accessToken); // Store token

        // Now, fetch user profile using the token
        return this.http.get(`${this.apiUrl}/profile`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }),
      tap((profile) => {
        //Handle the profile data, such as storing it in a service variable.
        console.log("User Profile:", profile);
      })
    );
  }
}
Explanation

this.http.post(${this.apiUrl}/login, credentials): Sends the login request.
switchMap((response: any) => {...}):
switchMap receives the login response.
It extracts the accessToken from the response.
localStorage.setItem('accessToken', accessToken);: Stores the token.
return this.http.get(${this.apiUrl}/profile, {...}): Crucially, it returns a new observable that makes the profile request using the stored token.
The key here is that switchMap ensures that if a new login request comes in while the previous profile request is still in progress, the previous profile request is canceled, and only the latest profile request is processed. This is very important when users are rapidly clicking login buttons.
tap((profile) => {...}): Executes code when the profile data is received without altering the data stream.
return this.http.get(...): The inner observable returned by switchMap makes the request to get the user profile.
Why switchMap?

Cancellation: If a new login request is made before the profile request completes, switchMap cancels the previous profile request, preventing unnecessary or outdated requests.
Sequential Asynchronous Operations: It allows you to chain asynchronous operations where the result of one operation depends on the result of the previous one.
Clean and Concise Code: It simplifies the code by handling the asynchronous logic in a declarative way.
Alternative (Less Ideal): mergeMap or concatMap

If you used mergeMap or concatMap, all profile requests would be executed, even if the user rapidly clicked the login button. This could lead to multiple profile requests and potential race conditions.
In summary, switchMap is an excellent choice for authorization flows where you need to perform a sequence of asynchronous operations and ensure that only the latest operation's result is processed 
*/