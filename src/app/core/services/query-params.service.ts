import { Injectable, OnInit } from '@angular/core';
import { QueryParamsModel } from '../models/query-params.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService implements OnInit {
  private queryParams: QueryParamsModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
  ) {
  }

  ngOnInit(): void {
    this.queryParams = new QueryParamsModel(this.route.snapshot.queryParams);
    console.log('this.queryParams - ', this.queryParams);
  }

  addSelectedToURL(selected) {
    const params: QueryParamsModel = this.takeParams();
    params.filters = selected.length ? selected.map(filter => `${filter['groupName']}:${filter['filterName']}`).join(',') : '';
    this.navigateWithCurrentParams(params);
  }

  addColumnsToURL(columns) {
    const params: QueryParamsModel = this.takeParams();
    params.columns = JSON.stringify(columns);
    params.main_metric = columns[0];
    this.navigateWithCurrentParams(params);
  }

  addSortingOrderToURL(order_by) {
    const params: QueryParamsModel = this.takeParams();
    params.order_by = order_by;
    this.navigateWithCurrentParams(params);
  }

  addDetailsToURL(filter_by) {
    const params: QueryParamsModel = this.takeParams();
    params.filter_by = filter_by;
    this.navigateWithCurrentParams(params);
  }

  takeParams(): QueryParamsModel {
    this.queryParams = new QueryParamsModel(this.route.snapshot.queryParams);
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
