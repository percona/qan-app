import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FilterMenuService } from './filter-menu.service';
import { FiltersService } from '../../pmm-api-services/services/filters.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';
import { FilterGroupModel } from './models/filter-group.model';
import { FilterLabelModel } from '../search-autocomplete/models/filter-label.model';
import { GetProfileBody, QanProfileService } from '../profile/qan-profile.service';

@Component({
  selector: 'app-qan-filter',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent implements OnInit, OnDestroy, OnChanges {
  public currentParams: GetProfileBody;
  public limits = {};
  public defaultLimit = 4;
  private filterSubscription: Subscription;
  public filters: any;

  constructor(
    private filterMenuService: FilterMenuService,
    private filterService: FiltersService,
    private qanProfileService: QanProfileService,
  ) {
    this.currentParams = JSON.parse(JSON.stringify(this.qanProfileService.getProfileParams.getValue()));

    this.filterService.Get({
      period_start_from: this.currentParams.period_start_from,
      period_start_to: this.currentParams.period_start_to
    }).pipe(
      map(response => this.generateFilterGroup(response))
    ).subscribe(
      response => this.filterMenuService.updateFilterConfigs(response)
    );

    this.filterMenuService.filterSource.subscribe(
      filters => {
        this.filters = filters;
        this.currentParams.labels = this.prepareLabels(filters);
        // this.qanProfileService.updateProfileParams(this.currentParams);
      });
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

  prepareLabels(filters) {
    const filtered = filters.map(filtersItem => new FilterLabelModel(filtersItem.filterGroup, filtersItem.items));
    return filtered.filter(filteredItem => filteredItem.value.length);
  }

  getAll(group) {
    this.limits[group.name] = this.limits[group.name] <= this.defaultLimit ? group.values.length - 1 : this.defaultLimit;
  }

  generateFilterGroup(group) {
    return Object.entries(group.labels).map(entire => new FilterGroupModel(entire));
  }

  setConfigs(filter, group) {
    this.filterMenuService.updateFilterConfigs(this.filters);
  }
}
