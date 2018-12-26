import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';
import {EditColumnConfigurations} from '../qan-edit-column/edit-column-configurations';

@Injectable()
export class QueryTableConfigurationService {
  private cellConfigurationSource = new BehaviorSubject([]);

  constructor() {
  }

  toggleConfig(id, key) {
    this.cellConfigurationSource.next([...(this.cellConfigurationSource.value.map(item => {
      if (item.id !== id) {
        return item
      }

      item[key] = !item[key];
      localStorage.setItem(`${id}-${key}`, item[key] ? 'true' : '');
      return item;
    }))]);
  }

  getConfigurations() {
    this.cellConfigurationSource.next([
      {
        name: 'Load', configurations: ['Sparkline', 'Value', 'Percentage']
      },
      {
        name: 'Count', configurations: ['Sparkline', 'Queries per second', 'Value', 'Percentage']
      },
      {
        name: 'Avg Latency', configurations: ['Sparkline', 'Value', 'Distribution']
      }
    ].map(configuration => new EditColumnConfigurations(configuration, localStorage.getItem(configuration.name))))
  }

  get source() {
    return this.cellConfigurationSource;
  }
}
