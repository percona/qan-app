import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-qan-table-cell',
  templateUrl: './qan-table-cell.component.html',
  styleUrls: ['./qan-table-cell.component.css']
})
export class QanTableCellComponent implements OnInit {
  @Input() metricData: any;
  @Input() sparklineData: any;

  public yKey: string;
  public measurement: string;
  public isNoData = false;

  constructor() {
  }

  ngOnInit() {
    this.setCurrentSparkline(this.metricData.metricName);
  }

  /**
   * Set sparkline type and display column for config parameters
   * @param name - checked column-type name
   */
  setCurrentSparkline(name: string) {
    switch (name) {
      case 'load':
        this.yKey = 'm_query_load';
        this.measurement = 'number';
        break;
      case 'Count':
        this.yKey = 'Query_count';
        this.measurement = 'number';
        break;
      case 'latancy':
        this.yKey = 'm_query_time_avg';
        this.measurement = 'time';
        break;
      case 'bytes_sent':
        this.yKey = 'm_bytes_sent_sum';
        this.measurement = 'size';
        break;
      case 'lock_time':
        this.yKey = 'm_lock_time_sum';
        this.measurement = 'number';
        break;
      case 'query_time':
        this.yKey = 'm_query_time_avg';
        this.measurement = 'time';
        break;
      default: {
        this.yKey = '';
        this.measurement = '';
        break;
      }
    }
  }

}
