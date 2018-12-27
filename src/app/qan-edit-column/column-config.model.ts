export class ColumnConfigModel {
  name: string;
  checked: boolean;
  configurations: Array<{}>;

  constructor(config: any, localConfig: any) {
    this.name = config.name;
    this.checked = localConfig ? localConfig.checked : true;
    this.configurations = config.configurations
      .map(name => localConfig ? localConfig.configurations.find(item => item.name === name) : {
        name,
        value: true
      })
  }
}
