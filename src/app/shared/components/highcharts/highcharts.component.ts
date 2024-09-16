import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-highcharts',
  standalone: true,
  imports: [HighchartsChartModule],
  template: `
    <highcharts-chart
      [Highcharts]="Highcharts"
      [options]="chartOptions"
      style="width: 100%; height: 400px; display: block;">
    </highcharts-chart>
  `
})
export class HighchartsComponent<T extends { [key: string]: any }> implements OnChanges {
  @Input() chartOptions: Highcharts.Options = {};
  @Input() data: T[] = [];
  @Input() chartType: string = 'bar';
  @Input() title: string = '';
  @Input() xAxisTitle: string = '';
  @Input() yAxisTitle: string = '';
  @Input() seriesName: string = '';
  @Input() nameKey: keyof T = 'name';
  @Input() valueKey: keyof T = 'value';

  Highcharts: typeof Highcharts = Highcharts;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['chartType'] || changes['title'] || changes['theme']) {
      this.updateChartOptions();
    }
  }

  private updateChartOptions() {
    this.chartOptions = {
      chart: {
        type: this.chartType as any
      },
      title: {
        text: this.title
      },
      xAxis: {
        categories: this.data.map(item => String(item[this.nameKey])),
        title: {
          text: this.xAxisTitle
        }
      },
      yAxis: {
        title: {
          text: this.yAxisTitle
        }
      },
      series: [{
        name: this.seriesName,
        type: this.chartType as any,
        data: this.data.map(item => ({
          y: item[this.valueKey],
          name: item[this.nameKey],
          ...item
        }))
      }],
      tooltip: {
        formatter: function() {
          let tooltipContent = `
          <b>${this.point.name} (${(this.point as any).symbol}) </b><br><br>
          <b>Value:</b> ${(this.point as any).value}$<br>
          <b>Price:</b> ${(this.point as any).price}$<br>
          <b>High 24h:</b> ${(this.point as any).high24h}$<br>
          <b>Low 24h:</b> ${(this.point as any).low24h}$`;
          return tooltipContent;
        }      }
    };
  }
}