import { FilterModel } from './filter.model';

export class FiltersSearchModel {
  filterName: string;
  groupName: string;
  state: boolean;
  count: string;

  constructor(group: string, item: FilterModel) {
    this.groupName = group;
    this.filterName = item.value;
    this.state = item.state;
    this.count = item.count || '';
  }
}
