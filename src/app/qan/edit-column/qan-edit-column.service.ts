import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColumnConfigModel } from '../../core/models/column-config.model';

@Injectable()
export class QanEditColumnService {
  private cellConfigSource = new BehaviorSubject([]);

  constructor() {
  }

  /**
   * Get configuration from server and modify it by models
   */
  getConfigs() {
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

  /**
   * Set current state of config
   * @param config - collection of configs from server
   */
  setConfig(config: ColumnConfigModel[]) {
    this.cellConfigSource.next(config);
  }

  /**
   * Provide access for private variable
   */
  get source() {
    return this.cellConfigSource;
  }
}
