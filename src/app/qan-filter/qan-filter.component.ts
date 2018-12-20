import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';

@Component({
  selector: 'app-qan-filter',
  templateUrl: './qan-filter.component.html',
  styleUrls: ['./qan-filter.component.scss']
})
export class QanFilterComponent implements OnInit {

  public isToggleMenu = false;
  public limitParameters = {};
  public defaultLimit = 4;
  public filterMenuCategories: Array<{}> = [];
  public seeAllTitle = 'see all';

  constructor() {
  }

  ngOnInit() {
    this.filterMenuCategories = [
      {
        name: 'Schemas',
        parameters:
          ['performance_schema', 'wordpress', 'my_DB1', 'my_DB2', 'innodb_2', 'performance_schema-1', 'wordpress-1', 'my_DB1-1', 'my_DB2-1',
            'innodb_2-1']
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
    ];

    this.filterMenuCategories.forEach(item => {
      this.limitParameters[item['name']] = this.defaultLimit;
    });
  }

  getAll(currentCategory) {
    this.limitParameters[currentCategory.name] =
      this.limitParameters[currentCategory.name] <= 4 ? currentCategory.parameters.length - 1 : this.defaultLimit
  }
}
