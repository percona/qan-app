import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class DetailsLabelsComponent implements OnInit, OnDestroy {
  private details$: Subscription;
  private defaultLabels$: Subscription;
  public currentDetails: any;
  public labels: any = [];
  public isLoading: boolean;

  constructor(
    private objectDetailsService: ObjectDetailsService,
    private qanProfileService: QanProfileService,
    private filterMenuService: FilterMenuService,
  ) {
    this.isLoading = true;
    this.currentDetails = this.qanProfileService.getCurrentDetails;
    this.details$ = this.qanProfileService.getProfileInfo.details.pipe(
      switchMap(parsedParams => {
        this.isLoading = true;
        return this.getLabels(parsedParams)
      }))
      .subscribe(
        response => {
          this.labels = this.filtersOrder(response);
          this.sortEmptyValues(this.labels);
          this.isLoading = false;
        }
      );
  }

  ngOnInit() {
    this.defaultLabels$ = this.getLabels(this.currentDetails)
      .pipe(take(1))
      .subscribe(response => {
        this.labels = this.filtersOrder(response);
        this.sortIdsValues(this.labels);
        this.isLoading = false;
      })
  }

  getLabels(responseParams) {
    return this.objectDetailsService.GetLabels(responseParams).pipe(
      catchError(err => of([])),
      map(response => this.filterMenuService.generateFilterGroup(response)),
      catchError(err => of([]))
    )
  }

  ngOnDestroy() {
    this.defaultLabels$.unsubscribe();
    this.details$.unsubscribe();
  }

  filtersOrder(detailsTableData) {
    return detailsTableData.sort((a, b) => this.sortFilters(a, b));
  }

  sortFilters(a, b) {
    const order = ['environment', 'cluster', 'replication_set', 'database', 'schema', 'server', 'client_host', 'user_name', ''];

    let indA = order.indexOf(a['filterGroup']);
    let indB = order.indexOf(b['filterGroup']);

    if (indA === -1) {
      indA = order.length - 1;
    }

    if (indB === -1) {
      indB = order.length - 1;
    }

    return indA < indB ? -1 : 1;
  }

  sortEmptyValues(array) {
    array.sort((a, b) => {
      if (a.items.every(item => item.value === '') || a.items.every(item => item.value === null)) {
        return 1
      }
      if (b.items.every(item => item.value === '') || b.items.every(item => item.value === null)) {
        return -1
      }
    });
  }

  sortIdsValues(array) {
    array.sort((a, b) => {
      if (a.items.every(label => label.value.includes('_id'))) {
        return 1
      }

      if (b.items.every(label => label.value.includes('_id'))) {
        return -1
      }
    })
  }
}
