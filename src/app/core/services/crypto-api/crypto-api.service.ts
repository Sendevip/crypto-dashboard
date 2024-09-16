import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CryptoApiRequest } from '../../models/cryptocurrency.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
}) 
export class CryptoApiService {
  private readonly API_URL = environment.cryptoApiUrl
  private http = inject(HttpClient);

  getCryptocurrencies(request: CryptoApiRequest): Observable<any> {
    const params = this.buildParams(request);

    return this.http.get(`${this.API_URL}/coins/markets`, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        const errorMessage = error.error?.message || error.message || 'Unknown error';
        return throwError(() => errorMessage);
      })
    );
  }

  private buildParams(request: CryptoApiRequest): HttpParams {
    let params = new HttpParams();

    if (request.currency) {
      params = params.set('vs_currency', request.currency);
    }
    if (request.order) {
      params = params.set('order', request.order);
    }
    if (request.perPage) {
      params = params.set('per_page', request.perPage.toString());
    }
    if (request.page) {
      params = params.set('page', request.page.toString());
    }

    params = params.set('sparkline', 'false');

    return params;
  }
}