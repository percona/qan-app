import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { FilterGroupModel } from './models/filter-group.model';

@Injectable()
export class QanFilterService {

  private filtersConfigsSource = new Subject<FilterGroupModel[]>();

  constructor() {
  }

  /**
   * Set current state of filter config
   * @param config - collection of filter config
   */
  updateFilterConfigs(config: FilterGroupModel[]) {
    this.filtersConfigsSource.next(config)
  }

  /**
   * Provide access for private variable
   */
  get filterSource(): Subject<FilterGroupModel[]> {
    return this.filtersConfigsSource;
  }
}
