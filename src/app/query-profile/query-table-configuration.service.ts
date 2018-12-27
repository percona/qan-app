import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';
import {EditColumnConfigurations} from '../qan-edit-column/edit-column-configurations';

@Injectable()
export class QueryTableConfigurationService {
  private cellConfigurationSource = new BehaviorSubject([]);

  constructor() {
  }

  // saveConfig(config) {
  //   this.cellConfigurationSource.next([...(this.cellConfigurationSource.value.map(item => {
  //     if (item.id !== config.id) {
  //       return item
  //     }
  //
  //     console.log('config service - ', config);
  //     console.log('item service - ', item);
  //     localStorage.setItem(config.name, JSON.stringify(config));
  //     return item;
  //   }))]);
  // }

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
    ].map(configuration => new EditColumnConfigurations(configuration, JSON.parse(localStorage.getItem(configuration.name)))))
  }

  get source() {
    return this.cellConfigurationSource;
  }
}
