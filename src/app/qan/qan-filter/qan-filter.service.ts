import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { FilterGroupModel } from './models/filter-group.model';
import { FiltersSearchModel } from './models/filters-search.model';

@Injectable()
export class QanFilterService {

  private filtersConfigsSource = new Subject<FiltersSearchModel[][]>();
  private filtersInitialSource: FiltersSearchModel[][];

  // private filtersAutocompleteSource = new Subject<FiltersSearchModel[]>();

  constructor() {
  }

  /**
   * Set current state of filter config
   * @param configs - collection of filter config
   */
  updateFilterConfigs(configs: FiltersSearchModel[][]) {
    this.filtersConfigsSource.next(configs)
  }

  /**
   * Provide access for private variable
   */
  get filterSource(): Subject<FiltersSearchModel[][]> {
    return this.filtersConfigsSource;
  }

  set setFiltersInitialState(state: FiltersSearchModel[][]) {
    this.filtersInitialSource = state;
  }

  get getFilterInitialState(): FiltersSearchModel[][] {
    return this.filtersInitialSource;
  }

  // get autocompleteSource(): Subject<FiltersSearchModel[]> {
  //   return this.filtersAutocompleteSource;
  // }
}
