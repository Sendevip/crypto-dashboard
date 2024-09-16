import { ChangeDetectionStrategy, Component, inject, signal, Signal } from '@angular/core';
import { ColumnConfiguration, DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { Observable } from 'rxjs';
import { CryptoApiRequest, Cryptocurrency } from '../../../../core/models/cryptocurrency.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { selectCryptocurrencies, selectDashboardLoading } from '../../store/dashboard.selectors';
import { AsyncPipe } from '@angular/common';
import { CryptoTableConfigService } from '../../services/crypto-table-config/crypto-table-config.service';
import { PageEvent } from '@angular/material/paginator';
import { loadCryptocurrencies } from '../../store/dashboard.actions';




@Component({
  selector: 'app-crypto-data-table',
  standalone: true,
  imports: [DataTableComponent, AsyncPipe],
  templateUrl: './crypto-data-table.component.html',
  styleUrl: './crypto-data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CryptoDataTableComponent {
  // private store = inject(Store<AppState>);
  private cryptoTableConfigService = inject(CryptoTableConfigService);
  cryptoTableColumns: ColumnConfiguration[];
  cryptocurrencies$: Observable<Cryptocurrency[] | null>;
  pageSizeOptions: number[] = [10, 20, 50, 100, 500];
  pageSize: number = 10;
  request: CryptoApiRequest = { currency: 'usd', order: 'market_cap_desc', perPage: 10, page: 1 };
  tableTitle: string = 'Crypto Currencies Table';

  totalCoins: number = 14600; // Static value based on request without pagination
  isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.cryptocurrencies$ = this.store.select(selectCryptocurrencies);
    this.cryptoTableColumns = this.cryptoTableConfigService.getCryptoTableColumns();
    this.isLoading$ = this.store.select(selectDashboardLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadCryptocurrencies({ request: this.request }));
  }


  onPageEvent(event: PageEvent) {
    console.log(event)
    this.request = {
      ...this.request,
      perPage: event.pageSize ?? this.request.perPage,
      page: event.pageIndex + 1 // API typically uses 1-based indexing
    };

    this.store.dispatch(loadCryptocurrencies({ request: this.request }));
  }

}