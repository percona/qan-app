import {ColumnStateModel} from './colum-state.mode';

export class ColumnConfigModel {
  name: string;
  checked: boolean;
  columns: Array<{}>;

  constructor(config: any, localConfig: any) {
    const storedColumnsConfig = localConfig && localConfig.columns ? localConfig.columns : [];
    this.name = config.name;
    this.checked = localConfig ? localConfig.checked : true;
    this.columns = config.columns.map(column => new ColumnStateModel(column, storedColumnsConfig));
  }
}
