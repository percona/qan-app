import { Injectable, OnInit } from '@angular/core';
import { QueryParamsModel } from '../models/query-params.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService implements OnInit {
  private queryParams: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
  ) {
    this.queryParams = this.route.snapshot.queryParams;
  }

  ngOnInit(): void {
  }

  addSelectedToURL(selected) {
    this.queryParams = new QueryParamsModel(this.route.snapshot.queryParams);
    const params: QueryParamsModel = Object.assign({}, this.queryParams);
    params.filters = '';
    if (selected.length) {
      params.filters = selected.map(filter => `${filter['groupName']}:${filter['filterName']}`).join(',');
    }
    this.router.navigate(['profile'], { queryParams: params });
    this.eventsService.events.sendEvent(this.eventsService.events.updateUrl);
  }

  addColumnsToURL(columns) {
    this.queryParams = new QueryParamsModel(this.route.snapshot.queryParams);
    const params: QueryParamsModel = Object.assign({}, this.queryParams);
    params.columns = JSON.stringify(columns);
    params.main_metric = columns[0];
    this.router.navigate(['profile'], { queryParams: params });
    this.eventsService.events.sendEvent(this.eventsService.events.updateUrl);
  }

  addSortingOrderToURL(order_by) {
    this.queryParams = new QueryParamsModel(this.route.snapshot.queryParams);
    const params: QueryParamsModel = Object.assign({}, this.queryParams);
    params.order_by = order_by;
    this.router.navigate(['profile'], { queryParams: params });
    this.eventsService.events.sendEvent(this.eventsService.events.updateUrl);
  }

  get params() {
    return this.queryParams;
  }
}
