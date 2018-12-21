import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class QueryTableConfigurationService {
  private cellConfigurationSource = new BehaviorSubject([
    {
      name: 'Load',
      id: 'load',
      checked: localStorage.getItem('load-checked') === null || !!localStorage.getItem('load-checked'),
      sparkline: localStorage.getItem('load-sparkline') === null || !!localStorage.getItem('load-sparkline'),
      value: localStorage.getItem('load-value') === null || !!localStorage.getItem('load-value'),
      percentage: localStorage.getItem('load-percentage') === null || !!localStorage.getItem('load-percentage')
    },
    {
      name: 'Count',
      id: 'count',
      checked: localStorage.getItem('count-checked') === null || !!localStorage.getItem('count-checked'),
      queriesPerSecond: localStorage.getItem('count-queriesPerSecond') === null || !!localStorage.getItem('count-queriesPerSecond'),
      sparkline: localStorage.getItem('count-sparkline') === null || !!localStorage.getItem('count-sparkline'),
      value: localStorage.getItem('count-value') === null || !!localStorage.getItem('count-value'),
      percentage: localStorage.getItem('count-percentage') === null || !!localStorage.getItem('count-percentage')
    },
    {
      name: 'Avg Latency',
      id: 'latency',
      checked: localStorage.getItem('latency-checked') === null || !!localStorage.getItem('latency-checked'),
      sparkline: localStorage.getItem('latency-sparkline') === null || !!localStorage.getItem('latency-sparkline'),
      value: localStorage.getItem('latency-value') === null || !!localStorage.getItem('latency-value'),
      distribution: localStorage.getItem('latency-distribution') === null || !!localStorage.getItem('latency-distribution')
    }
  ]);

  constructor() {
  }

  toggleConfig(id, key) {
    this.cellConfigurationSource.next([...(this.cellConfigurationSource.value.map(item => {
      if (item.id !== id) { return item }

      item[key] = !item[key];
      localStorage.setItem(`${id}-${key}`, item[key] ? 'true' : '');
      return item;
    }))]);
  }

  get source() {
    return this.cellConfigurationSource;
  }
}
