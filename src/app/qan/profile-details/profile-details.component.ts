import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { catchError, map, retryWhen, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { QanProfileService } from '../profile/qan-profile.service';
import { ObjectDetailsService } from '../../pmm-api-services/services/object-details.service';
import { MetricModel } from '../profile-table/models/metric.model';

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
  public details: MetricModel[] = [];

  event = new Event('showSuccessNotification');

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected qanProfileService: QanProfileService,
    protected objectDetailsService: ObjectDetailsService,
  ) {
    this.qanProfileService.getProfileInfo.details.pipe(
      switchMap(parsedParams => {
        this.currentParams = parsedParams;
        this.dimension = this.currentParams.filter_by;
        return this.objectDetailsService.GetMetrics(parsedParams).pipe(
          map(metrics => Object.entries(metrics.metrics).map(detail => new MetricModel(detail))),
          catchError(err => throwError(err))
        )
      }),
      retryWhen(error => error)
    ).subscribe(response => {
      this.details = response.filter(item => Object.keys(item.stats).length > 0);
      console.log('details - ', this.details);
    });

    this.qanProfileService.getProfileInfo.fingerprint.subscribe(fingerprint => this.fingerprint = fingerprint);
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
  }
}
