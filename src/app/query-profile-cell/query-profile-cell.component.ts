import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-query-profile-cell',
  templateUrl: './query-profile-cell.component.html',
  styleUrls: ['./query-profile-cell.component.scss']
})
export class QueryProfileCellComponent implements OnInit, OnChanges {

  @Input() cellName: string;
  @Input() cellConfiguration: any;
  @Input() row: any;
  @Input() profileTotal: any;

  public currentCell: any;

  constructor() {
  }

  ngOnInit() {
  }

  checkCell(cellConfiguration) {
    cellConfiguration.forEach(item => {
      if (this.cellName === item.name) {
        return this.currentCell = item;
      } else {
        return false;
      }
    });
  }

  ngOnChanges() {
    this.checkCell(this.cellConfiguration);
  }
}
