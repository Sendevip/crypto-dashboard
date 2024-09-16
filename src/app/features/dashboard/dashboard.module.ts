import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';
import { provideEffects } from '@ngrx/effects';
import { DashboardEffects } from './store/dashboard.effects';

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes),
  ],
  providers: [
    provideEffects([DashboardEffects]),
  ]
})
export class DashboardModule { }
