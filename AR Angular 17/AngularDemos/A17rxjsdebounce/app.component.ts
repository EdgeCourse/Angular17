import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [FormsModule],
  template: `
    <input type="text" [(ngModel)]="searchTerm" (input)="onInputChange()">
    <p>Search Term: {{ debouncedSearchTerm }}</p>
  `,
})
export class AppComponent {
  searchTerm: string = '';
  debouncedSearchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait 300ms after the last event
        distinctUntilChanged() // Only emit if the value has changed
      )
      .subscribe((searchTerm) => {
        this.debouncedSearchTerm = searchTerm;
        // Perform your search or other actions here
        console.log('Debounced search term:', searchTerm);
        //Example of calling an API:
        //this.searchService.search(searchTerm).subscribe(results => this.searchResults = results);
      });
  }

  onInputChange() {
    this.searchSubject.next(this.searchTerm);
  }
}

//If you have a search service:
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root',
// })
// export class SearchService {
//   constructor(private http: HttpClient) {}
//
//   search(term: string): Observable<any[]> {
//     // Replace with your actual API endpoint
//     return this.http.get<any[]>(`your-api-endpoint?query=${term}`);
//   }
// }

/* 
Import Necessary Modules:

Component from @angular/core for creating the component.
Subject from rxjs to create an observable that emits values.
debounceTime and distinctUntilChanged from rxjs/operators for debouncing and preventing duplicate emissions.
Component Properties:

searchTerm: Stores the current value of the input field.
debouncedSearchTerm: Stores the debounced search term that will be displayed.
searchSubject: A Subject that emits the input values.
Constructor:

The searchSubject is piped with debounceTime(300) and distinctUntilChanged().
debounceTime(300): Delays the emission of a value until 300 milliseconds have passed without any new values being emitted. This prevents rapid emissions from triggering unnecessary actions.
distinctUntilChanged(): Only emits a value if it is different from the previous emitted value. This prevents duplicate API calls or actions when the user types the same thing repeatedly.
The subscribe() method is used to listen for emitted values from the piped observable. Inside the subscribe() callback, you can perform your search or other actions using the debounced search term.
onInputChange() Method:

This method is called when the input field's value changes.
It emits the current value of searchTerm using this.searchSubject.next(this.searchTerm).
Template:

An input field is bound to the searchTerm property using [(ngModel)].
The (input) event is bound to the onInputChange() method.
The debouncedSearchTerm is displayed in a paragraph.
How it Works:

When the user types in the input field, the onInputChange() method is called, and the current value is emitted through the searchSubject.
debounceTime(300) waits for 300 milliseconds. If the user continues typing within that time, the timer is reset.
Once the user stops typing for 300 milliseconds, the latest value is emitted.
distinctUntilChanged makes sure that if the same string is typed twice in a row, the observable will not emit the second time.
The subscribe() method then receives the debounced value, and you can perform your desired actions, such as making an API call.
Important Considerations:

Adjust the debounceTime value to suit your needs. A longer delay will result in fewer emissions, while a shorter delay will result in more frequent emissions.
If you are making API calls, consider adding error handling and loading indicators.
The example search service code provided is a template, and you will need to replace the placeholder api endpoint with your own.
Make sure to import the FormsModule in your app module for ngModel to function.



*/