import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class QueryTableConfigurationService {
  private cellConfigurationSource = new BehaviorSubject([
    {
      name: 'Load',
      id: 'load',
      checked: localStorage.getItem('load-checked') === null ? true : !!localStorage.getItem('load-checked'),
      sparkline: localStorage.getItem('load-sparkline') === null ? true : !!localStorage.getItem('load-sparkline'),
      value: localStorage.getItem('load-value') === null ? true : !!localStorage.getItem('load-value'),
      percentage: localStorage.getItem('load-percentage') === null ? true : !!localStorage.getItem('load-percentage')
    },
    {
      name: 'Count',
      id: 'count',
      checked: localStorage.getItem('count-checked') === null ? true : !!localStorage.getItem('count-checked'),
      queriesPerSecond: localStorage.getItem('count-queriesPerSecond') === null ? true : !!localStorage.getItem('count-queriesPerSecond'),
      sparkline: localStorage.getItem('count-sparkline') === null ? true : !!localStorage.getItem('count-sparkline'),
      value: localStorage.getItem('count-value') === null ? true : !!localStorage.getItem('count-value'),
      percentage: localStorage.getItem('count-percentage') === null ? true : !!localStorage.getItem('count-percentage')
    },
    {
      name: 'Avg Latency',
      id: 'latency',
      checked: localStorage.getItem('latency-checked') === null ? true : !!localStorage.getItem('latency-checked'),
      sparkline: localStorage.getItem('latency-sparkline') === null ? true : !!localStorage.getItem('latency-sparkline'),
      value: localStorage.getItem('latency-value') === null ? true : !!localStorage.getItem('latency-value'),
      distribution: localStorage.getItem('latency-distribution') === null ? true : !!localStorage.getItem('latency-distribution')
    }
  ]);

  constructor() {
  }

  toggleConfig(id, key) {
    this.cellConfigurationSource.next([...(this.cellConfigurationSource.value.map(item => {
      if (item.id !== id) return item;

      item[key] = !item[key];
      localStorage.setItem(`${id}-${key}`, item[key] ? 'true' : '');
      return item;
    }))]);
  }

  get source() {
    return this.cellConfigurationSource;
  }
}
