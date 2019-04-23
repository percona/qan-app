import { FilterModel } from './filter.model';

export class FilterGroupModel {
  filterGroup: string;
  items: FilterModel[];

  constructor(group) {
    const [filterGroup, itemsGroup] = group;
    const itemsArray = itemsGroup.name.map(item => new FilterModel(item));

    this.filterGroup = filterGroup;
    this.items = itemsArray.filter(item => !!item.value);
  }
}
