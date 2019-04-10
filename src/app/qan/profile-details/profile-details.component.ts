import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { catchError, retryWhen, switchMap } from 'rxjs/operators';
import { MetricsService } from '../../pmm-api-services/services/metrics.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { QanProfileService } from '../profile/qan-profile.service';
import { FilterMenuService } from '../filter-menu/filter-menu.service';

@Component({
  moduleId: module.id,
  selector: 'app-query-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})

export class ProfileDetailsComponent implements OnInit, AfterViewChecked {
  protected dbName: string;
  public fingerprint: string;
  public currentParams: any;
  public dimension: string;
  public details: any;
  event = new Event('showSuccessNotification');

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected qanProfileService: QanProfileService,
    protected metricsService: MetricsService,
  ) {
    this.qanProfileService.getProfileInfo.details.pipe(
      switchMap(parsedParams => {
        this.currentParams = parsedParams;
        this.dimension = this.currentParams.filter_by;
        return this.metricsService.GetMetrics(parsedParams).pipe(
          catchError(err => throwError(err))
        )
      }),
      retryWhen(error => error)
    ).subscribe(response => this.details = response);

    this.qanProfileService.getProfileInfo.fingerprint.subscribe(fingerprint => this.fingerprint = fingerprint);
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
  }
}
