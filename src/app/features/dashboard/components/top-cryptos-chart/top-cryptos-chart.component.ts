import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTopCryptocurrenciesByMarketCap } from '../../store/dashboard.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HighchartsComponent } from '../../../../shared/components/highcharts/highcharts.component';
import { MatCardModule } from '@angular/material/card';


 interface ChartItem {
  name: string;
  value: number;
  symbol: string;
  price: number;
  high24h: number,
  low24h: number,
}


@Component({
  selector: 'app-top-cryptos-chart',
  standalone: true,
  imports: [HighchartsComponent, AsyncPipe, MatCardModule],
  templateUrl: './top-cryptos-chart.component.html',
  styleUrl: './top-cryptos-chart.component.scss'
})
export class TopCryptosChartComponent {
  private store = inject(Store);

  chartData$: Observable<ChartItem[] | null>;

  constructor() {
    this.chartData$ = this.store.select(selectTopCryptocurrenciesByMarketCap);
  }
}
