import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  private defaultConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  };

  showSuccess(message: string, action: string = 'Close', config?: MatSnackBarConfig) {
    this.show(message, action, { ...this.defaultConfig, ...config, panelClass: ['success-snackbar'] });
  }

  showError(message: string, action: string = 'Close', config?: MatSnackBarConfig) {
    this.show(message, action, { ...this.defaultConfig, ...config, panelClass: ['error-snackbar'] });
  }

  showWarning(message: string, action: string = 'Close', config?: MatSnackBarConfig) {
    this.show(message, action, { ...this.defaultConfig, ...config, panelClass: ['warning-snackbar'] });
  }

  showInfo(message: string, action: string = 'Close', config?: MatSnackBarConfig) {
    this.show(message, action, { ...this.defaultConfig, ...config, panelClass: ['info-snackbar'] });
  }

  private show(message: string, action: string, config: MatSnackBarConfig) {
    this.snackBar.open(message, action, config);
  }
}
