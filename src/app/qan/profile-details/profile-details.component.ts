import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { catchError, retryWhen, switchMap } from 'rxjs/operators';
import { MetricsService } from '../../pmm-api-services/services/metrics.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { QanProfileService } from '../profile/qan-profile.service';

@Component({
  moduleId: module.id,
  selector: 'app-query-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})

export class ProfileDetailsComponent implements OnInit, AfterViewChecked {
  protected dbName: string;
  public fingerprint: string;
  public dimension: string;
  event = new Event('showSuccessNotification');

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected qanProfileService: QanProfileService,
    protected metricsService: MetricsService
  ) {
    this.qanProfileService.getProfileInfo.details.pipe(
      switchMap(parsedParams => this.metricsService.GetMetrics(parsedParams)
        .pipe(
          catchError(err => throwError(err))
        )),
      retryWhen(error => error)
    ).subscribe(
      response => {
        console.log('response details - ', response);
        this.dimension = this.qanProfileService.getProfileInfo.detailsBy;
        this.fingerprint = this.qanProfileService.getProfileInfo.fingerprint
      },
      err => console.log('err details - ', err)
    )
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
  }
}
