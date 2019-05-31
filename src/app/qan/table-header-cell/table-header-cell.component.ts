import { Component, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SelectOptionModel } from './modesl/select-option.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';
import { GetProfileBody, QanProfileService } from '../profile/qan-profile.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-qan-table-header-cell',
  templateUrl: './table-header-cell.component.html',
  styleUrls: ['./table-header-cell.component.scss']
})
export class TableHeaderCellComponent implements OnInit, OnDestroy {
  public index: number;
  public isMainColumn: boolean;

  @Input() currentColumnName: any;
  @Input() fullData: any;
  @Input() metrics: Array<SelectOptionModel>;

  @Input() set processIndex(index: number) {
    this.index = index;
    this.isMainColumn = !this.index;
  };

  @Input() rowMetrics: any;
  @ViewChild('column') column: NgSelectComponent;

  private params$: Subscription;
  public selectedQueryColumn: SelectOptionModel;
  public currentParams: GetProfileBody;
  public isEmpty: boolean;
  public isASC = false;
  public isNotDefaultIcon = false;

  constructor(private qanProfileService: QanProfileService) {
    this.currentParams = this.qanProfileService.getProfileParams.getValue();
  }

  ngOnInit() {
    this.isEmpty = !this.currentColumnName;
    this.selectedQueryColumn = this.metrics.filter(option => option.name === this.currentColumnName)[0];
    this.params$ = this.qanProfileService.getProfileParams.pipe(
      map(params => params.order_by)
    ).subscribe(
      order => {
        this.isNotDefaultIcon = this.currentColumnName === order || `-${this.currentColumnName}` === order;
        this.isASC = !(`-${this.currentColumnName}` === order);
      });
    if (this.isEmpty) {
      this.column.open();
    }
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

    if (this.isMainColumn) {
      this.qanProfileService.updateDefaultMainMetric(this.changeDefaultName(value.name));
    }
  }

  sortBy(selectedColumn) {
    this.isASC = !this.isASC;
    this.currentParams.order_by = this.isASC ? selectedColumn.name : `-${selectedColumn.name}`;
    this.qanProfileService.updateProfileParams(this.currentParams);
  }

  addCustomScroll() {
    setTimeout(() => new PerfectScrollbar('.ng-dropdown-panel-items'), 0)
  }

  changeDefaultName(name) {
    switch (name) {
      case 'load':
      case 'latency':
        return 'm_query_time_sum';
      case 'count':
        return 'num_queries';
      default:
        return `m_${name}_sum`
    }
  }
}
