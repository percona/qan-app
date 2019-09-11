import { FilterModel } from './filter.model';

export class FiltersSearchModel {
  filterName: string;
  groupName: string;
  state: boolean;
  main_metric_percent: string;
  urlParamName: string;

  constructor(group: string, item: FilterModel) {
    this.groupName = group;
    this.filterName = item.value;
    this.state = item.state;
    this.main_metric_percent = item.main_metric_percent || '';
    this.urlParamName = `${group}:${item.value}`
  }
}
