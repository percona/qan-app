import {Injectable} from '@angular/core';
import {FilterItemsStates} from './filter-items-states';

@Injectable()
export class QanFilterService {

  constructor() {
  }

  getItems() {
    return [
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
      ].map((items) => new FilterItemsStates(items, localStorage.getItem(items.name)));
  }
}
