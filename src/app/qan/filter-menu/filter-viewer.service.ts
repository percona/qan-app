import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterViewerService {

  constructor() { }

  filtersOrder(detailsTableData) {
    return detailsTableData.sort((a, b) => this.sortFilters(a, b));
  }

  sortFilters(a, b) {
    const order = ['environment', 'cluster', 'replication_set', 'database', 'schema', 'node_name', 'service_name', 'client_host', 'username', ''];

    let indA = order.indexOf(a['filterGroup']);
    let indB = order.indexOf(b['filterGroup']);

    if (indA === -1) {
      indA = order.length - 1;
    }

    if (indB === -1) {
      indB = order.length - 1;
    }

    return indA < indB ? -1 : 1;
  }

  skipNA(array) {
    return array.forEach(group => group.items.every(label => !label.value) ? group.items.length = 0 : group.items);
  }

  sortEmptyValues(array) {
    array.sort((a, b) => {
      if (a.items.every(item => item.value === '') || a.items.every(item => item.value === null)) {
        return 1
      }
      if (b.items.every(item => item.value === '') || b.items.every(item => item.value === null)) {
        return -1
      }
    });
  }

  sortIdsValues(array) {
    array.sort((a, b) => {
      if (a.items.every(label => label.value.includes('_id'))) {
        return 1
      }

      if (b.items.every(label => label.value.includes('_id'))) {
        return -1
      }
    })
  }
}
