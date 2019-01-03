export class QanFilterModel {
  filterName: string;
  state: boolean;
  groupName: string;

  constructor(configurations: any = [], groupName: string = '', filterName: string = '') {
    const state = configurations.length ? configurations.find(value => filterName === value.filterName).state : false;
    this.filterName = filterName;
    this.state = state;
    this.groupName = groupName;
  }
}
