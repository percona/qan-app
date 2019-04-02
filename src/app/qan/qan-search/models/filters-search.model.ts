import { FilterModel } from '../../qan-filter/models/filter.model';

export class FiltersSearchModel {
  filterName: string;
  groupName: string;
  state: boolean;

  constructor(group: string, item: FilterModel) {
    this.groupName = group;
    this.filterName = item.value;
    this.state = item.state;
  }
}
