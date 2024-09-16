import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then(c => c.DashboardComponent ),
    children: [
      { path: '', redirectTo: 'currencies-table', pathMatch: 'full' },
      {
        path: 'currencies-table',
        loadComponent: () => import('./components/crypto-data-table/crypto-data-table.component').then(c => c.CryptoDataTableComponent)
      },
      {
        path: 'currencies-chart',
        loadComponent: () => import('./components/top-cryptos-chart/top-cryptos-chart.component').then(c => c.TopCryptosChartComponent)
      },
    ]
  }
];