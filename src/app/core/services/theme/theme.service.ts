import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<'light-theme' | 'dark-theme'>('light-theme');


  toggleTheme(): void {
    this.theme.update(currentTheme => 
      currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme'
    );
  }

  applyTheme(theme: string): void {
    document.body.className = theme;
  }
}
