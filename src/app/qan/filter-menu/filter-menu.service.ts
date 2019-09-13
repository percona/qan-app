import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { FilterGroupModel } from './models/filter-group.model';
import { FiltersSearchModel } from './models/filters-search.model';
import { QanProfileService } from '../profile/qan-profile.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { QueryParamsService } from '../../core/services/query-params.service';
import { filterGroupList } from './filter-groups-list';
import { ActivatedRoute } from '@angular/router';
import { QueryParams } from '../profile/interfaces/query-params.interface';

@Injectable()
export class FilterMenuService {
  private iframeQueryParams = this.route.snapshot.queryParams as QueryParams;
  private selected = new BehaviorSubject(this.setSelected(this.iframeQueryParams));
  private autocompleteFilters = new Subject();
  public queryParams: any;
  public filterGroupList = filterGroupList;

  constructor(
    private qanProfileService: QanProfileService,
    private queryParamsService: QueryParamsService,
    private route: ActivatedRoute,
  ) {
  }

  get getAutocompleteFilters() {
    return this.autocompleteFilters;
  }

  get getSelected() {
    return this.selected;
  }

  setSelected(params) {
    return params.filters ? this.decodeSelected(params) : [];
  }

  decodeSelected(params) {
    return params.filters
      .split(',')
      .map(filterStr => {
        const divided = filterStr.split(':');
        return {
          filterName: divided[1],
          groupName: divided[0],
          urlParamName: filterStr,
          state: true
        }
      })
  }

  updateSelected(newSelected) {
    this.selected.next(newSelected);
    this.addSelectedToResponse(newSelected);
    this.queryParamsService.addSelectedToURL(newSelected);
  }

  updateAutocompleteFilters(autocomplete) {
    const generated = this.generateAutocomplete(autocomplete);
    this.autocompleteFilters.next(generated);
  }

  generateFilterGroup(group) {
    const filters = Object.entries(group.labels).filter(item => !this.isEmptyObject(item)).map(entire => new FilterGroupModel(entire));
    return filters;
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

  checkForTooltip(value, charsLimit) {
    return value.length > charsLimit
  }

  humanNamesForGroup(groupName) {
    return this.filterGroupList[groupName] ? this.filterGroupList[groupName].humanName : groupName;
  }
}
