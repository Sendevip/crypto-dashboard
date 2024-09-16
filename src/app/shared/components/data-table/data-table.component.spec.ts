import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Import necessary Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('DataTableComponent', () => {
  let component: DataTableComponent<any>;
  let fixture: ComponentFixture<DataTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        DataTableComponent,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatOptionModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatCardModule,
        MatProgressBarModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent<any>);
    component = fixture.componentInstance;

    component.columns = [
      { name: 'ID', key: 'id', sortable: true, filterable: true },
      { name: 'Name', key: 'name', sortable: true, filterable: true },
      { name: 'Price', key: 'current_price', sortable: true, filterable: true },
    ];

    component.data = [
      {
        "id": "bitcoin",
        "symbol": "btc",
        "name": "Bitcoin",
        "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
        "current_price": 59157,
        "market_cap": 1168632882925,
        "market_cap_rank": 1,
        "fully_diluted_valuation": 1242297454225,
        "total_volume": 25728953461,
        "high_24h": 60367,
        "low_24h": 58231,
        "price_change_24h": -921.6761696468384,
        "price_change_percentage_24h": -1.53411,
        "market_cap_change_24h": -17933097318.939453,
        "market_cap_change_percentage_24h": -1.51134,
        "circulating_supply": 19754762,
        "total_supply": 21000000,
        "max_supply": 21000000,
        "ath": 73738,
        "ath_change_percentage": -20.1488,
        "ath_date": "2024-03-14T07:10:36.635Z",
        "atl": 67.81,
        "atl_change_percentage": 86733.051,
        "atl_date": "2013-07-06T00:00:00.000Z",
        "roi": null,
        "last_updated": "2024-09-16T08:28:00.968Z"
      },
      {
        "id": "ethereum",
        "symbol": "eth",
        "name": "Ethereum",
        "image": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
        "current_price": 2332.91,
        "market_cap": 280418731126,
        "market_cap_rank": 2,
        "fully_diluted_valuation": 280418731126,
        "total_volume": 14411798055,
        "high_24h": 2417.49,
        "low_24h": 2261.25,
        "price_change_24h": -82.62927128560023,
        "price_change_percentage_24h": -3.42074,
        "market_cap_change_24h": -10173232308.94281,
        "market_cap_change_percentage_24h": -3.50086,
        "circulating_supply": 120339716.024521,
        "total_supply": 120339716.024521,
        "max_supply": null,
        "ath": 4878.26,
        "ath_change_percentage": -52.54576,
        "ath_date": "2021-11-10T14:24:19.604Z",
        "atl": 0.432979,
        "atl_change_percentage": 534554.62266,
        "atl_date": "2015-10-20T00:00:00.000Z",
        "roi": {
          "times": 51.766817654095235,
          "currency": "btc",
          "percentage": 5176.681765409524
        },
        "last_updated": "2024-09-16T08:28:08.789Z"
      }
    ];

    const changes: SimpleChanges = {
      data: new SimpleChange(null, component.data, true),
      columns: new SimpleChange(null, component.columns, true),
    };
    component.ngOnChanges(changes);


    component.loading = false;
    component.totalItems = component.data.length;

    fixture.detectChanges();

    // Set up the displayed columns
    component.columnForm.get('columns')?.setValue(
      component.columns.map((col) => col.key)
    );
    fixture.detectChanges();

  });

  it('should create the table when Currency data is provided', () => {


    component.loading = false; 
    component.totalItems = component.data.length; 

    component.ngOnInit();

    fixture.detectChanges();

    // Assert
    const tableRows = fixture.debugElement.queryAll(By.css('mat-row'));
    expect(tableRows.length).toBe(2); // Expecting two rows for Bitcoin and Ethereum


    const firstRowCells = tableRows[0].queryAll(By.css('mat-cell'));
    expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('Bitcoin'); // Name column

    const secondRowCells = tableRows[1].queryAll(By.css('mat-cell'));
    expect(secondRowCells[1].nativeElement.textContent.trim()).toBe('Ethereum'); // Name column

    fixture.detectChanges();

    component.columnForm.get('columns')?.setValue(component.columns.map(col => col.key));
    fixture.detectChanges();
  });


  it('should sort the table data by Price in ascending order', () => {
    // Set up sorting
    component.sort.active = 'current_price';
    component.sort.direction = 'asc';
    component.sort.sortChange.emit();

    fixture.detectChanges();

    const tableRows = fixture.debugElement.queryAll(By.css('mat-row'));
    expect(tableRows.length).toBe(2); // Two rows (Bitcoin and Ethereum)
    
    const firstRowCells = tableRows[0].queryAll(By.css('mat-cell'));
    expect(firstRowCells[2].nativeElement.textContent.trim()).toBe('2332.91'); // Ethereum should be first in ascending order
  });

  it('should sort the table data by Price in descending order', () => {
    // Set up sorting
    component.sort.active = 'current_price';
    component.sort.direction = 'desc';
    component.sort.sortChange.emit();

    fixture.detectChanges();

    const tableRows = fixture.debugElement.queryAll(By.css('mat-row'));
    expect(tableRows.length).toBe(2); // Two rows (Bitcoin and Ethereum)
    
    const firstRowCells = tableRows[0].queryAll(By.css('mat-cell'));
    expect(firstRowCells[2].nativeElement.textContent.trim()).toBe('59157'); // Bitcoin should be first in descending order
  });

  
  it('should have search functionality', () => {
    // Arrange: (Already done in beforeEach)

    component.applyFilter({ target: { value: 'Ethereum' } } as any);
    fixture.detectChanges();


    // Assert
    const tableRows = fixture.debugElement.queryAll(By.css('mat-row'));
    expect(tableRows.length).toBe(1); // Expecting one row after filtering

    const cell = tableRows[0].query(By.css('mat-cell:nth-child(2)'));
    expect(cell.nativeElement.textContent.trim()).toBe('Ethereum');
  });


});

