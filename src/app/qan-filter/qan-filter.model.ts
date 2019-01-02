export class QanFilterModel {
  name: string;
  values: Array<{}>;

  constructor(params: any = {}, savedConfigurations: any = {}) {
    const configurations = JSON.parse(savedConfigurations);
    this.name = params['name'];
    this.values = [];
    params['parameters'].forEach(param => {
      this.values.push({
        filterName: param,
        state: configurations ? configurations['values'].filter(value => param === value.filterName)[0].state : false,
        groupName: this.name
      });
    })
  }
}
