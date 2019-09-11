import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QanProfileService } from '../profile/qan-profile.service';
import { MetricModel } from '../profile-table/models/metric.model';
import { QueryParamsService } from '../../core/services/query-params.service';

@Component({
  moduleId: module.id,
  selector: 'app-query-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})

export class ProfileDetailsComponent implements OnInit {
  @ViewChild('labels', { read: ElementRef, static: false }) labelsFilters: ElementRef;
  protected dbName: string;
  public fingerprint: string;
  public isTotal = false;
  public details: MetricModel[] = [];
  public activeTabId: string;
  public tabs = {
    details: {
      id: 'details',
      title: 'Details'
    },
    examples: {
      id: 'examples',
      title: 'Examples'
    },
    explain: {
      id: 'explain',
      title: 'Explain'
    },
    tables: {
      id: 'tables',
      title: 'Tables'
    }
  };

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected qanProfileService: QanProfileService,
    protected queryParamsService: QueryParamsService
  ) {
    this.activeTabId = this.route.snapshot.queryParams.active_details_tab || this.tabs.details.id;
  }

  ngOnInit() {
  }

  onFinishDetailsTableRender(event) {
    this.labelsFilters.nativeElement.style.setProperty('--labels-height', `${event}px`);
  }

  onTabChange(event) {
    this.queryParamsService.addActiveTabToUrl(event.nextId);
  }
}
