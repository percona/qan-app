import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { FilterGroupModel } from './models/filter-group.model';
import { FilterLabelModel } from '../search-autocomplete/models/filter-label.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class FilterMenuService {
  private filtersConfigsSource = new Subject<any>();
  private selected = new BehaviorSubject([]);

  constructor() {
  }

  /**
   * Set current state of filter config
   * @param configs - collection of filter config
   */
  updateFilterConfigs(configs: any) {
    this.filtersConfigsSource.next(configs)
  }

  /**
   * Provide access for private variable
   */
  get filterSource() {
    return this.filtersConfigsSource;
  }

  get getSelected() {
    return this.selected
  }

  updateSelected(newSelected) {
    this.selected.next(newSelected);
  }

  generateFilterGroup(group) {
    const filters = Object.entries(group.labels).map(entire => !this.isEmptyObject(entire[1]) ? new FilterGroupModel(entire) : {});
    return filters.filter(item => !this.isEmptyObject(item));
  }

  isEmptyObject(obj) {
    return !Object.keys(obj).length
  }

  prepareLabels(filters) {
    const filtered = filters.map(filtersItem => new FilterLabelModel(filtersItem.filterGroup, filtersItem.items));
    return filtered.filter(filteredItem => filteredItem.value.length);
  }
}
