import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { QanProfileService } from '../profile/qan-profile.service';
import { ObjectDetailsService } from '../../pmm-api-services/services/object-details.service';
import { MetricModel } from '../profile-table/models/metric.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { of } from 'rxjs/internal/observable/of';
import { DetailsSparklineModel } from './models/details-sparkline.model';

@Component({
  moduleId: module.id,
  selector: 'app-query-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})

export class ProfileDetailsComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('detailsTable') detailsTable: ElementRef;
  @ViewChildren('detailsTableRows') tableRows: QueryList<any>;
  @ViewChild('labels') labelsFilters: ElementRef;
  protected dbName: string;
  public fingerprint: string;
  public currentParams: any;
  public dimension: string;
  public isTotal = false;
  public details: MetricModel[] = [];
  private fingerprint$: Subscription;
  private group_by$: Subscription;
  private details$: Subscription;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected qanProfileService: QanProfileService,
    protected objectDetailsService: ObjectDetailsService,
  ) {
    this.details$ = this.qanProfileService.getProfileInfo.details.pipe(
      switchMap(parsedParams => {
        this.currentParams = parsedParams;
        return this.objectDetailsService.GetMetrics(parsedParams).pipe(
          catchError(err => of({ metrics: [], sparkline: [] })),
          map(response => {
            const withData = Object.entries(response.metrics).filter(metricData => Object.keys(metricData[1]).length);
            return withData.map(withDataItem => {
              const sparklineData = this.createSparklineModel(response.sparkline, withDataItem[0]);
              return new MetricModel(withDataItem, sparklineData)
            });
          }),
          catchError(err => of([]))
        )
      }),
    ).subscribe(response => {
      this.details = response;
      this.isTotal = !this.currentParams.filter_by;

      if (this.details.length) {
        setTimeout(() => this.setLabelsHeight(), 0);
      }
    });

    this.fingerprint$ = this.qanProfileService.getProfileInfo.fingerprint
      .subscribe(fingerprint => this.fingerprint = fingerprint);

    this.group_by$ = this.qanProfileService.getGroupBy
      .subscribe(() => this.details = [])
  }

  ngOnInit() {
  }

  createSparklineModel(sparklines, name) {
    return sparklines.map(item => new DetailsSparklineModel(item, name))
  }

  ngOnDestroy() {
    this.fingerprint$.unsubscribe();
    this.details$.unsubscribe();
    this.group_by$.unsubscribe();
  }

  ngAfterViewChecked() {
    this.setLabelsHeight();
  }

  setLabelsHeight() {
    const tableHeight = this.detailsTable.nativeElement.offsetHeight;
    this.labelsFilters.nativeElement.style.setProperty('--labels-height', `${tableHeight}px`);
  }
}
