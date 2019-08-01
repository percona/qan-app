import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { FilterGroupModel } from './models/filter-group.model';
import { FiltersSearchModel } from './models/filters-search.model';
import { QanProfileService } from '../profile/qan-profile.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { QueryParamsService } from '../../core/services/query-params.service';
import { filterGroupList } from './filter-groups-list';
import { ActivatedRoute } from '@angular/router';
import { QueryParams } from '../../core/core.component';

@Injectable()
export class FilterMenuService {
  private iframeQueryParams = this.route.snapshot.queryParams as QueryParams;
  private selected = new BehaviorSubject(this.setSelected(this.iframeQueryParams));
  private autocompleteFilters = new Subject();
  public charsLimit = 9;
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
          state: true
        }
      })
  }

  updateSelected(newSelected, isNeedToAdd: boolean = false) {
    this.selected.next(newSelected);
    this.addSelectedToResponse(newSelected);
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
    console.log('filters - ', filters);
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
    return this.filterGroupList[groupName] ? this.filterGroupList[groupName].humanName : groupName;
  }
}
