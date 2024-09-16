import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighchartsComponent } from './highcharts.component';
import * as Highcharts from 'highcharts';

describe('HighchartsComponent', () => {
  let component: HighchartsComponent<any>;
  let fixture: ComponentFixture<HighchartsComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HighchartsComponent<any>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should be created', () => {
    // Ensure the component instance is created successfully
    expect(component).toBeTruthy();
  });
  

  
});
