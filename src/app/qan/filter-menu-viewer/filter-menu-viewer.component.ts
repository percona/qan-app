import { Component, OnDestroy, OnInit } from '@angular/core';
import { QanProfileService } from '../profile/qan-profile.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FilterMenuService } from '../filter-menu/filter-menu.service';
import { FiltersService } from '../../pmm-api-services/services/filters.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { FilterViewerService } from '../filter-menu/filter-viewer.service';
import { QueryParamsService } from '../../core/services/query-params.service';
import { GetProfileBody } from '../profile/interfaces/get-profile-body.interfaces';

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
  private getFilters$: Subscription;
  public filters: any = [];
  public isLoading: boolean;

  constructor(
    private filterMenuService: FilterMenuService,
    private filterService: FiltersService,
    private qanFilterService: FilterMenuService,
    private qanProfileService: QanProfileService,
    private queryParamsService: QueryParamsService,
    private filterViewerService: FilterViewerService,
  ) {
    this.isLoading = true;
    this.currentParams = this.qanProfileService.getProfileParams.getValue();

    this.filterMenuService.getSelected.pipe(
      catchError(err => of([]))
    ).subscribe(response => {
      const labels = this.prepareLabelsURLParams(response);
      this.getFilters(labels);
    });

  }

  prepareLabelsURLParams(labels) {
    const arr = [];
    labels.forEach(item => {
      const existed = arr.find(it => it.key === item.groupName);
      if (!existed) {
        arr.push({ key: item.groupName, value: [item.filterName] })
      } else {
        existed.value.push(item.filterName);
      }
    });
    return arr;
  }

  getFilters(labels: any[] = []) {
    this.getFilters$ = this.qanProfileService.getDefaultMainMetric.pipe(
      switchMap(metricName => {
        this.isLoading = true;
        return this.filterService.Get(
          {
            main_metric_name: metricName,
            period_start_from: this.currentParams.period_start_from,
            period_start_to: this.currentParams.period_start_to,
            labels: labels
          }).pipe(
            catchError(err => of({ error: err.error })),
            map(response =>
              response['error'] ? [] : this.filterMenuService.generateFilterGroup(response))
          )
      }))
      .subscribe(
        filters => {
          this.filters = this.filterViewerService.filtersOrder(filters);
          this.filters = this.filterViewerService.skipIDFilters(this.filters);
          this.filterViewerService.skipNA(this.filters);
          this.filterViewerService.sortIdsValues(this.filters);
          this.filterMenuService.updateAutocompleteFilters(this.filters);
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
  }

  ngOnDestroy() {
    this.getFilters$.unsubscribe();
  }
}
