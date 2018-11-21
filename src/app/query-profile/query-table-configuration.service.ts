import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class QueryTableConfigurationService {
  private cellConfigurationSource = new BehaviorSubject([
    {
      name: 'Load',
      id: 'load',
      checked: true,
      sparkline: true,
      value: true,
      percentage: true
    },
    {
      name: 'Count',
      id: 'count',
      checked: true,
      queriesPerSecond: true,
      sparkline: true,
      value: true,
      percentage: true
    },
    {
      name: 'Avg Latency',
      id: 'latency',
      checked: true,
      sparkline: true,
      value: true,
      distribution: true
    }
  ]);

  constructor() {
  }

  toggleConfig(id, key) {
    this.cellConfigurationSource.next([...(this.cellConfigurationSource.value.map(item => {
      if (item.id === id) { item[key] = !item[key]; }
      return item;
    }))]);
  }

  get source() {
    return this.cellConfigurationSource;
  }
}
