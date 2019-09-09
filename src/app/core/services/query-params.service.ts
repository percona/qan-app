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
    private eventsService: EventsService,
  ) {
    const queryParams = this.takeParams();
    if (queryParams.filter_by) {
      this.router.navigate(['profile/details', queryParams.filter_by], { queryParams: queryParams });
    }
  }

  addSelectedToURL(selected) {
    const params: QueryParams = this.takeParams();
    params.filters = selected.length ? selected.map(filter => filter.urlParamName).join(',') : '';
    this.navigateWithCurrentParams(params);
  }

  addColumnsToURL(columns) {
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
    const filterBy = this.route.snapshot.queryParams.filter_by || params['filter_by'];
    return filterBy ? ['profile/details/', filterBy] : ['profile'];
  }

  getJsonFromUrl() {
    const query = location.search.substr(1);
    const result = {};
    query.split('&').forEach(function(part) {
      const item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  }
}
