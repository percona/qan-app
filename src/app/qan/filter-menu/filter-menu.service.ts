import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { FilterGroupModel } from './models/filter-group.model';
import { FiltersSearchModel } from './models/filters-search.model';
import { QanProfileService } from '../profile/qan-profile.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class FilterMenuService {
  private selected = new BehaviorSubject([]);
  private autocompleteFilters = new Subject();

  constructor(private qanProfileService: QanProfileService) {
  }

  get getAutocompleteFilters() {
    return this.autocompleteFilters;
  }

  get getSelected() {
    return this.selected;
  }

  updateSelected(newSelected) {
    this.selected.next(newSelected);
    this.addSelectedToResponse(newSelected);
  }

  updateAutocompleteFilters(autocomplete) {
    const generated = this.generateAutocomplete(autocomplete);
    this.autocompleteFilters.next(generated);
  }

  generateFilterGroup(group) {
    const filters = Object.entries(group.labels).map(entire => !this.isEmptyObject(entire[1]) ? new FilterGroupModel(entire) : {});
    return filters.filter(item => !this.isEmptyObject(item));
  }

  generateAutocomplete(filters) {
    const generated = filters.map(responseItem =>
      responseItem.items.map(item =>
        new FiltersSearchModel(responseItem.filterGroup, item)
      ));
    return [].concat(...generated)
  }

  isEmptyObject(obj) {
    return !Object.keys(obj).length
  }

  prepareLabels(filters) {
    const arr = [];
    filters.forEach(item => {
      const existed = arr.find(it => it.key === item.groupName);
      if (!existed) {
        arr.push({ key: item.groupName, value: [item.filterName] })
      } else {
        existed.value.push(item.filterName);
      }
    });
    return arr
  }

  addSelectedToResponse(selected) {
    const currentUrlParams = this.qanProfileService.getProfileParams.getValue();
    const detailsUrlParams = this.qanProfileService.getCurrentDetails;
    currentUrlParams.labels = this.prepareLabels(selected);
    this.qanProfileService.updateProfileParams(currentUrlParams);
    if (detailsUrlParams.hasOwnProperty('filter_by')) {
      detailsUrlParams.labels = this.prepareLabels(selected);
      this.qanProfileService.updateObjectDetails(detailsUrlParams);
    }
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
