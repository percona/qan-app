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
  }
}
