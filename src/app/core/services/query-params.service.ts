import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from './events.service';
import { QueryParams } from '../../qan/profile/interfaces/query-params.interface';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService
  ) {
    const queryParams = this.takeParams();
    if (queryParams.filter_by) {
      this.router.navigate(['profile/details', queryParams.filter_by], {
        queryParams: queryParams
      });
    }
  }

  addSelectedToURL(selected) {
    const params: QueryParams = this.takeParams();

    const parametersGroups = [
      'az',
      'city',
      'client_host',
      'cluster',
      'container_id',
      'container_name',
      'database',
      'environment',
      'machine_id',
      'node_id',
      'node_model',
      'node_name',
      'node_type',
      'region',
      'replication_set',
      'schema',
      'service_id',
      'service_name',
      'service_type',
      'username'
    ];

    parametersGroups.forEach(parameterName => {
      if (params[`var-${parameterName}`]) {
        delete params[`var-${parameterName}`];
      }
    });
    selected.forEach(filter => {
      if (params[`var-${filter.groupName}`]) {
        params[`var-${filter.groupName}`] = [
          ...params[`var-${filter.groupName}`],
          filter.filterName
        ].filter((value, index, self) => self.indexOf(value) === index);
      } else {
        params[`var-${filter.groupName}`] = [filter.filterName];
      }
    });
    this.navigateWithCurrentParams(params);
  }

  setColumnsToURL(columns) {
    const params: QueryParams = this.takeParams();
    params.columns = JSON.stringify(columns);
    params.main_metric = columns[0];
    this.navigateWithCurrentParams(params);
  }

  addSortingOrderToURL(order_by) {
    const params: QueryParams = this.takeParams();
    params.order_by = order_by;
    this.navigateWithCurrentParams(params);
  }

  addDimension(group_by: string) {
    const params: QueryParams = this.takeParams();
    params.group_by = group_by;
    this.navigateWithCurrentParams(params);
  }

  addDetailsToURL(filter_by) {
    const params: QueryParams = this.takeParams();
    params.filter_by = filter_by;
    this.navigateWithCurrentParams(params);
  }

  addActiveTabToUrl(tab_id) {
    const params: QueryParams = this.takeParams();
    params.active_details_tab = tab_id;
    this.navigateWithCurrentParams(params);
  }

  takeParams(): QueryParams {
    return this.getJsonFromUrl();
  }

  navigateWithCurrentParams(params) {
    const routerLink = this.setRouterLink(params);
    this.router.navigate(routerLink, { queryParams: params });
    this.eventsService.events.sendEvent(this.eventsService.events.updateUrl);
  }

  setRouterLink(params = {}) {
    const filterBy =
      this.route.snapshot.queryParams.filter_by || params['filter_by'];
    console.log(
      filterBy,
      this.route.snapshot.queryParams.filter_by,
      params['filter_by']
    );
    return filterBy !== undefined
      ? ['profile/details/', filterBy]
      : ['profile'];
  }

  getJsonFromUrl() {
    const query = location.search.substr(1);
    const result = {};
    query.split('&').forEach(function(part) {
      const [groupName, value] = part.split('=');
      if (groupName !== '') {
        if (groupName.startsWith('var-') && result[groupName]) {
          result[groupName] = [
            ...result[groupName],
            decodeURIComponent(value)
          ].filter((item, index, self) => self.indexOf(item) === item);
        } else if (groupName.startsWith('var-')) {
          result[groupName] = [decodeURIComponent(value)];
        } else {
          result[groupName] = decodeURIComponent(value);
        }
      }
    });
    return result;
  }
}
