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
    this.filterGroup = this.humanNamesForGroup(filterGroup);
    this.items = itemsArray;
  }

  humanNamesForGroup(groupName) {
    switch (groupName) {
      case 'environment':
        return 'Environment';
      case 'cluster':
        return 'Cluster';
      case 'replication_set':
        return 'Replication Set';
      case 'd_database':
        return 'Database';
      case 'd_schema':
        return 'Schema';
      case 'd_server':
        return 'Server';
      case 'd_client_host':
        return 'Client Host';
      case 'd_username':
        return 'User Name';
      default:
        return groupName
    }
  }
}
