import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { FiltersSearchModel } from './models/filters-search.model';

@Injectable()
export class FilterMenuService {

  private filtersConfigsSource = new Subject<any>();
  private autocompleteSource = new Subject();
  private selectedSource = new Subject();
  private filtersInitialSource: FiltersSearchModel[][];
  private autocomplete: any;

  constructor() {
  }

  /**
   * Set current state of filter config
   * @param configs - collection of filter config
   */
  updateFilterConfigs(configs: any) {
    this.filtersConfigsSource.next(configs)
  }

  updateAutocomplete(config) {
    const auto = config.map(group => group.items.map(item => new FiltersSearchModel(group.filterGroup, item)));
    this.autocompleteSource.next([].concat(...auto))
  }

  updateSelected(selected) {
    this.selectedSource.next(selected)
  }

  /**
   * Provide access for private variable
   */
  get filterSource() {
    return this.filtersConfigsSource;
  }

  set setFiltersInitialState(state: any) {
    this.filtersInitialSource = state;
  }

  get getFilterInitialState(): FiltersSearchModel[][] {
    return this.filtersInitialSource;
  }

  set setAutocomplete(config) {
    this.autocomplete = config.map(group => group.items.map(item => new FiltersSearchModel(group.filterGroup, item)));
  }

  get getAutocomplete() {
    return this.autocompleteSource
  }
}
