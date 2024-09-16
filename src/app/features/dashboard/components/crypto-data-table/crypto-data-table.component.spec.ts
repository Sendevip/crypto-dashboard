import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CryptoDataTableComponent } from './crypto-data-table.component';
import { provideMockStore } from '@ngrx/store/testing'; // Import mock store utility

describe('CryptoDataTableComponent', () => {
  let component: CryptoDataTableComponent;
  let fixture: ComponentFixture<CryptoDataTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CryptoDataTableComponent
      ],
      providers: [
        provideMockStore({})
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
