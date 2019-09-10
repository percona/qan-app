import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { SelectOptionModel } from './modesl/select-option.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';
import { QanProfileService } from '../profile/qan-profile.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { NgSelectComponent } from '@ng-select/ng-select';
import { metricCatalogue } from '../data/metric-catalogue';
import { ProfileTableComponent } from '../profile-table/profile-table.component';
import { GetProfileBody } from '../profile/interfaces/get-profile-body.interfaces';
import { QueryParamsService } from '../../core/services/query-params.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qan-table-header-cell',
  templateUrl: './table-header-cell.component.html',
  styleUrls: ['./table-header-cell.component.scss']
})
export class TableHeaderCellComponent implements OnInit, OnDestroy {
  public index: number;
  public isMainColumn: boolean;

  @ViewChild('column', { static: true }) column: NgSelectComponent;
  @Output() toEndOfTable = new EventEmitter();
  @Input() currentColumnName: any;
  @Input() fullData: any;
  @Input() rowMetrics: any;
  @Input() columnQuantity: any;

  @Input() set processIndex(index: number) {
    this.index = index;
    this.isMainColumn = !this.index;
  };

  private params$: Subscription;
  public metrics: any;
  public selectedQueryColumn: SelectOptionModel;
  public currentParams: GetProfileBody;
  public isEmpty: boolean;
  public isASC = false;
  public isNotDefaultIcon = false;
  public scrollbar: any;

  constructor(
    private qanProfileService: QanProfileService,
    private queryParamsService: QueryParamsService,
    private route: ActivatedRoute,
  ) {
    this.metrics = this.getUniqueObjects(Object.values(metricCatalogue));
    this.currentParams = this.qanProfileService.getProfileParams.getValue();
  }

  ngOnInit() {
    this.isEmpty = !this.currentColumnName;
    this.selectedQueryColumn = metricCatalogue[this.currentColumnName];
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

  getUniqueObjects(arr) {
    return Array.from(new Set(arr.map(a => a.humanizeName)))
      .map(name => arr.find(a => a.humanizeName === name))
  }


  setMetricColumn(value) {
    if (!value.simpleName) {
      return;
    }

    this.currentParams.columns[this.index] = value.simpleName;
    this.currentParams.columns = this.currentParams.columns.filter(item => !!item);

    if (this.isMainColumn) {
      const processedName = value.simpleName;
      this.currentParams.order_by = `-${processedName}`;
      this.currentParams.main_metric = processedName;
      this.queryParamsService.addSortingOrderToURL(this.currentParams.order_by);
      this.qanProfileService.updateDefaultMainMetric(processedName);
    }

    this.qanProfileService.updateProfileParams(this.currentParams);
    setTimeout(() => this.queryParamsService.addColumnsToURL(this.currentParams.columns), 0);
  }

  sortBy(selectedColumn) {
    this.isASC = !this.isASC;
    this.currentParams.order_by = this.isASC ? selectedColumn.simpleName : `-${selectedColumn.simpleName}`;
    this.queryParamsService.addSortingOrderToURL(this.currentParams.order_by);
    this.qanProfileService.updateProfileParams(this.currentParams);
  }

  addCustomScroll() {
    if (this.index === this.columnQuantity) {
      this.toEndOfTable.emit();
    }
    setTimeout(() => {
      this.scrollbar = new PerfectScrollbar('.ng-dropdown-panel-items')
    }, 0)
  }

  onSearch() {
    setTimeout(() => {
      this.scrollbar.update();
    }, 0);
  }
}
