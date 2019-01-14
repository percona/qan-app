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
        name: 'Load', columns: ['Sparkline', 'Value', 'Percentage']
      },
      {
        name: 'Count', columns: ['Sparkline', 'Queries per second', 'Value', 'Percentage']
      },
      {
        name: 'Avg Latency', columns: ['Sparkline', 'Value', 'Distribution']
      }
    ].map(config => new ColumnConfigModel(config, JSON.parse(localStorage.getItem(config.name)))))
  }

  setConfig(config: ColumnConfigModel[]) {
    this.cellConfigurationSource.next(config);
  }

  get source() {
    return this.cellConfigurationSource;
  }
}
