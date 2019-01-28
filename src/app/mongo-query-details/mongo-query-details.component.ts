import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstanceService } from '../core/services/instance.service';
import { MongoQueryDetailsService } from './mongo-query-details.service';
import {QueryDetails} from '../core/services/base-query-details.service';
import {BaseQueryDetailsComponent} from '../core/base-query-details.component';
import {BaseQueryDetailsService} from '../core/services/base-query-details.service';
import {QueryParams} from '../core/services/url-params.service';

@Component({
  moduleId: module.id,
  selector: 'app-query-details',
  templateUrl: './mongo-query-details.component.html',
  styleUrls: ['./mongo-query-details.component.scss']
})
export class MongoQueryDetailsComponent extends BaseQueryDetailsComponent implements OnInit {

  protected queryID: string;
  public queryDetails: any | QueryDetails;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              public instanceService: InstanceService,
              protected mongoQueryDetailsService: MongoQueryDetailsService,
              protected baseQueryDetailsService: BaseQueryDetailsService) {
    super(route, router, instanceService, baseQueryDetailsService);
  }

  /**
   * Set current query params when page is loaded
   */
  ngOnInit() {
    this.queryParams = this.route.snapshot.queryParams as QueryParams;
    this.parseParams();
    this.onChangeParams(this.queryParams);
  }

}
