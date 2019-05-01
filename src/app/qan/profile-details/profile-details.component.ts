import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { QanProfileService } from '../profile/qan-profile.service';
import { ObjectDetailsService } from '../../pmm-api-services/services/object-details.service';
import { MetricModel } from '../profile-table/models/metric.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { of } from 'rxjs/internal/observable/of';

@Component({
  moduleId: module.id,
  selector: 'app-query-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})

export class ProfileDetailsComponent implements OnInit, AfterViewChecked, OnDestroy {
  protected dbName: string;
  public fingerprint: string;
  public currentParams: any;
  public dimension: string;
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
          catchError(err => of({ metrics: [] })),
          map(metrics => Object.entries(metrics.metrics).map(detail => new MetricModel(detail))),
          catchError(err => of([]))
        )
      }),
    ).subscribe(response => {
      this.details = response.filter(item => Object.keys(item.stats).length > 0);
    });

    this.fingerprint$ = this.qanProfileService.getProfileInfo.fingerprint
      .subscribe(fingerprint => this.fingerprint = fingerprint);

    this.group_by$ = this.qanProfileService.getGroupBy
      .subscribe(() => this.details = [])
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
  }

  ngOnDestroy() {
    this.fingerprint$.unsubscribe();
    this.details$.unsubscribe();
    this.group_by$.unsubscribe();
  }
}
