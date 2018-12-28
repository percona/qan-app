export class ColumnConfigModel {
  name: string;
  checked: boolean;
  columns: Array<{}>;

  constructor(config: any, localConfig: any) {
    this.name = config.name;
    this.checked = localConfig ? localConfig.checked : true;
    this.columns = config.columns
      .map(name => localConfig ? localConfig.columns.find(item => item.name === name) : {
        name,
        value: true
      })
  }
}
