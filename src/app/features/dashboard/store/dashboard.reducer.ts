import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions';
import { Cryptocurrency } from '../../../core/models/cryptocurrency.model';


export interface DashboardState {
  cryptocurrencies: Cryptocurrency[];
  loading: boolean;
  error: any;
}

export const initialState: DashboardState = {
  cryptocurrencies: [],
  loading: false,
  error: null
};

export const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadCryptocurrencies, state => ({ ...state, loading: true })),
  on(DashboardActions.loadCryptocurrenciesSuccess, (state, { cryptocurrencies }) => ({
    ...state,
    cryptocurrencies,
    loading: false
  })),
  on(DashboardActions.loadCryptocurrenciesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);


