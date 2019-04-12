import { FilterModel } from './filter.model';

export class FilterGroupModel {
  filterGroup: string;
  items: FilterModel[];

  constructor(group) {
    const [filterGroup, itemsGroup] = group;

    this.filterGroup = filterGroup;
    this.items = itemsGroup.name.map(item => new FilterModel(item))
  }
}
