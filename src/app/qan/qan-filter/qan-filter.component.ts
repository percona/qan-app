import { Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { QanFilterService } from './qan-filter.service';
import { FiltersService } from '../../inventory-api/services/filters.service';
import { GetProfileBody, QanTableService } from '../qan-table/qan-table.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { map, switchMap } from 'rxjs/operators';
import { FilterGroupModel } from './models/filter-group.model';
import { FiltersSearchModel } from './models/filters-search.model';

@Component({
  selector: 'app-qan-filter',
  templateUrl: './qan-filter.component.html',
  styleUrls: ['./qan-filter.component.scss']
})
export class QanFilterComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('tabs') tabs: NgbTabset;

  private filter$: Subscription;
  public profileParams: GetProfileBody;
  public limits = {};
  public defaultLimit = 4;
  private filterSubscription: any;
  public filters: FiltersSearchModel[][];

  constructor(private qanFilterService: QanFilterService,
    private filterService: FiltersService,
    private qanTableService: QanTableService,
  ) {
    this.profileParams = this.qanTableService.getProfileParamsState;
    this.qanTableService.profileParamsSource.pipe(
      map(params => new Object(
        {
          period_start_from: params.period_start_from,
          period_start_to: this.profileParams.period_start_to
        })),
      switchMap(timeRange => this.filterService.Get(timeRange)
        .pipe(
          map(response => {
            const entries = Object.entries(response.labels);
            const groups = entries.map(entire => new FilterGroupModel(entire));
            return groups.map(group => group.items.map(item => new FiltersSearchModel(group.filterGroup, item)));
          }))
      )
    ).subscribe(
      response => {
        console.log('response - ', response);
        this.qanFilterService.updateFilterConfigs(response);
      }
    );

    this.qanFilterService.filterSource.subscribe(
      filters => {
        this.filters = filters;
        this.qanTableService.setFiltersState = this.filters;
      });
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

  getAll(group) {
    this.limits[group.name] = this.limits[group.name] <= this.defaultLimit ? group.values.length - 1 : this.defaultLimit;
  }

  // checkFilterGroup(index: number, filter: FiltersSearchModel): boolean {
  //   if (!(index - 1)) {
  //     return true
  //   } else {
  //     return filter.groupName !== this.filters[index - 1].groupName
  //   }
  // }

  //
  setConfigs() {
    this.qanFilterService.updateFilterConfigs(this.filters);
  }
}
