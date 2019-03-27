import { Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { QanFilterService } from './qan-filter.service';

@Component({
  selector: 'app-qan-filter',
  templateUrl: './qan-filter.component.html',
  styleUrls: ['./qan-filter.component.scss']
})
export class QanFilterComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('tabs') tabs: NgbTabset;

  public limits = {};
  public filtersSearchedValues = [];
  public defaultLimit = 4;
  private filterSubscription: any;
  public filters: any;

  constructor(private qanFilterService: QanFilterService) {
    this.qanFilterService.getFilterConfigs();
    this.filterSubscription = this.qanFilterService.filterSource.subscribe(items => {
      this.filters = items;
    });
  }

  ngOnInit() {
    this.filters.forEach(group => {
      this.limits[group['name']] = this.defaultLimit;
    });
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

  getAll(group) {
    this.limits[group.name] = this.limits[group.name] <= this.defaultLimit ? group.values.length - 1 : this.defaultLimit;
  }

  setConfigs() {
    this.qanFilterService.setFilterConfigs(this.filters);
  }
}
