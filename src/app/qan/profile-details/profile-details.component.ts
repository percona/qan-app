import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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

export class ProfileDetailsComponent implements OnInit {
  protected dbName: string;
  public fingerprint: string;
  event = new Event('showSuccessNotification');

  constructor(protected route: ActivatedRoute,
    protected router: Router,
    protected qanProfileService: QanProfileService,
    protected metricsService: MetricsService) {
    this.qanProfileService.objectDetailsSource.pipe(
      switchMap(parsedParams => this.metricsService.GetMetrics(parsedParams)
        .pipe(
          catchError(err => {
            console.log('catch err details - ', err);
            return throwError(err)
          }),
        )),
      retryWhen(error => error)
    ).subscribe(
      response => console.log('response details - ', response),
      err => console.log('err details - ', err)
    )
  }

  ngOnInit() { }
}
