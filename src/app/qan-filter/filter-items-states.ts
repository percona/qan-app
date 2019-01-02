export class FilterItemsStates {
  name: string;
  states: Array<{}>;

  constructor(params: any = {}, savedConfigurations: any = {}) {
    const configurations = JSON.parse(savedConfigurations);
    this.name = params['name'];
    this.states = [];
    params['parameters'].forEach(param => {
      const currentConfiguration = {
        propertyName: param,
        value: false,
        category: this.name
      };
      if (configurations) {
        configurations['states'].forEach(state => {
          if (param === state.propertyName) {
            currentConfiguration.value = state.value;
          }
        });
      }
      this.states.push(currentConfiguration);
    })
  }
}
