import { Injectable } from '@angular/core';
import { ColumnConfiguration } from '../../../../shared/components/data-table/data-table.component';

@Injectable({
  providedIn: 'root'
})
export class CryptoTableConfigService {
  private readonly cryptoTableColums: ColumnConfiguration[] = [
    {
      name: 'ID',
      key: 'id',
      sortable: true,
      filterable: true,
    },
    {
      name: 'Name',
      key: 'name',
      sortable: true,
      filterable: true,
    },
    {
      name: 'Current price',
      key: 'current_price',
      sortable: true,
      filterable: true,
    },
    {
      name: 'Market cap',
      key: 'market_cap',
      sortable: true,
      filterable: true,
    },
    {
      name: 'High 24h',
      key: 'high_24h',
      sortable: true,
      filterable: true,
    },
    {
      name: 'Low 24h',
      key: 'low_24h',
      sortable: true,
      filterable: true,
    },
    {
      name: 'Price change percentage 24h',
      key: 'price_change_percentage_24h',
      sortable: true,
      filterable: true,
    },
    {
      name: 'Circulating supply',
      key: 'circulating_supply',
      sortable: true,
      filterable: true,
    },
  ];

  getCryptoTableColumns(): ColumnConfiguration[] {
    return this.cryptoTableColums
  }

}
