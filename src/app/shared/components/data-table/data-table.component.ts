import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, inject, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource, } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatOptionModule, MatOptionSelectionChange } from '@angular/material/core';


export interface ColumnConfiguration {
  name: string;
  key: string;
  sortable: boolean;
  filterable: boolean;
  icon?: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, MatOptionModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatCardModule, MatProgressBarModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent<T> implements OnInit, OnDestroy {

  @Input() data: T[] = [];
  @Input() columns: ColumnConfiguration[] = [];
  @Input() pageSizeOptions: number[] = [10, 20, 50, 100];
  @Input() pageSize: number = 10;
  @Input() title: string = 'Data list';
  @Input() totalItems!: number;
  @Input() loading: boolean = true;

  @Output() filterChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<any>();
  @Output() rowSelected = new EventEmitter<any>();
  @Output() pageEvent = new EventEmitter<any>();

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnForm: FormGroup;
  dataSource: MatTableDataSource<T>;
  displayedColumns: string[] = [];
  selectedColumns: string[] = [];
  fieldAppearance:MatFormFieldAppearance = 'outline'
  private destroy$ = new Subject<void>();
  private fb = inject(FormBuilder);

  constructor() {
    this.dataSource = new MatTableDataSource<T>();
    this.columnForm = this.fb.group({
      columns: [[]]
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);

    this.dataSource.filterPredicate = this.createFilterPredicate();

    this.observeColumnSelection()
    this.selectAllColumns();
  } 

  ngAfterViewInit() {
    this.initDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.initDataSource();
    }
  }
  
  createFilterPredicate(): (data: any, filter: string) => boolean {
    return (data: any, filter: string): boolean => {
      const searchTerm = filter.trim().toLowerCase();
      return (
        data.name.toLowerCase().includes(searchTerm) ||
        data.symbol.toLowerCase().includes(searchTerm) ||
        data.current_price.toString().includes(searchTerm)
      );
    };
  }

  initDataSource() {
    if (this.data) {
      this.dataSource.data = this.data;
    }
  
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.generateColumns();
  }
  

  generateColumns() {
    this.displayedColumns = this.columns.map(column => column.key);
  }


  selectAllColumns() {
    const allColumnKeys = this.columns.map(column => column.key);
    this.columnForm.get('columns')?.setValue(['all', ...allColumnKeys]);
  }

  observeColumnSelection() {
    this.selectedColumns = this.columns.map(col => col.key);
    this.columnForm.get('columns')?.setValue(this.selectedColumns);
  
    this.columnForm.get('columns')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedColumns: string[]) => {
        this.selectedColumns = selectedColumns.filter((col: string) => col !== 'all');
        this.displayedColumns = this.selectedColumns;
      });
  }
  

  isAllSelected(): boolean {
    const selectedColumns = this.columnForm.get('columns')?.value || [];
    return selectedColumns.includes('all') || selectedColumns.length === this.columns.length;
  }
  
  
  toggleAllColumns(event: MatOptionSelectionChange) {
    const columnControl = this.columnForm.get('columns');
    const allColumnKeys = this.columns.map(column => column.key);
  
    if (event.isUserInput) {
      columnControl?.setValue(event.source.selected ? ['all', ...allColumnKeys] : []);
    }
  }
  


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  trackByFn(index: number, item: ColumnConfiguration): string {
    return item.key;
  }

  onPageEvent(event: PageEvent) {
    this.pageEvent.emit(event)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}