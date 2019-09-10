import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SelectOptionModel } from '../table-header-cell/modesl/select-option.model';
import { TableDataModel } from './models/table-data.model';
import { MetricModel } from './models/metric.model';
import { ProfileService } from '../../pmm-api-services/services/profile.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { QanProfileService } from '../profile/qan-profile.service';
import { of } from 'rxjs/internal/observable/of';
import { GetProfileBody } from '../profile/interfaces/get-profile-body.interfaces';
import { QueryParamsService } from '../../core/services/query-params.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-qan-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.scss']
})
export class ProfileTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() finishRender = new EventEmitter();
  @ViewChild(PerfectScrollbarComponent, { static: true }) componentRef?: PerfectScrollbarComponent;
  @ViewChild('qanTable', { static: true }) qanTable: ElementRef;
  @ViewChild('rightTableBorder', { static: false }) rightBorder: ElementRef;
  @ViewChild('mainTableWrapper', { static: true }) mainTableWrapper: ElementRef;
  @ViewChildren('tableRows') tableRows: QueryList<any>;
  private destroy$ = new Subject();

  public scrollbarConfig: PerfectScrollbarConfigInterface = {
    suppressScrollY: true
  };

  public isLoading: boolean;
  public tableData: TableDataModel[] | any;
  public currentParams: GetProfileBody;
  public detailsBy: string;
  public fingerprint: string;
  public report$: Subscription;
  public detailsBy$: Subscription;
  public fingerprint$: Subscription;
  public metrics: SelectOptionModel[];
  public isNeedScroll = false;
  public event = new Event('hideTooltip');

  public selectPaginationConfig = [10, 50, 100];
  public paginationConfig = {
    id: 'qan-table-pagination',
    itemsPerPage: this.selectPaginationConfig[0],
    currentPage: 1,
    totalItems: 0,
  };

  public currentPage = this.paginationConfig.currentPage;
  public perPage = this.paginationConfig.itemsPerPage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qanProfileService: QanProfileService,
    private profileService: ProfileService,
    private queryParamsService: QueryParamsService,
  ) {
    this.isLoading = true;

    this.report$ = this.qanProfileService.getProfileParams.pipe(
      takeUntil(this.destroy$),
      map(params => {
        this.currentParams = params;
        return params;
      }),
      switchMap(parsedParams => {
        this.isLoading = true;

        return this.profileService.GetReport(parsedParams).pipe(
          catchError(err => {
            console.log('error - ', err);
            return of([])
          }),
          map(data => this.generateTableData(data)),
          catchError(err => {
            console.log('error - ', err);
            return of([])
          })
        )
      }),
    ).subscribe(
      data => {
        this.tableData = data;
        this.isLoading = false;
      },
      err => {
        console.log('error - ', err)
      },
      () => {
        console.log('complete');
      }
    );

    this.detailsBy$ = this.qanProfileService.getProfileInfo.detailsBy
      .pipe(takeUntil(this.destroy$))
      .subscribe(details_by => this.detailsBy = details_by);
    this.fingerprint$ = this.qanProfileService.getProfileInfo.fingerprint
      .pipe(takeUntil(this.destroy$))
      .subscribe(fingerprint => this.fingerprint = fingerprint);
  }

  ngOnInit() {
    this.detailsBy = this.route.snapshot.queryParams.filter_by;
  }

  ngAfterViewInit() {
    this.tableRows.changes.subscribe(() => {
      this.ngForRendered();
      this.finishRender.emit(true);
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  ngForRendered() {
    if (this.isNeedScroll) {
      this.toEndOfScrollbar();
    }
    this.isNeedScroll = false;
    window.dispatchEvent(this.event);
    setTimeout(() => {
      const height = this.qanTable.nativeElement.offsetHeight;
      this.rightBorder.nativeElement.style.setProperty('--border-height', `${height}px`);
    }, 0);
  }

  toEndOfScrollbar() {
    setTimeout(() => {
      this.componentRef.directiveRef.scrollToRight()
    }, 0);
  }

  showDetails(row: TableDataModel) {
    this.qanProfileService.updateFingerprint(row.fingerprint || '');
    this.qanProfileService.updateDetailsByValue(row.dimension);
    this.queryParamsService.addDetailsToURL(row.dimension);
    this.qanProfileService.updateObjectDetails({
      filter_by: row.dimension,
      group_by: this.currentParams.group_by,
      labels: this.currentParams.labels,
      period_start_from: this.currentParams.period_start_from,
      period_start_to: this.currentParams.period_start_to,
      tables: row.tables
    });
  }

  mapOrder(array, order, key) {
    array.sort((a, b) => {
      const A = a[key];
      const B = b[key];
      if (order.indexOf(A) > order.indexOf(B)) {
        return 1;
      } else {
        return -1;
      }
    });

    return array;
  };

  generateTableData(data) {
    this.paginationConfig.totalItems = data['total_rows'];
    this.paginationConfig.itemsPerPage = data['limit'];
    this.paginationConfig.currentPage = this.currentPage = data['offset'] ? data['offset'] / data['limit'] + 1 : 1;
    const tableRows = data['rows'].map(row => new TableDataModel(row));

    tableRows.forEach(row => {
      row.metrics = row.metrics.filter(metric => this.currentParams.columns.includes(metric.metricName));
      row.metrics = this.mapOrder(row.metrics, this.currentParams.columns, 'metricName');
    });
    return tableRows;
  }


  addColumn() {
    this.tableData.forEach(query => query.metrics.push(new MetricModel()));
    setTimeout(() => this.componentRef.directiveRef.scrollToRight(), 100);
    this.isNeedScroll = true;
  }

  pageChanged(event) {
    this.currentParams.offset = this.perPage * (event - 1);
    this.qanProfileService.updateProfileParams(this.currentParams);
  }

  onChangePerPage(event) {
    this.currentParams.limit = this.perPage = this.paginationConfig.itemsPerPage = event;
    this.qanProfileService.updateProfileParams(this.currentParams);
  }

}
