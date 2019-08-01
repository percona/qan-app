import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetProfileBody, QanProfileService } from '../profile/qan-profile.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FilterMenuService } from '../filter-menu/filter-menu.service';
import { FiltersService } from '../../pmm-api-services/services/filters.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { QueryParamsService } from '../../core/services/query-params.service';

export interface FiltersGetParams {
  main_metric_name: string,
  period_start_from: string,
  period_start_to: string
}

@Component({
  selector: 'app-filter-menu-viewer',
  templateUrl: './filter-menu-viewer.component.html',
  styleUrls: ['./filter-menu-viewer.component.css']
})

export class FilterMenuViewerComponent implements OnInit, OnDestroy {

  public currentParams: GetProfileBody;
  private filterSubscription$: Subscription;
  private getFilters$: Subscription;
  public filters: any = [];
  public isLoading: boolean;

  constructor(
    private filterMenuService: FilterMenuService,
    private filterService: FiltersService,
    private qanFilterService: FilterMenuService,
    private qanProfileService: QanProfileService,
    private queryParamsService: QueryParamsService,
  ) {
    this.isLoading = true;
    this.currentParams = this.qanProfileService.getProfileParams.getValue();

    this.getFilters$ = this.qanProfileService.getDefaultMainMetric.pipe(
      switchMap(metricName => {
        this.isLoading = true;
        return this.filterService.Get(
          {
            main_metric_name: metricName,
            period_start_from: this.currentParams.period_start_from,
            period_start_to: this.currentParams.period_start_to
          }).pipe(
            catchError(err => of({ error: err.error })),
            map(response =>
              response['error'] ? [] : this.filterMenuService.generateFilterGroup(response))
          )
      }))
      .subscribe(
        filters => {
          this.filters = this.filtersOrder(filters);
          this.skipNA(this.filters);
          this.sortIdsValues(this.filters);
          this.filterMenuService.updateAutocompleteFilters(filters);
          this.isLoading = false;
        },
        err => {
          console.log('err filters - ', err);
          this.isLoading = false;
        },
        () => {
          console.log('complete');
        }
      );
  }

  ngOnInit() {
    const params = this.queryParamsService.params;
    if (params.filters) {
      this.queryParamsService.decodeSelected(params.filters);
    }
  }

  ngOnDestroy() {
    this.getFilters$.unsubscribe();
    this.filterSubscription$.unsubscribe();
  }

  filtersOrder(detailsTableData) {
    return detailsTableData.sort((a, b) => this.sortFilters(a, b));
  }

  sortFilters(a, b) {
    const order = ['environment', 'cluster', 'replication_set', 'database', 'schema', 'server', 'client_host', 'username', ''];

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

  skipNA(array) {
    array.forEach(group => group.items.every(label => !label.value) ? group.items.length = 0 : group.items);
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
