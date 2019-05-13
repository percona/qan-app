import { FilterModel } from './filter.model';

export class FilterGroupModel {
  filterGroup: string;
  items: FilterModel[];

  constructor(group) {
    const [filterGroup, itemsGroup] = group;
    let itemsArray;
    if (itemsGroup.values) {
      itemsArray = itemsGroup.values.map(item => new FilterModel(item));
    } else {
      itemsArray = itemsGroup.name.map(item => new FilterModel(item));
    }
    this.filterGroup = filterGroup;
    this.items = itemsArray;
  }
}
