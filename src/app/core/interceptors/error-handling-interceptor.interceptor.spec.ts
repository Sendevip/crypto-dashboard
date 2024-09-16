import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ErrorHandlingInterceptor } from './error-handling-interceptor.interceptor';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // <-- Add this

describe('ErrorHandlingInterceptor', () => {
  let interceptor: ErrorHandlingInterceptor;
  let snackbarService: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule], 
      providers: [
        ErrorHandlingInterceptor,
        SnackbarService
      ],
    });

    interceptor = TestBed.inject(ErrorHandlingInterceptor);
    snackbarService = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });


  it('should catch and handle HTTP errors', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: 'Test error',
      status: 404,
      statusText: 'Not Found',
    });
  
    const consoleErrorSpy = spyOn(console, 'error');
  
    const mockNext: HttpHandler = {
      handle: () => throwError(() => errorResponse)
    };
  
    const req = new HttpRequest('GET', '/test');
  
    (interceptor.intercept(req, mockNext) as Observable<HttpEvent<unknown>>).subscribe({
      error: (error: Error) => {
        expect(error.message).toContain('Sorry, we encountered a server connection error. Please try again later.');
        expect(consoleErrorSpy).toHaveBeenCalled();
        done();
      }
    });
  });
  it('should handle client-side errors', (done) => {
    const clientError = new Error('Test client error');
    const errorEvent = new ErrorEvent('Client Error', {
      error: clientError,
      message: 'Test client error message',
    });
  
    const consoleErrorSpy = spyOn(console, 'error');
  
    const mockNext: HttpHandler = {
      handle: () => throwError(() => errorEvent)
    };
  
    const req = new HttpRequest('GET', '/test');
  
    (interceptor.intercept(req, mockNext) as Observable<HttpEvent<unknown>>).subscribe({
      error: (error: Error) => {
        expect(error.message).toContain('Oops! Something went wrong. Please try again later.');
        expect(consoleErrorSpy).toHaveBeenCalled();
        done();
      }
    });
  });
  
  
  
});
