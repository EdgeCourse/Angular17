import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = {
    name: '',
    email: ''
  };

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form Submitted!', this.user);
      form.reset(); // Clears the form inputs
      // Optionally reset the user object if you use it elsewhere
      this.user = { name: '', email: '' };
    } else {
      console.log('Form is invalid');
    }
  }
}
