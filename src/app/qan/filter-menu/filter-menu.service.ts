import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class FilterMenuService {
  private filtersConfigsSource = new Subject<any>();

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
}
