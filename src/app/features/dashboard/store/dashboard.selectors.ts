import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectCryptocurrencies = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.cryptocurrencies
);

export const selectDashboardLoading = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.loading
);

export const selectDashboardError = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.error
);


export const selectTopCryptocurrenciesByMarketCap = createSelector(
  selectDashboardState,
  (state: DashboardState) => [...state.cryptocurrencies] // create a new array
    .sort((a, b) => b.market_cap - a.market_cap)
    .slice(0, 10)
    .map(crypto => ({
      name: crypto.name,
      value: crypto.market_cap,
      symbol: crypto.symbol,
      price: crypto.current_price,
      high24h: crypto.high_24h,
      low24h: crypto.low_24h,
    })
  )
);
