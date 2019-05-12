import { Component, OnInit } from '@angular/core';
import { ObjectDetailsService } from '../../../../pmm-api-services/services/object-details.service';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Subscription } from 'rxjs/internal/Subscription';
import { QanProfileService } from '../../../profile/qan-profile.service';
import { FilterMenuService } from '../../../filter-menu/filter-menu.service';

@Component({
  selector: 'app-details-labels',
  templateUrl: './details-labels.component.html',
  styleUrls: ['./details-labels.component.scss']
})
export class DetailsLabelsComponent implements OnInit {
  private details$: Subscription;
  private defaultLabels$: Subscription;
  public currentDetails: any;
  public labels: any;

  constructor(
    private objectDetailsService: ObjectDetailsService,
    private qanProfileService: QanProfileService,
    private filterMenuService: FilterMenuService,
    private qanFilterService: FilterMenuService,
  ) {
    this.currentDetails = this.qanProfileService.getCurrentDetails;
    this.details$ = this.qanProfileService.getProfileInfo.details.pipe(
      switchMap(parsedParams => this.getLabels(parsedParams)))
      .subscribe(
        response => this.labels = response
      );
    this.qanFilterService.getSelected.subscribe(response => console.log('details - ', response));
  }

  ngOnInit() {
    this.defaultLabels$ = this.getLabels(this.currentDetails)
      .pipe(take(1))
      .subscribe(response => this.labels = response)
  }

  getLabels(responseParams) {
    return this.objectDetailsService.GetLabels(responseParams).pipe(
      map(response => this.filterMenuService.generateFilterGroup(response)),
      catchError(err => of({ query_examples: [] }))
      // map(response => response.query_examples),
      // catchError(err => of([])))
    )
  }

  // this.getFilters$ = this.filterService.Get({
  //   period_start_from: this.currentParams.period_start_from,
  //   period_start_to: this.currentParams.period_start_to
  // }).pipe(
  //   map(response => this.filterMenuService.generateFilterGroup(response))
  // ).subscribe(
  //   response => {
  //     if (response.length) {
  //       this.filterMenuService.updateFilterConfigs(response)
  //     }
  //   }
  // );

  // this.filterSubscription$ = this.filterMenuService.filterSource.subscribe(
  //   filters => {
  //     this.filters = filters;
  //     this.currentParams.labels = this.filterMenuService.prepareLabels(filters);
  //     this.qanProfileService.updateProfileParams(this.currentParams);
  //   });
  // }

}
