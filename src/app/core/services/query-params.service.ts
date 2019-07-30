import { Injectable } from '@angular/core';
import { QueryParamsModel } from '../models/query-params.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {
  private queryParams: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
  ) { }

  addSelectedToURL(selected) {
    this.queryParams = new QueryParamsModel(this.route.snapshot.queryParams);
    const params: QueryParamsModel = Object.assign({}, this.queryParams);
    params.filters = '';
    params.queryID = '';
    params.search = '';
    if (selected.length) {
      params.filters = selected.map(filter => `${filter['groupName']}-${filter['filterName']}`).join(',');
    }
    this.router.navigate(['profile'], { queryParams: params });
    this.eventsService.events.sendEvent(this.eventsService.events.updateUrl);
  }
}
