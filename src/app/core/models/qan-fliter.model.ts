export class QanFilterModel {
  filterName: string;
  state: boolean;
  groupName: string;

  constructor(configs: any = [], groupName: string = '', filterName: string = '') {
    const isFilterName = configs.find(value => filterName === value.filterName);
    const state = configs.length && !!isFilterName ? isFilterName.state : false;

    this.filterName = filterName;
    this.state = state;
    this.groupName = groupName;
  }
}
