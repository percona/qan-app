import { Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { FilterMenuService } from './filter-menu.service';
import { FiltersService } from '../../pmm-api-services/services/filters.service';
import { GetProfileBody, ProfileTableService } from '../profile-table/profile-table.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { map, switchMap } from 'rxjs/operators';
import { FilterGroupModel } from './models/filter-group.model';
import { FilterLabelModel } from '../search-autocomplete/models/filter-label.model';

@Component({
  selector: 'app-qan-filter',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('tabs') tabs: NgbTabset;

  private filter$: Subscription;
  public profileParams: GetProfileBody;
  public limits = {};
  public defaultLimit = 4;
  private filterSubscription: any;
  public filters: any;

  constructor(private filterMenuService: FilterMenuService,
    private filterService: FiltersService,
    private qanTableService: ProfileTableService,
  ) {
    this.profileParams = this.qanTableService.getProfileParamsState;
    this.qanTableService.getTimeRange.pipe(
      switchMap(timeRange => this.filterService.Get(timeRange)
        .pipe(
          map(response => {
            const entries = Object.entries(response.labels);
            return entries.map(entire => new FilterGroupModel(entire));
          }))
      )
    ).subscribe(
      response => {
        this.filterMenuService.updateFilterConfigs(response);
      }
    );

    this.filterMenuService.filterSource.subscribe(
      filters => {
        this.filters = filters;
        const filtered = this.filters.map(filtersItem => new FilterLabelModel(filtersItem.filterGroup, filtersItem.items));
        this.profileParams.labels = filtered.filter(filteredItem => filteredItem.value.length);
        this.qanTableService.updateProfileParams(this.profileParams);
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

  setConfigs(filter, group) {
    this.filterMenuService.updateFilterConfigs(this.filters);
  }
}
