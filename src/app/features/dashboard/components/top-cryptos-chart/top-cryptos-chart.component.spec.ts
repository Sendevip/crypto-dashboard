import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TopCryptosChartComponent } from './top-cryptos-chart.component';
import { provideMockStore } from '@ngrx/store/testing'; // Import NgRx mock store

describe('TopCryptosChartComponent', () => {
  let component: TopCryptosChartComponent;
  let fixture: ComponentFixture<TopCryptosChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TopCryptosChartComponent], 
      providers: [
        provideMockStore({})
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCryptosChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
