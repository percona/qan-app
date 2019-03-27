import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { QanTableService } from '../qan-table/qan-table.service';
import { SelectOptionModel } from './modesl/select-option.model';

@Component({
  selector: 'app-qan-table-header-cell',
  templateUrl: './qan-table-header-cell.component.html',
  styleUrls: ['./qan-table-header-cell.component.css']
})
export class QanTableHeaderCellComponent implements OnInit {
  @Input() currentColumnName: any;
  @Input() fullData: any;
  @Input() metrics: Array<SelectOptionModel>;
  @Input() index: any;

  public selectedQueryColumn: SelectOptionModel;

  constructor() {
  }

  ngOnInit() {
    this.selectedQueryColumn = this.metrics.filter(option => option.name === this.currentColumnName)[0];
  }

  removeColumn() {
    this.fullData.forEach(item => item.metrics.splice(this.index, 1));
  }
}
