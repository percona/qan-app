import { Injectable, OnInit } from '@angular/core';
import { QueryParamsModel } from '../models/query-params.model';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { EventsService } from './events.service';
import { filter } from 'rxjs/operators';
import { QueryParams } from '../core.component';
import { Subscription } from 'rxjs';
import { FilterMenuService } from '../../qan/filter-menu/filter-menu.service';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService implements OnInit {
  private queryParams: any;
  private routerSubscription$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private filterMenuService: FilterMenuService,
  ) {
    this.queryParams = this.route.snapshot.queryParams;
  }

  ngOnInit(): void {
    // this.subscribeToRouter();
  }

  subscribeToRouter() {
    this.routerSubscription$ = this.router.events.pipe(
      filter((e: any) => e instanceof NavigationEnd)
    ).subscribe((event: Event) => {
      this.queryParams = this.route.snapshot.queryParams as QueryParams;
    });
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

  decodeSelected(selected) {
    const selectedArray = selected
      .split(',')
      .map(filterStr => {
        const divided = filterStr.split(':');
        return {
          filterName: divided[1],
          groupName: divided[0],
          state: true
        }
      });
    // this.filterMenuService.updateSelected(selectedArray);
  }

  get params() {
    return this.queryParams;
  }
}
