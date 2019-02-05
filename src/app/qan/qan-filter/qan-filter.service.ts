import {Injectable} from '@angular/core';
import {QanFilterGroupsModel} from '../../core/models/qan-filter-groups.model';
import {BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class QanFilterService {

  private filtersConfigsSource = new BehaviorSubject([]);

  constructor() {
  }

  /**
   * Get configuration from server and modify it by models
   */
  getFilterConfigs() {
    this.setFilterConfigs([
        {
          name: 'Schemas',
          parameters:
            ['performance_schema', 'wordpress', 'my_DB1', 'my_DB2', 'innodb_2', 'performance_schema-1', 'wordpress-1',
              'my_DB1-1', 'my_DB2-1', 'innodb_2-1']
        },
        {
          name: 'Servers',
          parameters: ['mdb101', 'mdb102', 'ps55', 'ps57myrocks', 'pxc56-2', 'mdb101-1', 'mdb102-1', 'ps55-1', 'ps57myrocks-1', 'pxc56-2-1']
        },
        {
          name: 'Users',
          parameters: ['wp_user', 'pmm', 'sysbench']
        },
        {
          name: 'Hosts',
          parameters: ['127.0.0.1', '192.168.1.1', '172.56.33.5']
        },
      ].map((items) => new QanFilterGroupsModel(items, localStorage.getItem(items.name))));
  }

  /**
   * Set current state of filter config
   * @param config - collection of filter config
   */
  setFilterConfigs(config: QanFilterGroupsModel[]) {
    this.filtersConfigsSource.next(config)
  }

  /**
   * Provide access for private variable
   */
  get filterSource() {
    return this.filtersConfigsSource;
  }
}
