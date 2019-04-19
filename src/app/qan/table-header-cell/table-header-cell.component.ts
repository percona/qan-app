import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SelectOptionModel } from './modesl/select-option.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';
import { GetProfileBody, QanProfileService } from '../profile/qan-profile.service';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-qan-table-header-cell',
  templateUrl: './table-header-cell.component.html',
  styleUrls: ['./table-header-cell.component.scss']
})
export class TableHeaderCellComponent implements OnInit, OnDestroy {
  @Input() currentColumnName: any;
  @Input() fullData: any;
  @Input() metrics: Array<SelectOptionModel>;
  @Input() index: any;
  @Input() rowMetrics: any;

  private params$: Subscription;
  public selectedQueryColumn: SelectOptionModel;
  public currentParams: GetProfileBody;
  public isASC = false;
  public isNotDefaultIcon = false;

  constructor(private qanProfileService: QanProfileService) {
    this.currentParams = this.qanProfileService.getProfileParams.getValue();
  }

  ngOnInit() {
    this.selectedQueryColumn = this.metrics.filter(option => option.name === this.currentColumnName)[0];
    this.params$ = this.qanProfileService.getProfileParams.pipe(
      map(params => params.order_by)
    ).subscribe(
      order => {
        this.isNotDefaultIcon = this.currentColumnName === order || `-${this.currentColumnName}` === order;
        this.isASC = !(`-${this.currentColumnName}` === order);
      })
  }

  ngOnDestroy() {
    this.params$.unsubscribe();
  }

  removeColumn() {
    this.fullData.forEach(item => item.metrics.splice(this.index, 1));
    this.currentParams.columns.splice(this.index, 1);
  }

  setMetricColumn(value) {
    if (!value.name) {
      return;
    }

    this.currentParams.columns[this.index] = value.name;
    this.currentParams.columns = this.currentParams.columns.filter(item => !!item);
    this.qanProfileService.updateProfileParams(this.currentParams);
  }

  sortBy(selectedColumn) {
    this.isASC = !this.isASC;
    this.currentParams.order_by = this.isASC ? selectedColumn.name : `-${selectedColumn.name}`;
    this.qanProfileService.updateProfileParams(this.currentParams);
  }

  addCustomScroll() {
    setTimeout(() => new PerfectScrollbar('.ng-dropdown-panel-items'), 0)
  }
}
