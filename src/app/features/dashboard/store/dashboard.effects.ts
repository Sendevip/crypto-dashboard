import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as DashboardActions from './dashboard.actions';
import { CryptoApiService } from '../../../core/services/crypto-api/crypto-api.service';


@Injectable()
export class DashboardEffects {

  private actions$ = inject(Actions)
  private cryptoApiService = inject(CryptoApiService)

  loadCryptocurrencies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadCryptocurrencies),
      switchMap((action) =>
        this.cryptoApiService.getCryptocurrencies(action.request).pipe(
          map(cryptocurrencies => DashboardActions.loadCryptocurrenciesSuccess({ cryptocurrencies })),
          catchError(error => of(DashboardActions.loadCryptocurrenciesFailure({ error })))
        )
      )
    )
  );

}
