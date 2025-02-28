import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  template: `
    <p *ngIf="results">User: {{ results[0]?.name }}, Post: {{ results[1]?.title }}</p>
  `,
})
export class AppComponent {
  results: any;

  constructor(private http: HttpClient) {
    forkJoin([
      this.http.get('https://jsonplaceholder.typicode.com/users/1'),
      this.http.get('https://jsonplaceholder.typicode.com/posts/1'),
    ]).subscribe((results) => (this.results = results));
  }
}
/*
Make parallel HTTP requests using forkJoin from RxJS. Here's a breakdown of its purpose and functionality:

Purpose:

Fetching Data Concurrently: The primary goal is to fetch data from two different endpoints simultaneously. Instead of waiting for one request to complete before starting the other, forkJoin allows both requests to be initiated at the same time. This can significantly improve performance, especially when dealing with multiple independent data sources.
Combining Results: After both requests complete successfully, forkJoin combines the results into a single array. This makes it easy to work with the data from both sources within the component.
Displaying Combined Data: The component then displays specific data from the combined results in the template.
Functionality Breakdown:

Imports:

Component: Imports the Angular Component decorator, which is used to define the component.
HttpClient: Imports the HttpClient service, which is used to make HTTP requests.
forkJoin: Imports the forkJoin function from RxJS, which is used to execute multiple observables (like HTTP requests) in parallel.
Component Decorator:

selector: 'app-parallel': Defines the selector that will be used to include the component in other templates.
template: Defines the component's template, which displays the fetched data. The *ngIf="results" directive ensures that the data is only displayed after the requests have completed and the results array is populated.
Component Class:

results: any;: Declares a property results to store the combined results from the HTTP requests.
constructor(private http: HttpClient): Injects the HttpClient service into the component's constructor.
forkJoin([...]).subscribe((results) => (this.results = results));: This is the core logic:
forkJoin([ ... ]): Creates an observable that emits an array of results when all the provided observables complete.
this.http.get('https://jsonplaceholder.typicode.com/users/1'): Makes an HTTP GET request to fetch user data from the JSONPlaceholder API.
this.http.get('https://jsonplaceholder.typicode.com/posts/1'): Makes an HTTP GET request to fetch post data from the JSONPlaceholder API.
.subscribe((results) => (this.results = results)): Subscribes to the forkJoin observable. When both requests complete, the callback function is executed. The results parameter in the callback function is an array containing the responses from both HTTP requests, and it is assigned to the component's results property.
Template Display:

*ngIf="results": This conditional directive only displays the paragraph if the results property has a value, ensuring the component doesn't attempt to access undefined data.
User: {{ results[0]?.name }}, Post: {{ results[1]?.title }}: This part displays the name of the user (from the first request) and the title of the post (from the second request). The ?. operator is the optional chaining operator, which prevents errors if the data is not available.
In essence, this component efficiently retrieves and displays related data from two separate API endpoints by leveraging the power of forkJoin for parallel execution.

*/