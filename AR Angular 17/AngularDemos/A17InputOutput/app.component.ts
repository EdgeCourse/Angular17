import { Component } from '@angular/core';
import {ChildComponent} from './child/child.component';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ChildComponent]
})
export class AppComponent {
  title = 'IO';
  
  message = "Hello earthling"
  human = {name: "Count Dooku", email: "cd@example.com"}
 
  
myAge = 25


}
