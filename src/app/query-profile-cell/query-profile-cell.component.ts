import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-query-profile-cell',
  templateUrl: './query-profile-cell.component.html',
  styleUrls: ['./query-profile-cell.component.scss']
})
export class QueryProfileCellComponent implements OnInit, OnChanges {

  @Input() columnName: string;
  @Input() columnsConfiguration: any;
  @Input() row: any;
  @Input() profileTotal: any;

  public currentColumn: any;
  public isLoad: boolean;
  public isCount: boolean;
  public isLatency: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  checkCell(columnsConfiguration) {
    columnsConfiguration.forEach(item => {
      if (this.columnName === item.name) {
        return this.currentColumn = item;
      } else {
        return false;
      }
    });
  }

  ngOnChanges() {
    this.checkCell(this.columnsConfiguration);
    this.isLoad = this.columnName === 'Load';
    this.isCount = this.columnName === 'Count';
    this.isLatency = this.columnName === 'Avg Latency';
  }
}
