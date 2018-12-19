import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';

@Component({
  selector: 'app-qan-filter',
  templateUrl: './qan-filter.component.html',
  styleUrls: ['./qan-filter.component.scss']
})
export class QanFilterComponent implements OnInit {

  public isToggleMenu = false;
  public limitParameters = 5;

  public filterMenuCategories: Array<{}> = [
    {
      name: 'Schemas',
      parameters: ['performance_schema', 'wordpress', 'my_DB1', 'my_DB2', 'innodb_2']
    },
    {
      name: 'Servers',
      parameters: ['mdb101', 'mdb102', 'ps55', 'ps57myrocks', 'pxc56-2']
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

  constructor() { }

  ngOnInit() {
  }

}
