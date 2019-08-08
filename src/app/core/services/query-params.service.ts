import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from './events.service';
import { QueryParams } from '../../qan/profile/interfaces/query-params.interface';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {
  private queryParams: QueryParams;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
  ) {
    this.queryParams = this.route.snapshot.queryParams as QueryParams;
    if (this.queryParams.filter_by) {
      this.router.navigate(['profile/details', this.queryParams.filter_by], { queryParams: this.queryParams });
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
    this.queryParams = this.route.snapshot.queryParams as QueryParams;
    return Object.assign({}, this.queryParams);
  }

  navigateWithCurrentParams(params) {
    this.router.navigate(this.setRouterLink(params), { queryParams: params });
    this.eventsService.events.sendEvent(this.eventsService.events.updateUrl);
  }

  setRouterLink(params = {}) {
    const filterBy = this.route.snapshot.queryParams.filter_by || params['filter_by'];
    return filterBy ? ['profile/details/', filterBy] : ['profile'];
  }
}
