import { Component, OnDestroy } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [HttpClientModule],
  template: `
    <p>Current Post Title: {{ post?.title }}</p>
  `,
})
export class AppComponent implements OnDestroy {
  post: any;
  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = interval(5000) // Poll every 5 seconds
      .pipe(switchMap(() => this.http.get('https://jsonplaceholder.typicode.com/posts/1')))
      .subscribe((post) => (this.post = post));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

/*
The primary benefits of using RxJS in the provided Angular component are:

Asynchronous Data Handling:

RxJS is designed to handle asynchronous operations, which are essential for dealing with HTTP requests. The http.get() method returns an Observable, which represents a stream of data that will arrive asynchronously.
This allows the component to continue executing other tasks while waiting for the HTTP response.
Periodic Polling with interval:

The interval(5000) operator creates an Observable that emits a sequence of numbers at a specified interval (every 5 seconds). This is perfect for implementing periodic polling, where you need to repeatedly fetch data from a server.
Stream Transformation with switchMap:

The switchMap operator is crucial for handling the scenario where a new HTTP request is made before the previous one has completed.
It ensures that only the latest HTTP response is processed, effectively canceling any pending requests when a new interval emission occurs. This is important to prevent race conditions and unnecessary network traffic.
This is very important in this case. Without switchMap, if the http request took longer than 5 seconds, multiple requests could be running at the same time, and the responses could arrive out of order, and cause unexpected behavior.
Subscription Management:

RxJS provides the Subscription object, which allows you to manage and control the flow of data.
In the ngOnDestroy lifecycle hook, the subscription.unsubscribe() method is called to prevent memory leaks by stopping the interval and HTTP request streams when the component is destroyed.
Without this, the interval would continue to fire, and http requests would continue to be made, even after the component is no longer being displayed.
Declarative Approach:

RxJS promotes a declarative approach to asynchronous programming, making the code more readable and maintainable.
Instead of writing imperative code to manage timers and callbacks, you can use RxJS operators to define the flow of data in a clear and concise way.
In essence, RxJS provides a powerful and efficient way to handle asynchronous operations, periodic polling, and stream management in Angular applications. It enhances the component's ability to react to changes in data over time, all while preventing memory leaks and race conditions.
*/