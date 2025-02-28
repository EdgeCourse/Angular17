import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button (click)="toggleTheme()">Switch to {{ oppositeTheme() }} mode</button>
  `,
  styles: [`
    button {
      padding: 10px;
      font-size: 16px;
      border: none;
      cursor: pointer;
      background-color: var(--btn-bg);
      color: var(--btn-text);
      border-radius: 5px;
    }
  `]
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);
  theme = this.themeService.theme;

  oppositeTheme = signal(() => (this.theme() === 'light' ? 'dark' : 'light'));

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
