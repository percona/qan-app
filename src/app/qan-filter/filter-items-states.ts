export class FilterItemsStates {
  name: string;
  states: Array<{}>;
  constructor(params: any = {}) {
    this.name = params['name'];
    this.states = [];
    params['parameters'].forEach(param => {
      this.states.push({name: param})
    })
  }
}
