import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstanceService } from '../core/instance.service';
import { QueryParams } from '../core/core.component';
import { MongoQueryDetailsService, QueryDetails } from './mongo-query-details.service';
import {BaseQueryDetailsComponent} from '../core/base-query-details.component';
import {BaseQueryDetailsService} from '../core/base-query-details.service';

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
              protected instanceService: InstanceService,
              protected mongoQueryDetailsService: MongoQueryDetailsService,
              protected baseQueryDetailsService: BaseQueryDetailsService) {
    super(route, router, instanceService, baseQueryDetailsService);
  }

  ngOnInit() {
    this.queryParams = this.route.snapshot.queryParams as QueryParams;
    this.parseParams();
    this.onChangeParams(this.queryParams);
  }

}
