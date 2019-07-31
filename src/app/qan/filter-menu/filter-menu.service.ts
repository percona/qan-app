import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { FilterGroupModel } from './models/filter-group.model';
import { FiltersSearchModel } from './models/filters-search.model';
import { QanProfileService } from '../profile/qan-profile.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { QueryParamsService } from '../../core/services/query-params.service';

@Injectable()
export class FilterMenuService {
  private selected = new BehaviorSubject([]);
  private autocompleteFilters = new Subject();
  public charsLimit = 9;
  public queryParams: any;

  constructor(
    private qanProfileService: QanProfileService,
    private queryParamsService: QueryParamsService,
  ) {
  }

  get getAutocompleteFilters() {
    return this.autocompleteFilters;
  }

  get getSelected() {
    return this.selected;
  }

  updateSelected(newSelected, isNeedToAdd: boolean = false) {
    this.selected.next(newSelected);
    this.addSelectedToResponse(newSelected);
    console.log('newSelected - ', newSelected);
    if (isNeedToAdd) {
      this.queryParamsService.addSelectedToURL(newSelected);
    }
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

  checkForTooltip(value) {
    return value.length > this.charsLimit && value.includes('id')
  }

  humanNamesForGroup(groupName) {
    switch (groupName) {
      case 'environment':
        return 'Environment';
      case 'cluster':
        return 'Cluster';
      case 'replication_set':
        return 'Replication Set';
      case 'database':
        return 'Database';
      case 'schema':
        return 'Schema';
      case 'server':
        return 'Server';
      case 'client_host':
        return 'Client Host';
      case 'service_type':
        return 'Service Type';
      case 'az':
        return 'Availability Zone';
      case 'region':
        return 'Region Name';
      case 'node_model':
        return 'Node Model';
      case 'container_name':
        return 'Container Name';
      case 'username':
        return 'User Name';
      case 'agent_id':
        return 'Agent ID';
      case 'agent_type':
        return 'Agent Type';
      case 'node_id':
        return 'Node ID';
      case 'node_type':
        return 'Node Type';
      case 'node_name':
        return 'Node Name';
      case 'service_id':
        return 'Service ID';
      case 'machine_id':
        return 'Machine ID';
      default:
        return groupName
    }
  }
}
