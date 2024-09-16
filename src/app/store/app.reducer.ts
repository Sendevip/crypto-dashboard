import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state'; // Ensure this defines the complete state of your app
import { dashboardReducer } from '../features/dashboard/store/dashboard.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  dashboard: dashboardReducer
};
