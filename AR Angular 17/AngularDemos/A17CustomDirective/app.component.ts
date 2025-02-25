import { Component } from '@angular/core';
import { ToggleClassDirective } from './toggle-class.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToggleClassDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
