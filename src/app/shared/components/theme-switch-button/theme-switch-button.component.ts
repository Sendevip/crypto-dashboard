import { Component, ViewEncapsulation, computed, effect, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule }  from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../../core/services/theme/theme.service';

@Component({
  selector: 'ui-theme-switch-button',
  standalone:true,
  imports:[MatSlideToggleModule, MatIconModule, CommonModule, MatButtonModule],
  providers: [ThemeService], // Provide ThemeService
  template: `
  <button mat-icon-button (click)="toggleTheme()">
      <mat-icon color="primary" *ngIf="isDarkMode()">light_mode</mat-icon>
      <mat-icon color="primary" *ngIf="!isDarkMode()">dark_mode</mat-icon>
  </button>
  `,
  styleUrls: ['./theme-switch-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeSwitchButtonComponent {
  private themeService = inject(ThemeService);

  isDarkMode = computed(() => this.themeService.theme() === 'dark-theme' ? true : false)

  constructor() {
    // Call the effect function to subscribe to changes in `theme` signal
    effect(() => {
      this.themeService.applyTheme(this.themeService.theme());
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
