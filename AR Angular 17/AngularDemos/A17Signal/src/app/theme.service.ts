import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<'light' | 'dark'>(this.getStoredTheme());

  constructor() {
    effect(() => {
      document.body.classList.toggle('dark-mode', this.theme() === 'dark');
      localStorage.setItem('theme', this.theme());
    });
  }

  toggleTheme() {
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }

  private getStoredTheme(): 'light' | 'dark' {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  }
}
