import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ColumnConfigModel} from '../../qan-edit-column/column-config.model';
import 'rxjs/add/operator/map';

@Injectable()
export class QueryTableConfigService {
  private cellConfigurationSource = new BehaviorSubject([]);

  constructor() {
  }

  getConfigurations() {
    this.setConfig([
      {
        name: 'Load', configurations: ['Sparkline', 'Value', 'Percentage']
      },
      {
        name: 'Count', configurations: ['Sparkline', 'Queries per second', 'Value', 'Percentage']
      },
      {
        name: 'Avg Latency', configurations: ['Sparkline', 'Value', 'Distribution']
      }
    ].map(configuration => new ColumnConfigModel(configuration, JSON.parse(localStorage.getItem(configuration.name)))))
  }

  setConfig(config: ColumnConfigModel[]) {
    this.cellConfigurationSource.next(config);
  }

  get source() {
    return this.cellConfigurationSource;
  }
}
