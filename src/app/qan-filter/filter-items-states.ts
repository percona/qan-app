export class FilterItemsStates {
  name: string;
  states: Array<{}>;

  constructor(params: any = {}, savedConfigurations: any = {}) {
    const configurations = JSON.parse(savedConfigurations);
    console.log('currentState - ', configurations);
    this.name = params['name'];
    this.states = [];
    params['parameters'].forEach(param => {
      const currentConfiguration = {
        name: param,
        value: false
      };
      if (configurations !== null) {
        configurations['states'].forEach(state => {
          if (param === state.name) {
            currentConfiguration['value'] = state.value;
          }
        });
      }
      this.states.push(currentConfiguration);
    })
  }
}
