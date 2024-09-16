import { createAction, props } from '@ngrx/store';
import { CryptoApiRequest, Cryptocurrency } from '../../../core/models/cryptocurrency.model';

export const loadCryptocurrencies = createAction(
  '[Dashboard] Load Cryptocurrencies',
  props<{ request: CryptoApiRequest }>()
);
export const loadCryptocurrenciesSuccess = createAction(
  '[Dashboard] Load Cryptocurrencies Success',
  props<{ cryptocurrencies: Cryptocurrency[] }>()
);
export const loadCryptocurrenciesFailure = createAction(
  '[Dashboard] Load Cryptocurrencies Failure',
  props<{ error: any }>()
);
 