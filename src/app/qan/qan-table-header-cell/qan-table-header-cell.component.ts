import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SelectOptionModel } from './modesl/select-option.model';
import { GetProfileBody, QanTableService } from '../qan-table/qan-table.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-qan-table-header-cell',
  templateUrl: './qan-table-header-cell.component.html',
  styleUrls: ['./qan-table-header-cell.component.scss']
})
export class QanTableHeaderCellComponent implements OnInit, OnDestroy {
  @Input() currentColumnName: any;
  @Input() fullData: any;
  @Input() metrics: Array<SelectOptionModel>;
  @Input() index: any;
  @Input() rowMetrics: any;

  private params$: Subscription;
  public selectedQueryColumn: SelectOptionModel;
  public profileParams: GetProfileBody;
  public isDESC = false;
  public isNotDefaultIcon = false;

  constructor(private qanTableService: QanTableService) {
    this.profileParams = this.qanTableService.getProfileParamsState;
  }

  ngOnInit() {
    this.selectedQueryColumn = this.metrics.filter(option => option.name === this.currentColumnName)[0];
    this.params$ = this.qanTableService.profileParamsSource.pipe(
      map(params => params.order_by)
    ).subscribe(
      order => {
        this.isNotDefaultIcon = this.currentColumnName === order || `-${this.currentColumnName}` === order;
      })
  }

  ngOnDestroy() {
    this.params$.unsubscribe();
  }

  removeColumn() {
    this.fullData.forEach(item => item.metrics.splice(this.index, 1));
    this.profileParams.columns.splice(this.index, 1);
  }

  setMetricColumn(value) {
    if (!value.name) {
      return;
    }

    this.profileParams.columns[this.index] = value.name;
    this.profileParams.columns = this.profileParams.columns.filter(item => !!item);
    this.qanTableService.updateProfileParams(this.profileParams);
  }

  sortBy(selectedColumn) {
    this.isDESC = !this.isDESC;
    this.profileParams.order_by = this.isDESC ? selectedColumn.name : `-${selectedColumn.name}`;
    this.qanTableService.updateProfileParams(this.profileParams);
  }
}
