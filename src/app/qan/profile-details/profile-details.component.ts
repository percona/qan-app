import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QanProfileService } from '../profile/qan-profile.service';
import { MetricModel } from '../profile-table/models/metric.model';

@Component({
  moduleId: module.id,
  selector: 'app-query-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})

export class ProfileDetailsComponent implements OnInit {
  @ViewChild('labels', { read: ElementRef }) labelsFilters: ElementRef;
  protected dbName: string;
  public fingerprint: string;
  public isTotal = false;
  public details: MetricModel[] = [];

  constructor(
    protected router: Router,
    protected qanProfileService: QanProfileService
  ) {
  }

  ngOnInit() {
  }

  onFinishDetailsTableRender(event) {
    this.labelsFilters.nativeElement.style.setProperty('--labels-height', `${event}px`);
  }
}
