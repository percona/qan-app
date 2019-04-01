import { Component, Input, OnInit } from '@angular/core';
import { SelectOptionModel } from './modesl/select-option.model';
import { GetProfileBody, QanTableService } from '../qan-table/qan-table.service';

@Component({
  selector: 'app-qan-table-header-cell',
  templateUrl: './qan-table-header-cell.component.html',
  styleUrls: ['./qan-table-header-cell.component.scss']
})
export class QanTableHeaderCellComponent implements OnInit {
  @Input() currentColumnName: any;
  @Input() fullData: any;
  @Input() metrics: Array<SelectOptionModel>;
  @Input() index: any;
  @Input() rowMetrics: any;

  public selectedQueryColumn: SelectOptionModel;
  public profileParams: GetProfileBody;

  constructor(private qanTableService: QanTableService) {
    this.profileParams = this.qanTableService.getProfileParamsState;
  }

  ngOnInit() {
    this.selectedQueryColumn = this.metrics.filter(option => option.name === this.currentColumnName)[0];
  }

  removeColumn() {
    this.fullData.forEach(item => item.metrics.splice(this.index, 1));
    this.profileParams.columns.splice(this.index, 1);
    console.log('removeColumn columns - ', this.profileParams.columns);
  }

  setMetricColumn(value) {
    if (!value.name) { return; }

    this.profileParams.columns[this.index] = value.name;
    this.profileParams.columns = this.profileParams.columns.filter(item => !!item);
    this.qanTableService.updateProfileParams(this.profileParams);
  }

  sortBy(selectedColumn) {
    this.profileParams.order_by = selectedColumn.name;
    this.qanTableService.updateProfileParams(this.profileParams);
  }
}
