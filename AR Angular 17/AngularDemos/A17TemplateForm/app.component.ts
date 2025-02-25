import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule]
})
export class AppComponent {
  user = {
    name: '',
    email: ''
  };

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form Submitted!', this.user);
      // You can perform additional actions here.
    }
  }
}
