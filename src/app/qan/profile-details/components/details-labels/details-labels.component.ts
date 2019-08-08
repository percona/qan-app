import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObjectDetailsService } from '../../../../pmm-api-services/services/object-details.service';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Subscription } from 'rxjs/internal/Subscription';
import { QanProfileService } from '../../../profile/qan-profile.service';
import { FilterMenuService } from '../../../filter-menu/filter-menu.service';
import { FilterViewerService } from '../../../filter-menu/filter-viewer.service';

@Component({
  selector: 'app-details-labels',
  templateUrl: './details-labels.component.html',
  styleUrls: ['./details-labels.component.scss']
})
export class DetailsLabelsComponent implements OnInit, OnDestroy {
  private details$: Subscription;
  public labels: any = [];
  public isLoading: boolean;

  constructor(
    private objectDetailsService: ObjectDetailsService,
    private qanProfileService: QanProfileService,
    private filterMenuService: FilterMenuService,
    private filterViewerService: FilterViewerService,
  ) {
    this.isLoading = true;
    this.details$ = this.qanProfileService.getProfileInfo.details.pipe(
      switchMap(parsedParams => {
        this.isLoading = true;
        return this.getLabels(parsedParams)
      }))
      .subscribe(
        response => {
          if (response.length) {
            this.labels = this.filterViewerService.filtersOrder(response);
            this.filterViewerService.skipNA(this.labels);
            this.filterViewerService.sortIdsValues(this.labels);
          }
          this.isLoading = false;
        }
      );
  }

  ngOnInit() {
  }

  getLabels(responseParams) {
    return this.objectDetailsService.GetLabels(responseParams).pipe(
      catchError(err => of([])),
      map(response => this.filterMenuService.generateFilterGroup(response)),
      catchError(err => of([]))
    )
  }

  ngOnDestroy() {
    this.details$.unsubscribe();
  }
}
