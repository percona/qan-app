import { Component, Input, OnInit } from '@angular/core';
import { SelectOptionModel } from './modesl/select-option.model';
import { QanTableService } from '../qan-table/qan-table.service';

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

  constructor(private qanTableService: QanTableService) {
  }

  ngOnInit() {
    this.selectedQueryColumn = this.metrics.filter(option => option.name === this.currentColumnName)[0];
  }

  removeColumn() {
    this.fullData.forEach(item => item.metrics.splice(this.index, 1));
  }

  setMetricColumn(value, index) {
    this.qanTableService.getProfileParamsState.columns[index] = value.name;
    this.qanTableService.getProfileParamsState.columns = this.qanTableService.getProfileParamsState.columns.filter(item => !!item);
    this.qanTableService.setProfileParams(this.qanTableService.getProfileParamsState);
  }

  sortBy(selectedColumn) {
    this.qanTableService.getProfileParamsState.order_by = selectedColumn.name;
    this.qanTableService.setProfileParams(this.qanTableService.getProfileParamsState);
    console.log('this.qanTableService.getProfileParamsState - ', this.qanTableService.getProfileParamsState);
  }
}
