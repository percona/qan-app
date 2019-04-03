import {Component, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {QanFilterService} from './qan-filter.service';
import {FiltersService} from '../../inventory-api/services/filters.service';
import {GetProfileBody, QanTableService} from '../qan-table/qan-table.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {map, switchMap} from 'rxjs/operators';
import {FilterGroupModel} from './models/filter-group.model';
import {FilterLabelModel} from '../qan-search/filter-label.model';

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
  public filters: any;

  constructor(private qanFilterService: QanFilterService,
              private filterService: FiltersService,
              private qanTableService: QanTableService,
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
        this.qanFilterService.updateFilterConfigs(response);
        this.qanFilterService.updateAutocomplete(response)
      }
    );

    this.qanFilterService.filterSource.subscribe(
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
    this.qanFilterService.updateFilterConfigs(this.filters);
  }
}
