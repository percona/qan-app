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
  private selected = new BehaviorSubject(
    this.setSelected(this.iframeQueryParams)
  );
  private autocompleteFilters = new Subject();
  public queryParams: any;
  public filterGroupList = filterGroupList;

  static isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  static checkForTooltip(value, charsLimit) {
    return value.length > charsLimit;
  }

  constructor(
    private qanProfileService: QanProfileService,
    private queryParamsService: QueryParamsService,
    private route: ActivatedRoute
  ) {}

  get getAutocompleteFilters() {
    return this.autocompleteFilters;
  }

  get getSelected() {
    return this.selected;
  }

  setSelected(params) {
    return this.decodeSelected(params);
  }

  decodeSelected(params) {
    return Object.keys(params).reduce((acc, param) => {
      if (!param.startsWith('var-')) {
        return acc;
      }

      const groupName = param.replace('var-', '');
      if (Array.isArray(params[param])) {
        params[param].forEach(value => {
          acc.push({
            filterName: value,
            groupName: groupName,
            urlParamName: `${groupName}/${value}`,
            state: true
          });
        });
        return acc;
      }

      acc.push({
        filterName: params[param],
        groupName: groupName,
        urlParamName: `${groupName}/${params[param]}`,
        state: true
      });

      return acc;
    }, []);
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
    return Object.entries(group.labels)
      .filter(item => !FilterMenuService.isEmptyObject(item))
      .map(entire => new FilterGroupModel(entire));
  }

  generateAutocomplete(filters) {
    const generated = filters.map(responseItem =>
      responseItem.items.map(
        item => new FiltersSearchModel(responseItem.filterGroup, item)
      )
    );
    return [].concat(...generated);
  }

  prepareLabels(filters) {
    const arr = [];
    filters.forEach(item => {
      const existed = arr.find(it => it.key === item.groupName);
      if (!existed) {
        arr.push({ key: item.groupName, value: [item.filterName] });
      } else {
        existed.value.push(item.filterName);
      }
    });
    return arr;
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
    return this.filterGroupList[groupName]
      ? this.filterGroupList[groupName].humanName
      : groupName;
  }
}
