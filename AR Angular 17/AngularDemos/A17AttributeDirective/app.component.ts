import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent {
  isActive = false;
  isHighlighted = false;

  toggleActive(): void {
    this.isActive = !this.isActive;
  }

  toggleHighlighted(): void {
    this.isHighlighted = !this.isHighlighted;
  }
}
