import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Injectable()
@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private snackbarService: SnackbarService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse | ErrorEvent) => {
        let errorMsg = '';
        if (error instanceof ErrorEvent) {
          // Client-side error
          errorMsg = 'Oops! Something went wrong. Please try again later.';
        } else {
          // Server-side error
          errorMsg = 'Sorry, we encountered a server connection error. Please try again later.';
        }
        this.snackbarService.showError(errorMsg); // Use snackbar service to display errors
        console.error(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}

